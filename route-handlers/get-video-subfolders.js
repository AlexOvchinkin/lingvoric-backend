'use strict'

const { join } = require('path');
var streamify = require('stream-array');
const JSONStream  = require('JSONStream');

const logger = require('../lib/logger');
const config = require('../config');
const { readDirectories } = require('../scripts/filesystem');

module.exports = function(req, res, next) {
  logger.info('handled route: get-video-subfolders');
  
  if (!req.query.title) return next('title is EMPTY');

  const directory = join(config.rootVideoDir, req.query.title);

  readDirectories(directory, function (err, folders) {
    if (err) return next(err);

    const readable = streamify(folders);
    readable.pipe(JSONStream.stringify()).pipe(res);
  });
}