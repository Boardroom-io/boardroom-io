const User = require('./../models/userModel');

const userController = {};

userController.createUser = (req, res, next) => {
  console.log("req body: ", req.body);
  const user = new User(req.body);
  console.log('user: ', user);
  user.save(function (err) {
    if (err) {
      throw err;
    } else {
      console.log('User created!');
      next();
    }
  });
};

module.exports = userController;