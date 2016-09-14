const cookieController = {}
cookieController.setCookie = function (req, res, next) {
  next();
}
module.exports = cookieController;