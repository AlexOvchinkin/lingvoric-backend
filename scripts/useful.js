module.exports.renderPage = function (template) {
  return function (req, res, next) {
    res.render(template);
  }
};