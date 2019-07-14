import React, { useReducer } from 'react';
import uuid from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	GET_CONTACTS,
	CLEAR_CONTACTS,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ADD_ERROR
} from '../types';

axios.defaults.headers['Content-Type'] = 'application/json';

const ContactState = props => {
	const initialState = {
		contacts: null,
		/*  [
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
		]*/ current: null,
		filtered: null,
		error: null,
		loading: true
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	//Actions

	//!GET_CONTACTS

	const getContacts = async () => {
		try {
			const resp = await axios.get('/api/contacts');
			if (resp.status === 200) {
				dispatch({ type: GET_CONTACTS, payload: resp.data });
			}
		} catch (error) {
			dispatch({ type: CONTACT_ADD_ERROR, payload: error.response.msg });
		}
	};

	//!Add contact
	const addContact = async contact => {
		//contact.id = uuid.v4();

		try {
			const resp = await axios.post('/api/contacts', contact);
			if (resp.status === 200) {
				dispatch({ type: ADD_CONTACT, payload: resp.data });
			}
		} catch (error) {
			dispatch({ type: CONTACT_ADD_ERROR, payload: error.response.msg });
		}
	};
	//!Delete contact

	const deleteContact = async id => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (error) {
			dispatch({ type: CONTACT_ADD_ERROR, payload: error.response.msg });
		}
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

	const updateContact = async contact => {
		try {
			const { _id } = contact;
			const resp = await axios.put(`/api/contacts/${_id}`, contact);

			if (resp.status === 200) {
				dispatch({ type: UPDATE_CONTACT, payload: contact });
			}
		} catch (error) {
			dispatch({ type: CONTACT_ADD_ERROR, payload: error.response.msg });
		}


	};
	//!Filter contacts

	const filterContacts = text => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	//!Clear filter
	const clearFilterContacts = text => {
		dispatch({ type: CLEAR_FILTER });
	};

	//!Clear Contacts
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				loading: state.loading,
				actions: {
					addContact,
					deleteContact,
					setCurrentContact,
					clearCurrentContact,
					updateContact,
					filterContacts,
					clearFilterContacts,
					getContacts,
					clearContacts
				}
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
