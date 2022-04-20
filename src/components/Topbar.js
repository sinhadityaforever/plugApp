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
import { Dropdown, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function Topbar() {
	const initialUser = JSON.parse(localStorage.getItem('user'));
	const navigate = useNavigate();
	const editProfileHandler = () => {
		navigate('/editprofile');
	};
	const logoutHandler = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('userId');
		navigate('/');
	};

	const menu = (
		<Menu>
			<Menu.Item onClick={editProfileHandler}>Edit Profile</Menu.Item>
			<Menu.Item onClick={logoutHandler}>Logout</Menu.Item>
		</Menu>
	);
	return (
		<div className="topbar-container">
			<div className="topbar-left">
				<Link to="/">
					<img className="logo-text" src={logoText}></img>
				</Link>
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
					<Dropdown trigger={['click']} overlay={menu}>
						<img
							className="avatar-image"
							src={initialUser.imageUrl ? initialUser.imageUrl : avatar}
						></img>
					</Dropdown>
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
