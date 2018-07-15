'use strict'

const nodemailer = require('nodemailer');
const secretKeys = require('../secret-keys');

let transporter = undefined;

module.exports.createDefaultTransport = function() {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: secretKeys.emailFrom,
      pass: secretKeys.emailPass
    }
  });
};

module.exports.sendMail = function (opts) {
  return new Promise(function (resolve, reject) {
    if (!opts) reject();

    const mailOptions = {
      from    : secretKeys.emailFrom,
      to      : secretKeys.emailTo,
      subject : opts.subject,
      text    : opts.text
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}