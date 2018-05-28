const express    = require('express');
const bodyParser = require('body-parser')
const mongoose   = require('./lib/mongoose');

const logger     = require('./lib/logger');
const API        = require('./lib/router-api');
const VideoModel = require('./models/video');

// start Express
const app = express();

const jsonParser = bodyParser.json();

// Mongo DB
mongoose.connection.on('error', function() {
  logger.error('Mongo connection failed ...');
});

mongoose.connection.once('open', function() {
  logger.info('Mongo connection successful ...');
});


// API handlers
app.use('/api', jsonParser, API);

// global error handler
function errorHandler(err, req, res, next) {
  res.status(500);
  res.send(err);
}

// start application
app.listen(3000, function() {
  logger.info('Listening port 3000 ...');
});

/*
logger.info(JSON.stringify({
  title: "video 3",
  subtitle: "epizode 23",
    subs: [
    {
      begin: "123456",
      end: "654123",
      text: "Hi its test sub ..."
    }
  ]
}));
*/