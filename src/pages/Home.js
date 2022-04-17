import React from 'react';
import Leftbar from '../components/Leftbar';
import Rightbar from '../components/Rightbar';
import Topbar from '../components/Topbar';
import './Home.css';

function Home() {
	return (
		<div>
			<Topbar></Topbar>
			<div style={{ display: 'flex' }}>
				<Leftbar></Leftbar>
				<Rightbar />
			</div>
		</div>
	);
}

export default Home;
