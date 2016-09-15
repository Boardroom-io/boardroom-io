const cookieController = {}
cookieController.setCookie = function (req, res, next) {
  if (!req.cookies.id) res.cookie('id', res.locals.id);
    next();
}

cookieController.checkCookie = function (req, res, next) {
  if (req.cookies.id) {
    console.log(req.cookies.id);
    next()
  } else {
    res.redirect('/signup');
  }
  
}
module.exports = cookieController;