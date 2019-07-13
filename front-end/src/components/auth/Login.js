import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

const Login = ({ history }) => {
	const authCTX = useContext(AuthContext);
	const alertCTX = useContext(AlertContext);

	const { setAlert } = alertCTX.actions;
	const { error, isAuthenticated } = authCTX;
	const { loginUser, clearErrors } = authCTX.actions;

	useEffect(() => {
		if (isAuthenticated) {
			history.push('/');
		}

		if (
			error === 'Invalid email or user does not exist' ||
			error === 'Invalid password'
		) {
			setAlert(error, 'danger');
			clearErrors();
		}

		//eslint-disable-next-line
	}, [error, isAuthenticated, history]);

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const { email, password } = user;

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();

		if (!email || !password) {
			setAlert('Please fill in all fields', 'danger');
		} else {
			loginUser(user);
		}
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Login</span>
			</h1>
			<form onSubmit={onSubmit}>
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
					/>
				</div>
				<input
					type="submit"
					value="Login"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};

export default Login;
