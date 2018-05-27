const logger = require('../lib/logger');
const mongoose = require('mongoose');

module.exports = function(req, res, next) {
  logger.info('handled route: get-video-list');
  
  mongoose.connection.db
    .listCollections()
    .toArray(function(err, names) {
      res.status(200).send(names);
    });
};