import React, { useEffect, useRef, useState } from 'react';
import Topbar from '../components/Topbar';
import './ProfileEdit.css';
import avatar from '../../assets/avatar.png';
import { Form, Input, Button, Card } from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../config/firebaseConfig';
import uuid from 'react-uuid';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	updateImageUrl,
	updateName,
	updateStatus
} from '../features/userSlice';

function ProfileEdit() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const nameRef = useRef();
	const statusRef = useRef();

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			navigate('/');
		}
	}, []);

	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImage(reader.result);
		};
	};
	const imageHandler = (selectedImage) => {
		previewFile(selectedImage);
		setFile(selectedImage);
	};
	let userId = localStorage.getItem('userId');
	console.log('this is userId' + userId);
	const submitHandler = async () => {
		const userRef = doc(db, 'users', userId);

		if (image != null) {
			console.log('if block executed');
			const imageUuid = uuid();
			const imageRef = ref(storage, `images/${imageUuid}.jpg`);
			await uploadBytes(imageRef, file);
			const imageUrl = await getDownloadURL(imageRef);
			await updateDoc(userRef, {
				name: nameRef.current.input.value,
				status: nameRef.current.input.value,
				imageUrl: imageUrl
			});

			dispatch(updateName(nameRef.current.input.value));
			dispatch(updateStatus(statusRef.current.input.value));
			dispatch(updateImageUrl(imageUrl));
		} else {
			console.log('else block executed');
			await updateDoc(userRef, {
				name: nameRef.current.input.value,
				status: statusRef.current.input.value
			});
			console.log(
				'await finished with' + nameRef.current.input.value,
				statusRef.current.input.value
			);
			dispatch(updateName(nameRef.current.input.value));
			dispatch(updateStatus(statusRef.current.input.value));
		}
		navigate('/home');
		//check
	};
	return (
		<div>
			<div>
				<Topbar></Topbar>
			</div>

			<div className="content-container">
				<div>
					<div className="title-text-container">
						<span className="title-text">Profile Settings</span>
					</div>
					<div className="profile-picture-container">
						<img className="profile-picture" src={image ? image : avatar}></img>
					</div>
					<div className="image-picker">
						<input
							type="file"
							className="form-control"
							accept=".png, .jpg, .jpeg"
							onChange={(e) => {
								imageHandler(e.target.files[0]);
							}}
						/>
					</div>
				</div>

				<div className="form-container">
					<Card>
						<Form size="large" layout="vertical">
							<Form.Item
								label="Name"
								name="name"
								rules={[
									{ required: true, message: 'Please input your full name!' }
								]}
							>
								<Input
									ref={nameRef}
									width={20}
									placeholder="Enter your full name"
								/>
							</Form.Item>
							.
							<Form.Item
								rules={[
									{ required: true, message: 'Please enter your first status' }
								]}
								label="Status"
								nam="status"
							>
								<Input ref={statusRef} placeholder="Set your new status" />
							</Form.Item>
							<Form.Item>
								<Button
									shape="round"
									className="submit-button"
									type="Submit"
									onClick={submitHandler}
								>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default ProfileEdit;
