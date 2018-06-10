'use strict'

const logger = require('../lib/logger');
const JSONStream = require('JSONStream');
const streamify       = require('stream-array');
const config = require('../config');
const { mkdir } = require('fs');
const { createDirectory, createEmptyDirectory } = require('../scripts/filesystem');

module.exports = function(req, res, next) {
  logger.info('handled route: new-title');

  // get title && subtitle
  const title = req.body.title;
  const subtitle = req.body.subtitle;

  // check title
  if (!title) return next('Title is empty');
  if (!subtitle) return next('Subtitle is empty');

  // try create new directory
  const directory = `${config.rootVideoDir}/${title}`;

  createDirectory(directory, 
    subtitle, 
    function(err, directories) {
      if (err) {
        switch (err.code) {
          case 'EEXIST':
            const msg = `${title} / ${subtitle} already exists`;
            logger.error(msg);
            res.status(400).send(JSON.stringify(msg));
            return;
          
          default:
            logger.err(err);
            return next(err);
        }
      }

      // create sub-directories
      createEmptyDirectory(`${directory}/${subtitle}`, 'video')
        .then(createEmptyDirectory(`${directory}/${subtitle}`, 'posters'))
        .then(createEmptyDirectory(`${directory}/${subtitle}`, 'subs'))
        .then(() => {
          // send result
          const readable = streamify(directories);
          readable.pipe(JSONStream.stringify()).pipe(res);
        })
        .catch(err => next(err));
    });
}
