'use strict'

const VideoModel = require('../models/video');

/*
 * function creates new record in DB
 */
function createNewRecord(obj, cb) {
  const video = new VideoModel({
    title      : obj.title,
    subtitle   : obj.subtitle,
    videoName  : obj.videoName,
    posterName : obj.posterName,
    subs       : obj.subs
  });

  video.save(function (err) {
    if (err) return cb(err);
    cb(err, 'Video created successful');
  });
}

/*
 * function updates record in DB
 */
function updateRecord(obj, cb) {
  VideoModel
    .findOneAndUpdate(
      { _id        : obj.id },
      {
        title      : obj.title,
        subtitle   : obj.subtitle,
        videoName  : obj.videoName,
        posterName : obj.posterName,
        subs       : obj.subs
      },
      { upsert: true, runValidators: true },
      function (err) {
        if (err) {
          return cb(err);
        }
        
        cb(err, 'Video saved successful');
      }
    );
}

module.exports.createNewRecord = createNewRecord;
module.exports.updateRecord = updateRecord;