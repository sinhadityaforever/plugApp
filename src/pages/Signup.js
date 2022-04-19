import { Card, Form, Switch, Input, Button, message } from 'antd';
import React, { useState } from 'react';
import loginImage from '../../assets/login2png.png';
import './Login.css';
import logoText from '../../assets/logo-text2.png';
import { Link, useNavigate } from 'react-router-dom';
import { authHelper } from '../../helpers/firebaseAuthHelper';
import { db } from '../../config/firebaseConfig';
import uuid from 'react-uuid';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
const axios = require('axios');
import { generateSlug } from 'random-word-slugs';
import { confirm } from 'react-confirm-box';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';

function Signup() {
	const dispatch = useDispatch();
	const [isAnonymous, setIsAnonymous] = useState(false);
	const navigate = useNavigate();
	const onSignup = async () => {
		if (!isAnonymous) {
			const result = await authHelper();

			if (!result.isError) {
				try {
					const q = query(
						collection(db, 'users'),
						where('email', '==', result.data.user.email)
					);

					const querySnapshot = await getDocs(q);
					if (querySnapshot.empty) {
						try {
							const newUser = await addDoc(collection(db, 'users'), {
								name: result.data.user.displayName,
								email: result.data.user.email,
								isAnonymous: false
							});
							dispatch(
								setUser({
									id: newUser.id,
									name: result.data.user.displayName,
									email: result.data.user.email,
									isAnonymous: false
								})
							);

							localStorage.setItem('userId', newUser.id);
							navigate('/editProfile');
						} catch (error) {
							message.error('Sorry, we cant sign you up at this moment');
						}
					} else {
						message.error(`You've already signed up. Please login`);
						return;
					}
				} catch (error) {
					message.error('Cant sign you up at this moment.');
					console.log(error);
				}
			} else {
				message.error('Cant log you in at this moment.');
			}
		} else {
			try {
				const slug = generateSlug(10, { format: 'title' });
				console.log(slug);
				const randomUser = await axios.get('https://randomuser.me/api');
				console.log(randomUser.data.results[0]);
				const options = {
					labels: {
						confirmable: 'Confirm',
						cancellable: 'Cancel'
					}
				};
				const result = await confirm(
					`You'd be signing up as ${
						randomUser.data.results[0].name.first +
						' ' +
						randomUser.data.results[0].name.last
					}. Also, to login with this anonymous account, keep this phrase somewhere safe: "${slug}"`,
					options
				);
				if (result) {
					try {
						const newUser = await addDoc(collection(db, 'users'), {
							name: `${
								randomUser.data.results[0].name.first +
								' ' +
								randomUser.data.results[0].name.last
							}`,
							email: randomUser.data.results[0].email,
							isAnonymous: true,
							secretPhrase: slug
						});
						dispatch(
							setUser({
								id: newUser.id,
								name: `${
									randomUser.data.results[0].name.first +
									' ' +
									randomUser.data.results[0].name.last
								}`,
								email: randomUser.data.results[0].email,
								isAnonymous: true
							})
						);
						localStorage.setItem('userId', newUser.id);
						navigate('/editProfile');
					} catch (error) {
						message.error('Sorry, we cant sign you up at this moment');
					}

					return;
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div>
			<Link to="/">
				<img
					src={logoText}
					style={{
						width: '8%',
						height: '8%',
						marginTop: '1rem',
						marginLeft: '0.5rem'
					}}
				></img>
			</Link>
			<div className="container">
				<div className="info-image">
					<img src={loginImage} style={{ height: '60%', width: '60%' }}></img>
				</div>
				<div className="login-card">
					<Card
						hoverable
						style={{ width: '90%', borderWidth: '3px', borderRadius: '2%' }}
					>
						<div className="login-form">
							<Form
								layout="vertical"
								size="medium"
								name="basic"
								labelCol={{
									span: 8
								}}
								wrapperCol={{
									span: 16
								}}
								initialValues={{
									remember: true
								}}
								//  onFinish={onFinish}
								//  onFinishFailed={onFinishFailed}
								autoComplete="off"
							>
								<Form.Item>
									<div style={{ display: 'flex' }}>
										<Switch
											onChange={() => {
												setIsAnonymous(!isAnonymous);
											}}
										></Switch>
										<p style={{ marginLeft: '5px' }}>Enter Anonymously?</p>
									</div>
								</Form.Item>
								<Form.Item>
									<Button
										style={{ backgroundColor: '#A16AE8', border: 'none' }}
										shape="round"
										type="primary"
										htmlType="submit"
										onClick={onSignup}
									>
										{isAnonymous ? 'Enter Anonymously' : 'Signup With Google'}
									</Button>
								</Form.Item>
							</Form>

							<Link to="/login">
								<Button shape="round">Already signed up? Login Instead</Button>
							</Link>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default Signup;
