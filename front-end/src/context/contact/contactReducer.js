import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload]
			};

		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(el => el.id != action.payload)
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
				el => el.id == action.payload.id
			);

			const updatedContacts = [
				...state.contacts.slice(0, indexContact),
				action.payload,
				...state.contacts.slice(indexContact + 1)
			];

			return {
				...state,
				contacts: updatedContacts
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

		default:
			return state;
	}
};
