const logger = require('../lib/logger');

module.exports = function (req, res, next) {
  res.render('start-page');
};