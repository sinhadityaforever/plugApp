import React from 'react';
import Topbar from '../components/Topbar';
import './ProfileEdit.css';
import avatar from '../../assets/avatar.png';
import { Form, Input, Option, Select, Button, Card } from 'antd';

function ProfileEdit() {
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
						<img className="profile-picture" src={avatar}></img>
					</div>
					<div className="image-picker">
						<input
							type="file"
							className="form-control"
							accept=".png, .jpg, .jpeg"
							// onChange={(e) => {
							//   previewFile(e.target.files![0]);
							// }}
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
								<Input width={20} placeholder="Enter your full name" />
							</Form.Item>
							<Form.Item
								name="gender"
								label="Gender"
								rules={[
									{ required: true, message: 'Please select your gender' }
								]}
							>
								<Select
									placeholder="Select an option"
									// onChange={this.onGenderChange}
									allowClear
								>
									<Option value="male">male</Option>
									<Option value="female">female</Option>
									<Option value="other">other</Option>
								</Select>
							</Form.Item>

							<Form.Item label="Status">
								<Input placeholder="Set your new status" />
							</Form.Item>
							<Form.Item>
								<Button shape="round" className="submit-button" type="submit">
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
