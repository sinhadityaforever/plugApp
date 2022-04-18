import { Card, Form, Switch, Input, Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import loginImage from '../../assets/login2png.png';
import LandingHeader from '../components/LandingHeader';
import './Login.css';
import logo from '../../assets/logo.png';
import logoText from '../../assets/logo-text2.png';
import { Link, useNavigate } from 'react-router-dom';
import { authHelper } from '../../helpers/firebaseAuthHelper';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

function Login() {
	const [isAnonymous, setIsAnonymous] = useState(false);
	const phraseRef = useRef();
	const navigate = useNavigate();
	const onLogin = async () => {
		if (!isAnonymous) {
			const result = await authHelper();
			if (!result.isError) {
				try {
					const q = query(
						collection(db, 'users'),
						where('email', '==', result.data.user.email)
					);
					const querySnapshot = await getDocs(q);
					if (!querySnapshot.empty) {
						//Set redux user
						//Redirect
						navigate('/home');
					} else {
						message.error(`You're not a registered user`);
					}
				} catch (error) {
					message.error('Cant log you in at this moment');
					console.log(error);
				}
			}
		} else {
			console.log(phraseRef.current.input.value);
			try {
				const q = query(
					collection(db, 'users'),
					where('secretPhrase', '==', phraseRef.current.input.value)
				);
				const querySnapshot = await getDocs(q);
				if (!querySnapshot.empty) {
					navigate('/home');
				} else {
					message.error('Invalid Secret Phrase');
				}
			} catch (error) {
				message.error('An error occurred.');
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
								size="large"
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
								{!isAnonymous ? (
									<div></div>
								) : (
									<Form.Item
										label="Secret Security Phrase"
										name="phrase"
										rules={[
											{
												required: true,
												message: 'Please enter your secret security phrase'
											}
										]}
									>
										<Input ref={phraseRef} />
									</Form.Item>
								)}

								<Form.Item>
									<div style={{ display: 'flex' }}>
										<Switch
											onChange={() => {
												setIsAnonymous(!isAnonymous);
											}}
										></Switch>
										<p style={{ marginLeft: '5px' }}>Anonymous login?</p>
									</div>
								</Form.Item>
								<Form.Item>
									<Button
										style={{ backgroundColor: '#A16AE8', border: 'none' }}
										shape="round"
										type="primary"
										htmlType="submit"
										size="large"
										onClick={onLogin}
									>
										{isAnonymous ? 'Login anonymously' : 'Google login'}
									</Button>
								</Form.Item>
							</Form>

							<Link to="/signup">
								<Button shape="round">New Here? Signup Instead.</Button>
							</Link>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default Login;
