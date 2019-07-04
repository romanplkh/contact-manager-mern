const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

//* root: api/contacts

router.get('/', contactsController.getContacts);
router.post('/', contactsController.postContact);
router.put('/:id', contactsController.putUpdateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
