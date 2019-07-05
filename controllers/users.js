const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

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
		const hash = bcrypt.hashSync(password, salt);
		user = new User({ name, email, password: hash });
		await user.save();

		//* we attach object user with id to jwt-tokent. So each time we send/receive this token, additionally to hash it will contain this object we can access through req.
		//@param user.id is available because mongoose automatically creates id. So from object above {user}, once it is saved we can extract id
		const payloadToken = {
			user: {
				id: user.id
			}
		};

		//* @payloadToken, @secretJWT, @options{expires..}, @callback(err, token) : Object token
		jwt.sign(
			payloadToken,
			config.get('jwtSecret'),
			{
				expiresIn: 36000
			},
			(err, token) => {
				if (err) {
					throw err;
				}

				//* Return token so we can extract it to header from response in the middleware

				res.json({ token });
			}
		);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Oop..server could not process your request');
	}
};

//*Auth
exports.getLoggedInUser = async (req, res, next) => {
	try {
		//If user is logged in we attach object user in each request, so from that object we can get userId
		const { id } = req.user;

		//*Return all data, but password
		//@param select(options: String)
		const user = await User.findById(id).select('-password');
		res.json(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server error');
	}
};

exports.postLogin = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(400)
				.json({ msg: 'Invalid email or user does not exist' });
		}

		//*Check password
		//@param inputPassword, @param dbPassword
		const isMatch = bcrypt.compareSync(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ msg: 'Invalid password' });
		}

		const payloadToken = {
			user: {
				id: user.id
			}
		};

		//* @payloadToken, @secretJWT, @options{expires..}, @callback(err, token) : Object token
		jwt.sign(
			payloadToken,
			config.get('jwtSecret'),
			{
				expiresIn: 36000
			},
			(err, token) => {
				if (err) {
					throw err;
				}

				res.json({ token });
			}
		);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server error');
	}
};
