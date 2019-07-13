import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
	//Now we have access to state assosiated with this context
	const contactCtx = useContext(ContactContext);

	const { contacts, filtered } = contactCtx;
 
	if (contacts.length === 0) {
		return <h1>Please add contact</h1>;
	}

	return (
		<Fragment>
			<TransitionGroup>
				{filtered !== null
					? filtered.map(el => {
							return (
								<CSSTransition key={el.id} timeout={1000} classNames="item">
									<ContactItem contact={el} />
								</CSSTransition>
							);
					  })
					: contacts.map(el => {
							return (
								<CSSTransition key={el.id} timeout={1000} classNames="item">
									<ContactItem contact={el} />
								</CSSTransition>
							);
					  })}
			</TransitionGroup>
		</Fragment>
	);
};

export default Contacts;
