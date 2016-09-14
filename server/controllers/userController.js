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

userController.verifyUser = (req, res, next) => {
	//email and password inputs from login page
	var emailInput = req.body.email;
	var passwordInput = req.body.password;

	User.findOne({email: emailInput}, function(err, u){
		if (err) return console.log(err);
		//If email is found in database & passwords match, call next(). Otherwise redirect to /signup. 
		if(u){
			if(u.password === passwordInput){
				req.user_id = u._id;
				next();
			} else {
				res.redirect('/signup');
			}
		} else {
			res.redirect('/signup');
			
		}
	});

};

module.exports = userController;