const logger = require('../lib/logger');
const VideoModel = require('../models/video');
const JSONStream = require('JSONStream');

module.exports = function(req, res, next) {
  logger.info(`handled route: get-single-video`);

  const id = req.params.id;

  if(!id) return next('Video ID is EMPTY');

  const cursor = VideoModel.findById(id).cursor();

  cursor.on('error', function (err) {
    return next(err);
  });

  cursor.pipe(JSONStream.stringify()).pipe(res);
}