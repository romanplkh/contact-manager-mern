import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'John Smith',
				email: 'js@gmail.com',
				phone: '123-456-789',
				type: 'personal'
			},
			{
				id: 2,
				name: 'Stella Jonson',
				email: 'stellaj@mail.com',
				phone: '123-111-222',
				type: 'personal'
			},
			{
				id: 3,
				name: 'Mark Otto',
				email: 'motto@gmail.com',
				phone: '111-555-789',
				type: 'professional'
			}
		],
		current: null,
		filtered: null
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	//Actions

	//!Add contact
	const addContact = contact => {
		contact.id = uuid.v4();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};
	//!Delete contact

	const deleteContact = id => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	//!Set current contact

	const setCurrentContact = contact => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	//!Clear current contact

	const clearCurrentContact = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//!Update Contact

	const updateContact = contact => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};
	//!Filter contacts

	const filterContacts = text => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	//!Clear filter

	const clearFilterContacts = text => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				actions: {
					addContact,
					deleteContact,
					setCurrentContact,
					clearCurrentContact,
					updateContact,
					filterContacts,
					clearFilterContacts
				}
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
