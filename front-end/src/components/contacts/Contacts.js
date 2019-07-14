import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Contacts = () => {
	//Now we have access to state assosiated with this context
	const contactCtx = useContext(ContactContext);

	const { contacts, filtered, loading } = contactCtx;

	const { getContacts } = contactCtx.actions;

	useEffect(() => {
		getContacts();

		//eslint-disable-next-line
	}, []);

	if (!loading && contacts !== null && contacts.length === 0) {
		return <h1>Please add contact</h1>;
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map(el => {
								return (
									<CSSTransition key={el._id} timeout={1000} classNames="item">
										<ContactItem contact={el} />
									</CSSTransition>
								);
						  })
						: contacts.map(el => {
								return (
									<CSSTransition key={el._id} timeout={1000} classNames="item">
										<ContactItem contact={el} />
									</CSSTransition>
								);
						  })}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;
