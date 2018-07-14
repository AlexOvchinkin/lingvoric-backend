'use strict'

const logger = require('../lib/logger');
const queryString = require('query-string');
const secretKeys = require('../secret-keys');
const request = require('request');
const config = require('../config');

module.exports = function(req, res, next) {
  logger.info('handled route: POST register-user');

  const reCaptcha = req.body["g-recaptcha-response"];
  const remoteip = req.headers["x-forwarded-for"];

  if (reCaptcha) {
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
        logger.info(`reCaptcha verification failed, ip: ${remoteip}`);
        return res.redirect('/recaptcha-error');
      }

      return res.redirect('/recaptcha-success');
    });

    return;
  }

  logger.info('reCaptcha error');
  return next('reCaptcha error');
};