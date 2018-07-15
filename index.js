const express    = require('express');
const bodyParser = require('body-parser')
const mongoose   = require('./lib/mongoose');
const cors       = require('cors');

const logger     = require('./lib/logger');
const API        = require('./lib/router-api');
const VideoModel = require('./models/video');
const mailer     = require('./scripts/mailer');

const { renderPage } = require('./scripts/useful');

// start Express
const app = express();

// CORS ENABLED
//app.use(cors());

// init mailer
mailer.createDefaultTransport();

// PUG
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Mongo DB
mongoose.connection.on('error', function() {
  logger.error('Mongo connection failed ...');
});

mongoose.connection.once('open', function() {
  logger.info('Mongo connection successful ...');
});

// ROUTES
// router - API
app.use('/api', API);

// GET
app.get('/'                     , require('./route-handlers/get-start-page'));
app.get('/register'             , require('./route-handlers/get-register-page'));
app.get('/recaptcha-error'      , renderPage('reCaptcha-error'));
app.get('/registration-success' , renderPage('registration-success'));
app.get('/404'                  , renderPage('404'));
app.get('/500'                  , renderPage('500'));

app.get('*', function (req, res, next) {
  return res.redirect('/404');
});

// POST
app.post('/register-user', require('./route-handlers/post-register-user'));

// global error handler
function errorHandler(err, req, res, next) {
  logger.error(err);
  res.status(500);
  return res.redirect('/500');
}

// start application
app.listen(3000, function() {
  logger.info('Listening port 3000 ...');
});

