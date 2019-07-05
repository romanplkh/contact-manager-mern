const Contact = require('../models/Contact');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getContacts = async (req, res, next) => {
	try {
		const { id } = req.user;

		//@param sort ({date: -1 }: Object). -1 ==> the most recent
		const contacts = await Contact.find({ user: id }).sort({ date: -1 });

		res.json(contacts);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server error');
	}
};

exports.postContact = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const { name, email, phone, type } = req.body;

	try {
		const newContact = new Contact({
			name,
			email,
			phone,
			type,
			user: req.user.id
		});

		const savedContact = await newContact.save();

		res.json(savedContact);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server error');
	}
};

exports.putUpdateContact = (req, res, next) => {
	const { id } = req.param;
	res.send('Update contact');
};

exports.deleteContact = (req, res, next) => {
	const { id } = req.param;
	res.send('Delete contact');
};
