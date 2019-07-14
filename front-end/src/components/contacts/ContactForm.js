import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	//local state
	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	});

	const { name, email, phone, type } = contact;

	const contactCtx = useContext(ContactContext);
	//actions
	const { addContact, clearCurrentContact, updateContact } = contactCtx.actions;
	//state
	const { current } = contactCtx;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal'
			});
		}
	}, [current, contactCtx]);

	const onChange = e => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const clearAll = () => {
		clearCurrentContact();
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal',
	
		});
	};

	const onSubmit = e => {
		e.preventDefault();
		//Get action from context object

		if (current == null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}

		clearAll();
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">
				{current === null ? 'Add Contact' : 'Update Contact'}
			</h2>
			<input
				type="text"
				placeholder="Name"
				name="name"
				value={name}
				onChange={onChange}
			/>
			<input
				type="email"
				placeholder="Email"
				name="email"
				value={email}
				onChange={onChange}
			/>
			<input
				type="text"
				placeholder="Phone"
				name="phone"
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<input
				type="radio"
				name="type"
				value="personal"
				checked={type === 'personal'}
				onChange={onChange}
			/>{' '}
			Personal
			<input
				type="radio"
				name="type"
				value="professional"
				checked={type === 'professional'}
				onChange={onChange}
				className="ml-3"
			/>
			Professional
			<div>
				<input
					type="submit"
					value={current === null ? 'Add Contact' : 'Update Contact'}
					className="btn btn-primary btn-block"
				/>
			</div>
			{current && (
				<div>
					<button className="btn btn-light btn-block" onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
