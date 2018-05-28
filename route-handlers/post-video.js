const logger = require('../lib/logger');
const VideoModel = require('../models/video');

module.exports = function (req, res, next) {

  logger.info('handled route: post-video');

  const body = req.body;

  if (!body.title || !body.subtitle) {
    res.status(400).send('Title or subtitle is empty');  
    return;
  }

  VideoModel
    .findOneAndUpdate(
      { title: body.title, subtitle: body.subtitle },
      body,
      { upsert: true, runValidators: true },
      function (err) {
        if (err) {
          return next(err);
        }
        
        res.status(200).send('Video saved successful');
      }
    );
};