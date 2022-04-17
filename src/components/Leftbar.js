import {
	HomeFilled,
	PlayCircleFilled,
	QuestionCircleFilled,
	TagsFilled,
	UsergroupAddOutlined,
	WechatFilled,
	WifiOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import './Leftbar.css';

function Leftbar() {
	return (
		<div className="leftbar">
			<div className="leftbar-wrapper"></div>
			<ul className="leftbar-list">
				<li className="leftbar-list-item">
					<HomeFilled className="leftbar-icon" />
					<span className="leftbar-list-item-text">Home</span>
				</li>
				<li className="leftbar-list-item">
					<WechatFilled className="leftbar-icon" />
					<span className="leftbar-list-item-text">Chats</span>
				</li>
				<li className="leftbar-list-item">
					<PlayCircleFilled className="leftbar-icon" />
					<span className="leftbar-list-item-text">Videos</span>
				</li>
				<li className="leftbar-list-item">
					<UsergroupAddOutlined className="leftbar-icon" />
					<span className="leftbar-list-item-text">Groups</span>
				</li>
				<li className="leftbar-list-item">
					<TagsFilled className="leftbar-icon" />
					<span className="leftbar-list-item-text">Bookmarks</span>
				</li>
				<li className="leftbar-list-item">
					<QuestionCircleFilled className="leftbar-icon" />
					<span className="leftbar-list-item-text">Questions</span>
				</li>
				<li className="leftbar-list-item">
					{/* <WorkOutline className="leftbar-icon" />
              <span className="leftbar-list-item-text">Jobs</span>
            </li>
            <li className="leftbar-list-item">
              <Event className="leftbar-icon" />
              <span className="leftbar-list-item-text">Events</span>
            </li>
            <li className="leftbar-list-item">
              <School className="leftbar-icon" />
              <span className="leftbar-list-item-text">Courses</span> */}
				</li>
			</ul>
			<Button
				type="primary"
				shape="round"
				size="large"
				style={{
					border: 'none',
					backgroundColor: '#a16ae8',
					marginLeft: '1rem'
				}}
			>
				Show more
			</Button>
		</div>
	);
}

export default Leftbar;
