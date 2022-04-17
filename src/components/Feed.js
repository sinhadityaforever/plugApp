import { Card } from 'antd';
import React from 'react';
import { feedData } from '../features/dummyData';
import './Feed.css';
import avatar from '../../assets/avatar.png';
import { HeartOutlined, StarOutlined } from '@ant-design/icons';

function Feed() {
	return (
		<div>
			{feedData.map((data) => {
				return (
					<Card className="feed-card">
						<div className="profile-header">
							<img className="profile-avatar" src={avatar}></img>
							<span>{data.name}</span>
							<StarOutlined
								className="reactions-icon"
								style={{ marginLeft: '5px' }}
							></StarOutlined>
						</div>
						<hr className="card-hr" />
						<div className="card-content">
							<p>{data.status}</p>
						</div>
						<div className="card-reactions">
							<HeartOutlined className="reactions-icon"></HeartOutlined>
							<span>people liked it</span>
						</div>
					</Card>
				);
			})}
		</div>
	);
}

export default Feed;
