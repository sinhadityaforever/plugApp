import React from 'react';
import { Link } from 'react-router-dom';
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
				<Link to={'/'}>
					<div className="header-actions">Home</div>
				</Link>
				<Link to="/signup">
					<div className="header-actions">Signup</div>
				</Link>
				<Link to="/login">
					{' '}
					<div className="header-actions">Login</div>
				</Link>
			</div>
		</div>
	);
}

export default LandingHeader;
