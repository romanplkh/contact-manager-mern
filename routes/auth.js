const express = require('express');
const router = express.Router();

const usersController = require('./controllers/users');

//* root: /api/users
//Private
router.get('/', usersController.getLoggedInUser);

//Public
router.post('/', usersController.postLogin);

module.exports = router;
