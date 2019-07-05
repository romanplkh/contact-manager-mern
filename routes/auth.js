const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const isAuthorized = require('../middleware/auth').isAuthorized;

const usersController = require('../controllers/users');

//* root: /api/users
//Private
router.get('/', isAuthorized, usersController.getLoggedInUser);

//Public
router.post(
	'/',
	[
		check('email', 'Valid email is required').isEmail(),
		check('password', 'Password is required').exists()
	],
	usersController.postLogin
);

module.exports = router;
