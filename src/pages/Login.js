import { Card, Form, Switch, Input, Button } from 'antd';
import React, { useState } from 'react';
import loginImage from '../../assets/login2png.png';
import LandingHeader from '../components/LandingHeader';
import './Login.css';
import logo from '../../assets/logo.png';
import logoText from '../../assets/logo-text2.png';
import { Link } from 'react-router-dom';

function Login() {
	const [isAnonymous, setIsAnonymous] = useState(false);
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
									<div>
										<Form.Item
											label="Email Address"
											name="email"
											rules={[
												{
													required: true,
													message: 'Please enter an email'
												}
											]}
										>
											<Input />
										</Form.Item>
										<Form.Item
											label="Password"
											name="password"
											rules={[
												{
													required: true,
													message: 'Please input your password!'
												}
											]}
										>
											<Input.Password />
										</Form.Item>
									</div>
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
										<Input />
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
									>
										Login
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
