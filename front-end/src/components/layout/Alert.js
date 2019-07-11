import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alert = () => {
	const alertCTX = useContext(AlertContext);

	const { alerts } = alertCTX;

	return (
		alerts.length > 0 &&
		alerts.map(el => (
			<div key={el.id} className={`alert alert-${el.type}`}>
				<i className="fa fa-info-circle" /> {el.msg}
			</div>
		))
	);
};

export default Alert;
