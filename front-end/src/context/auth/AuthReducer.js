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

const validationFail = (state, action) => {
	localStorage.removeItem('token');
	return {
		...state,
		token: null,
		isAuthenticated: false,
		loading: false,
		user: null,
		error: action.payload
	};
};

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false
			};

		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
			return validationFail(state, action);
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};
		case AUTH_ERROR:
			return validationFail(state, action);

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};

		default:
			return state;
	}
};
