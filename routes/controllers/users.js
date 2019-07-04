//*REGISTRATION
exports.postRegisterUser = (req, res, next) => {
	res.send('Register user');
};

//*Auth
exports.getLoggedInUser = (req, res, next) => {
	res.send('Get logged in user');
};

exports.postLogin = (req, res, next) => {
	res.send('Try to log in user');
};
