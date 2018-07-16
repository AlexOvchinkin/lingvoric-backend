'use strict'

const logger       = require('../lib/logger');
const queryString  = require('query-string');
const secretKeys   = require('../secret-keys');
const request      = require('request');
const config       = require('../config');
const mailer       = require('../scripts/mailer');

const { saveUser } = require('../scripts/database');

module.exports = function(req, res, next) {
  logger.info('handled route: POST register-user');

  const reCaptcha  = req.body["g-recaptcha-response"];
  const remoteip   = req.headers["x-forwarded-for"];
  const userName   = req.body.user_name;
  const userEmail  = req.body.user_email;

  if(!userName || !userEmail) {
    logger.error(`Form fields are empty: user-name - "${userName}", user-email - "${userEmail}"`);
    return res.redirect('/500');
  }

  if (!reCaptcha) {
    logger.error(`reCaptcha verification failed, ip: ${remoteip}`);
    return res.redirect('/recaptcha-error');
  }

  
  const params = queryString.stringify({
    'secret'   : secretKeys.reCaptchaKey,
    'response' : reCaptcha,
    'remoteip' : remoteip
  });

  const verificationUrl = config.reCaptchaUrl + '?' + params;

  request(verificationUrl, function (error, response, body) {
    if (error) return next(error);

    const result = JSON.parse(body);

    if(!result.success) {
      logger.error(`reCaptcha verification failed, ip: ${remoteip}`);
      return res.redirect('/recaptcha-error');
    }

    // save info into database
    saveUser({ name: userName, email: userEmail })
      .then(user => {
        if (user.created) {
          // email notification
          mailer.sendMail({
            subject : 'Registration successful',
            text    : `name: ${userName}, email: ${userEmail}`
          })
            .then(result => logger.info(result))
            .catch(err => logger.err(err));
        }  

        // redirect to the successful route  
        res.redirect('/registration-success');  
      })
      .catch(err => {
        logger.error('Error during saving user into DB');
        res.redirect('/500');
      });
  });
};