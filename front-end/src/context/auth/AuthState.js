import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

axios.defaults.headers['Content-Type'] = 'application/json';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	//Actions

	//!Load User

	//!Register User => returns JWT token
	const registerUser = async user => {
		try {
			const resp = await axios.post('/api/users', user);
			dispatch({ type: REGISTER_SUCCESS, payload: resp.data });
		} catch (error) {
			console.log(error.response.data);

			//msg - custom message that I return from calling api
			dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
		}
	};

	//!Login User

	const loginUser = () => console.log('Login');

	//!Logout User
	const logoutUser = () => console.log('Logout');

	//!Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				actions: { registerUser, loginUser, logoutUser, clearErrors }
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
