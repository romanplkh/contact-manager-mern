const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { check } = require('express-validator');
const isAuthorized = require('../middleware/auth').isAuthorized;

//* root: api/contacts
//!This are all private routes
router.get('/', isAuthorized, contactsController.getContacts);

router.post(
	'/',
	[
		isAuthorized,
		[
			check('name', 'Name is required')
				.not()
				.isEmpty()
		]
	],
	contactsController.postContact
);

router.put('/:id', isAuthorized, contactsController.putUpdateContact);

router.delete('/:id', isAuthorized, contactsController.deleteContact);

module.exports = router;
