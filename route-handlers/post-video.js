const config = require('../config');
const fs = require('fs');
const logger = require('../lib/logger');
const VideoModel = require('../models/video');

module.exports = function (req, res, next) {

  logger.info('handled route: post-video');

  const body = req.body;

  // файл (видео) записывать его в нужную директорию
  // сделать передачу ВСЕХ полей на клиенте с валидацией (не пустые значения)

  if (!body.file) return next('Uploading file is NULL');

  const path = `${config.videoDirectory}/${body.filename}`

  fs.writeFile(
    path, 
    Buffer(body.file, 'base64'), 
    function(err) {
      if (err) return next(err);

      if (body.id) {
        update(res, body, next);
      } else {
        create(res, body, next);
      } 
    });
  
};

// create new record in DB
function create(res, body, next) {
  const video = new VideoModel({
    title    : body.title,
    subtitle : body.subtitle,
    filename : body.filename,
    subs     : body.subs
  });

  video.save(function (err) {
    if (err) return next(err);
    res.status(200).send(JSON.stringify('Video created successful'));
  });
}

// update record in DB
function update(res, body, next) {
  VideoModel
    .findOneAndUpdate(
      { _id: body.id },
      {
        title    : body.title,
        subtitle : body.subtitle,
        filename : body.filename,
        subs     : body.subs
      },
      { upsert: true, runValidators: true },
      function (err) {
        if (err) {
          return next(err);
        }
        
        res.status(200).send(JSON.stringify('Video saved successful'));
      }
    );
}