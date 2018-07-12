'use strict'

const logger = require('../lib/logger');

module.exports = function(req, res, next) {
  logger.info('handled route: POST register-user');

  res.status(200).send('user registration - done');
};