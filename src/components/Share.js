import { Button } from 'antd';
import React from 'react';
import dummyImg from '../../assets/avatar.png';
import Feed from './Feed';
import './Share.css';

function Share() {
	return (
		<div className="share-wrapper">
			<div className="share-top">
				<img className="share-profile-img" src={dummyImg}></img>
				<input
					placeholder={`Your current status: Hi there, using plugapp.`}
					className="share-input"
					// ref={descRef}
				/>
			</div>
			<hr />
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					size="large"
					type="primary"
					shape="round"
					className="share-button"
					style={{ backgroundColor: '#a16ae8', border: 'none' }}
				>
					Update Status
				</Button>
			</div>
			<Feed></Feed>
		</div>
	);
}

export default Share;
