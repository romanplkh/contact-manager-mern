const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { check } = require('express-validator');

// api/users
router.post(
	'/',
	[
		check('name', 'Name is required')
			.not()
			.isEmpty(),
		check('email', 'Valid email is required').isEmail(),
		check('password', 'Password should be 6 or more characters').isLength({
			min: 6
		})
	],
	usersController.postRegisterUser
);

module.exports = router;
