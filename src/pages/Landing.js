import { Button } from 'antd';
import React from 'react';
import './Landing.css';
import landing from '../../assets/landing.gif';
import logoText from '../../assets/logo-text2.png';
import LandingHeader from '../components/LandingHeader';

function Landing() {
	return (
		<div>
			<LandingHeader></LandingHeader>
			<div className="container">
				<div className="landing-text">
					{/* <h1 style={{fontSize: "5rem", fontWeight: "700"}}>Plug-App</h1> */}
					<img src={logoText}></img>
					<div className="tagline-text">
						<h1
							style={{
								color: '#A16AE8',
								marginRight: '1rem',
								fontSize: '2rem'
							}}
						>
							Simple{' '}
						</h1>
						<h1
							style={{
								color: '#603F8B',
								marginRight: '1rem',
								fontSize: '2rem'
							}}
						>
							Social{' '}
						</h1>
						<h1 style={{ color: '#FD49A0', fontSize: '2rem' }}>Secure </h1>
					</div>
					<div
						style={{ fontsize: '0.7rem', maxWidth: '60%' }}
						className="description-text"
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</div>
					<Button
						style={{
							marginTop: '2rem',
							backgroundColor: '#A16AE8',
							borderColor: '#A16AE8'
						}}
						type="primary"
						shape="round"
						size="large"
					>
						Get Started
					</Button>
				</div>
				<div>
					<img src={landing}></img>
				</div>
			</div>
		</div>
	);
}

export default Landing;
