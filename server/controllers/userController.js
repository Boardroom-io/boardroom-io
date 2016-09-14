const User = require('./../models/userModel');

const userController = {};

userController.createUser = (req, res, next) => {
  const user = new User(req.body);
  user.save(function(err){
    if (err) throw err;
    console.log('User created!');
    next();
  });

 
};

module.exports = userController;