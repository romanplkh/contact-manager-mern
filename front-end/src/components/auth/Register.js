import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Register = ({ history }) => {
	const alertCTX = useContext(AlertContext);
	const authCTX = useContext(AuthContext);

	const { error, isAuthenticated } = authCTX;

	const {
		actions: { registerUser, clearErrors }
	} = authCTX;

	const {
		actions: { setAlert }
	} = alertCTX;

	useEffect(() => {
		if (isAuthenticated) {
			history.push('/');
		}

		if (error === 'User already exists') {
			setAlert(error, 'danger');

			//Clear error in state
			clearErrors();
		}

		//eslint-disable-next-line
	}, [error, isAuthenticated, history]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = user;

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		if (name === '' || email === '' || password === '') {
			setAlert('Please Enter all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Paswords do not match', 'danger');
		} else {
			registerUser(user);
		}
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={onChange}
						minLength="6"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirm Password</label>
					<input
						type="password"
						name="password2"
						id="password2"
						value={password2}
						onChange={onChange}
					/>
				</div>
				<input
					type="submit"
					value="Register"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};

export default Register;
