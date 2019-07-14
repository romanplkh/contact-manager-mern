import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
	const authCTX = useContext(AuthContext);

	const contactCTX = useContext(ContactContext);

	const { isAuthenticated, user } = authCTX;
	const { clearContacts } = contactCTX.actions;

	const { logoutUser } = authCTX.actions;

	const onLogOut = () => {
		logoutUser();
		clearContacts();
	};

	const authLinks = (
		<Fragment>
			<li>Hello {user && user.name}</li>
			<li>
				<a href="#!" onClick={onLogOut}>
					<i className="fas fa-sign-out-alt" />
					{'    '}
					{/*  */}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};

Navbar.defaultProps = {
	title: 'Contact Manager',
	icon: 'fa fa-id-card-alt'
};

export default Navbar;
