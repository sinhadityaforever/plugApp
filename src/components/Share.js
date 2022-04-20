import { Button, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import dummyImg from '../../assets/avatar.png';
import Feed from './Feed';
import './Share.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../features/userSlice';
function Share() {
	const statusRef = useRef();

	const initialUser = JSON.parse(localStorage.getItem('user'));
	const initialStatus = initialUser.status;
	const dispatch = useDispatch();
	const [status, setStatus] = useState(initialStatus);

	const userId = localStorage.getItem('userId');

	const submitHandler = async () => {
		const userRef = doc(db, 'users', userId);

		await updateDoc(userRef, {
			status: statusRef.current.value
		});

		dispatch(updateStatus(statusRef.current.value));

		setStatus(statusRef.current.value);
		statusRef.current.value = '';
		message.success('Your status has been updated successfully');
	};
	return (
		<div className="share-wrapper">
			<div className="share-top">
				<img
					className="share-profile-img"
					src={initialUser.imageUrl ? initialUser.imageUrl : dummyImg}
				></img>
				<input
					placeholder={`Your current status: ${status}`}
					className="share-input"
					ref={statusRef}
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
					onClick={submitHandler}
				>
					Update Status
				</Button>
			</div>
			<Feed></Feed>
		</div>
	);
}

export default Share;
