import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
	const contactCtx = useContext(ContactContext);

	const { filtered } = contactCtx;
	const { filterContacts, clearFilterContacts } = contactCtx.actions;

	const filterText = useRef();

	useEffect(() => {
		if (filtered === null) {
			filterText.current.value = '';
		}
	});

	const onChange = e => {
		if (filterText.current.value !== '') {
			filterContacts(e.target.value);
		} else {
			clearFilterContacts();
		}
	};

	return (
		<form>
			<input
				type="text"
				ref={filterText}
				placeholder="Find Contacts..."
				onChange={onChange}
			/>
		</form>
	);
};

export default ContactFilter;
