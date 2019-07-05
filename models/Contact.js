const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	type: {
		type: String,
		default: 'Personal'
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('contact', contactSchema);
