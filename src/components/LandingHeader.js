import React from 'react';
import logo from '../../assets/logo.png';
import './LandingHeader.css';

function LandingHeader() {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<img src={logo} style={{ width: '5rem', marginLeft: '2rem' }}></img>
			<div
				style={{
					marginTop: '5px',
					display: 'flex',
					fontSize: '1rem',
					marginRight: '3rem'
				}}
			>
				<div className="header-actions">Home</div>
				<div className="header-actions">Signup</div>
				<div className="header-actions">Login</div>
			</div>
		</div>
	);
}

export default LandingHeader;
