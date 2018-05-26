const logger = require('../lib/logger');

module.exports = function(req, res, next) {
  logger.info('handled route: get-video-list');
  res.status(200).send('handled route: get-video-list');
};