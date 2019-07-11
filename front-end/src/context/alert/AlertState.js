import React, { useReducer } from 'react';
import AlertContext from './AlertContext';
import AlertReucer from './AlertReducer';
import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
	const initialState = [];

	// state = {
	//   msg: "",
	//   type: "",
	//   id:""
	// }

	const [state, dispatch] = useReducer(AlertReucer, initialState);

	//!SET ALERT
	const setAlert = (msg, type, timeout = 5000) => {
		const id = uuid.v4();

		dispatch({ type: SET_ALERT, payload: { msg, type, id } });

		setTimeout(() => {
			dispatch({ type: REMOVE_ALERT, payload: id });
		}, timeout);
	};

	//!CLEAR ALERT

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				actions: { setAlert }
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
