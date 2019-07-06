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

exports.putUpdateContact = async (req, res, next) => {
	const { id } = req.params;

	try {
		const contact = await Contact.findById(id);

		if (!contact) {
			return res.status(404).json({ msg: 'Contact is not found' });
		}

		if (contact.user.toString() !== req.user.id.toString()) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		let contactUpdated = await Contact.findByIdAndUpdate(id, req.body, {
			new: true
		});

		res.json(contactUpdated);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server error');
	}
};

exports.deleteContact = async (req, res, next) => {
	const { id } = req.params;

	try {
		const contact = await Contact.findById(id);

		if (!contact) {
			return res.status(404).json({ msg: 'Contact is not found' });
		}

		if (contact.user.toString() !== req.user.id.toString()) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		const result = await Contact.deleteOne({ _id: contact.id });

		if (!result.ok) {
			console.log(error.message);
			res.status(500).send('Server error. Could not delete contact. Try later');
		}

		res.json({
			msg: `${result.deletedCount} Contact successfully removed`
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server error');
	}
};
