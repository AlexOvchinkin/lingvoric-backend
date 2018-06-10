const config = require('../config');
const fs = require('fs');
const logger = require('../lib/logger');
const VideoModel = require('../models/video');

module.exports = function (req, res, next) {

  logger.info('handled route: post-video');

  const body = req.body;

  const emptyFields = getEmptyFields(
    body,
    ['title', 'subtitle', 'videoFile', 'videoName', 'posterFile', 'posterName']
  );

  if(emptyFields.length > 0) return next(`Empty fields: ${emptyFields.join}`)

  const path = `${config.rootVideoDir}/${body.title}/${body.subtitle}`;
  const videoPath = `${path}/video`;
  const posterPath = `${path}/posters`;


  writeFile(videoPath, body.videoName, body.videoFile)
    .then(writeFile(posterPath, body.posterName, body.posterFile))
    .then(result => {
      if (body.id) {
        update(res, body, next);
      } else {
        create(res, body, next);
      }
    })
    .catch(err => next(err));
};

function getEmptyFields(obj, fields) {
  const emptyFields = [];

  fields.forEach(fieldName => {
    if (!obj[fieldName]) emptyFields.push(fieldName);
  });

  return emptyFields;
}

function writeFile(path, filename, file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      `${path}/${filename}`,
      Buffer(file, 'base64'),
      err => {
        if (err) {
          reject(err);
        } else {
          resolve('success');
        }
      }
    );
  });
}

// create new record in DB
function create(res, body, next) {
  const video = new VideoModel({
    title      : body.title,
    subtitle   : body.subtitle,
    videoName  : body.videoName,
    posterName : body.posterName,
    subs       : body.subs
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
      { _id        : body.id },
      {
        title      : body.title,
        subtitle   : body.subtitle,
        videoName  : body.videoName,
        posterName : body.posterName,
        subs       : body.subs
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

function getEmptyFields(body, fields) {
  const emptyFields = [];

  fields.forEach(element => {
    if (!body[element]) emptyFields.push(element);
  });

  return emptyFields;
}