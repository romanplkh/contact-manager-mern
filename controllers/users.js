const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
//*REGISTRATION
exports.postRegisterUser = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const { name, email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ msg: 'User already exists' });
		}

		const salt = await bcrypt.genSalt(10);
		const hash =  bcrypt.hashSync(password, salt);
		user = new User({ name, email, password: hash });
		await user.save();

		res.send('Saved');
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Oop..server could not process your request');
	}
};

//*Auth
exports.getLoggedInUser = (req, res, next) => {
	res.send('Get logged in user');
};

exports.postLogin = (req, res, next) => {
	res.send('Try to log in user');
};
