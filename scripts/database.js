'use strict'

const VideoModel = require('../models/video');
const UserModel  = require('../models/users');

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


/*
 * function saves new video data from request to DB
 */
function saveVideoData(body) {
  return new Promise((resolve, reject) => {
    if (body.id) {
      updateRecord(body, function(err, result) {
        if (err) return reject(err);
        resolve(result);
      });
    } else {
      createNewRecord(body, function(err, result) {
        if (err) return reject(err);
        resolve(result);
      });
    }
  });
}

function saveUser(userData) {
  return new Promise(function(resolve, reject) {
    if(!userData || !userData.email) return reject('User date is empty');

    const query = UserModel.where({email: userData.email});
    query.findOne()
      .then(user => {
        if(user) return resolve({
          created : false,
          user    : user
        });

        const newUser = new UserModel({
          name  : userData.name,
          email : userData.email
        });

        newUser.save()
          .then(user => {
            resolve({
              created : true,
              user    : user
            });
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

module.exports.saveVideoData  = saveVideoData;
module.exports.saveUser       = saveUser;