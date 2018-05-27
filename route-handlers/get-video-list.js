const logger = require('../lib/logger');
const VideoModel = require('../models/video');
const JSONStream = require('JSONStream');

module.exports = function(req, res, next) {
  
  logger.info('handled route: get-video-list');
  
  const cursor = VideoModel.find().cursor();

  cursor.on('error', function (err) {
    return next(err);
  });

  cursor.pipe(JSONStream.stringify()).pipe(res);
};