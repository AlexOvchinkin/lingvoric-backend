'use strict'

const streamify = require('stream-array');
const JSONStream = require('JSONStream');

const config = require('../config');
const logger = require('../lib/logger');
const { readDirectories } = require('../scripts/filesystem');

module.exports = function(req, res, next) {
  logger.info('handled route: get-video-folders');

  readDirectories(config.rootVideoDir, function (err, folders) {
    if (err) return next(err);

    const readable = streamify(folders);
    readable.pipe(JSONStream.stringify()).pipe(res);
  });
};