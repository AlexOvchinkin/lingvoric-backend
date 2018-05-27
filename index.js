var express    = require('express');
var app        = express();
const mongoose = require('./lib/mongoose');

const logger     = require('./lib/logger');
const API        = require('./lib/router-api');
const VideoModel = require('./models/video');


// Mongo DB
mongoose.connection.on('error', function() {
  logger.error('Mongo connection failed ...');
});

mongoose.connection.once('open', function() {
  logger.info('Mongo connection successful ...');
});


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


// TEST
/*
const video = new VideoModel({
  title: 'Big Bang Theory',
  subtitle: 'e.2',
  filename: '04_02.mp4'
});

video.save(function(err, user, affected) {
  if (err) {
    logger.error('video NOT saved');
    return;
  }

  logger.info('video saved successful');
});
*/
