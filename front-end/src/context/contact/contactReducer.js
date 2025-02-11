import {
	ADD_CONTACT,
	GET_CONTACTS,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ADD_ERROR,
	CLEAR_CONTACTS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [action.payload,...state.contacts ],
				loading: false
			};

		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(el => el._id !== action.payload),
				loading: false
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case UPDATE_CONTACT:
			const indexContact = state.contacts.findIndex(
				el => el._id === action.payload._id
			);

			const updatedContacts = [
				...state.contacts.slice(0, indexContact),
				action.payload,
				...state.contacts.slice(indexContact + 1)
			];

			return {
				...state,
				contacts: updatedContacts,
				loading: false
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter(el => {
					const reg = new RegExp(`${action.payload}`, 'gi');

					return el.name.match(reg) || el.email.match(reg);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		case CONTACT_ADD_ERROR:
			return {
				...state,
				error: action.payload
			};
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
				current: null
			};

		default:
			return state;
	}
};
