import React from 'react';
import Feed from '../components/Feed';
import Leftbar from '../components/Leftbar';
import Rightbar from '../components/Rightbar';
import Share from '../components/Share';
import Topbar from '../components/Topbar';
import './Home.css';

function Home() {
	return (
		<div>
			<Topbar></Topbar>
			<div style={{ display: 'flex' }}>
				<Leftbar></Leftbar>

				<Share></Share>

				<Rightbar />
			</div>
		</div>
	);
}

export default Home;
