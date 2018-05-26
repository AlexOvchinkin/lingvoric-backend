var express = require('express');
var app = express();

const logger = require('./lib/logger');

const API = require('./lib/router-api');

// API handlers
app.use('/api', API);

// global error handler
function errorHandler(err, req, res, next) {
  res.status(500);
  res.send(err);
}

// start application
app.listen(3000, function() {
  logger.info('Listening port 3000 ...');
});