import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
	//Now we have access to state assosiated with this context
	const contactCtx = useContext(ContactContext);

	const { contacts } = contactCtx;

	return (
		<Fragment>
			{contacts.map(el => {
				return <ContactItem key={el.id} contact={el} />;
			})}
		</Fragment>
	);
};

export default Contacts;
