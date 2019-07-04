const express = require('express');

const router = express.Router();

const usersController = require('./controllers/users');

// api/users
router.post('/', usersController.postRegisterUser);

module.exports = router;
