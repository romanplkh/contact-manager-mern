exports.getContacts = (req, res, next) => {
	res.send('Get all contacts');
};

exports.postContact = (req, res, next) => {
	res.send('Add contact');
};

exports.putUpdateContact = (req, res, next) => {
	const { id } = req.param;
	res.send('Update contact');
};

exports.deleteContact = (req, res, next) => {
	const { id } = req.param;
	res.send('Delete contact');
};
