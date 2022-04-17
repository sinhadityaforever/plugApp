import React from 'react';
import './Topbar.css';
import logoText from '../../assets/logo-text-white.png';
import Search from 'antd/lib/input/Search';
import {
	SearchOutlined,
	EditFilled,
	PoweroffOutlined
} from '@ant-design/icons';
import avatar from '../../assets/avatar.png';

function Topbar() {
	return (
		<div className="topbar-container">
			<div className="topbar-left">
				<img className="logo-text" src={logoText}></img>
			</div>
			<div className="topbar-center">
				<div className="searchbar">
					<SearchOutlined className="searchIcon" />
					<input
						placeholder="Search for friend, post or video"
						className="searchInput"
					/>
				</div>
			</div>
			<div className="topbar-right">
				<div>
					<img className="avatar-image" src={avatar}></img>
				</div>
				{/* <EditFilled style={{ fontSize: '2rem', color: 'white' }} />
				<div>
					<PoweroffOutlined style={{ fontSize: '2rem', color: 'white' }} />
				</div> */}
			</div>
		</div>
	);
}

export default Topbar;
