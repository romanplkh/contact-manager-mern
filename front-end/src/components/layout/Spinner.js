import React, { Fragment } from 'react';
import './styles.css';

const Spinner = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<div className="lds-facebook ">
				<div />
				<div />
				<div />
			</div>
		</div>
	);
};

export default Spinner;
