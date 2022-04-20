import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Feed from '../components/Feed';
import Leftbar from '../components/Leftbar';
import Rightbar from '../components/Rightbar';
import Share from '../components/Share';
import Topbar from '../components/Topbar';
import './Home.css';

function Home() {
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem('user')) {
			navigate('/');
		}
	}, []);

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
