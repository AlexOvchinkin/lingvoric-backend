const config = require('../config');
const logger = require('../lib/logger');
const { writeFile } = require('../scripts/filesystem');
const { createNewRecord, updateRecord } = require('../scripts/database');

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
        updateRecord(body, function(err, result) {
          if (err) return next(err);
          res.status(200).send(JSON.stringify(result));
        });
      } else {
        createNewRecord(body, function(err, result) {
          if (err) return next(err);
          res.status(200).send(JSON.stringify(result));
        });
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
