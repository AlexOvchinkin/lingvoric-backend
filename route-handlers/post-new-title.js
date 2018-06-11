'use strict'

const logger = require('../lib/logger');
const JSONStream = require('JSONStream');
const streamify       = require('stream-array');
const config = require('../config');
const { createDirectory } = require('../scripts/filesystem');

module.exports = function(req, res, next) {
  logger.info('handled route: new-title');

  // get title
  const title = req.body.title;

  // check title
  if (!title) return next('Title is empty');

  // try create new directory
  createDirectory(config.rootVideoDir, 
    title, 
    function(err, directories) {
      if (err) {
        switch (err.code) {
          case 'EEXIST':
            const msg = `${title} already exists`;
            logger.error(msg);
            res.status(400).send(JSON.stringify(msg));
            return;
          
          default:
            logger.error(err);
            return next(err);
        }
      }

      const readable = streamify(directories);
      readable.pipe(JSONStream.stringify()).pipe(res);
    });
}

