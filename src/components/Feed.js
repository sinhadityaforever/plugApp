import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { feedData } from '../features/dummyData';
import './Feed.css';
import avatar from '../../assets/avatar.png';
import { HeartOutlined, StarOutlined } from '@ant-design/icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useSelector } from 'react-redux';

function Feed() {
	const initialUser = JSON.parse(localStorage.getItem('user'));

	const [posts, setPosts] = useState();
	let dummyArray = [];
	const getPosts = async () => {
		const usersRef = collection(db, 'users');

		const q = query(usersRef, where('email', '!=', initialUser.email));
		try {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, ' => ', doc.data());
				dummyArray.push({
					id: doc.id,
					name: doc.data().name,
					email: doc.data().email,
					imageUrl: doc.data().imageUrl,
					status: doc.data().status
				});
				setPosts(dummyArray);
				console.log(posts);
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div>
			{posts ? (
				posts.map((doc) => {
					console.log(doc.name);
					return (
						<Card key={doc.id} className="feed-card">
							<div className="profile-header">
								<img
									className="profile-avatar"
									src={doc.imageUrl ? doc.imageUrl : avatar}
								></img>
								<span>{doc.name}</span>
								<StarOutlined
									className="reactions-icon"
									style={{ marginLeft: '5px' }}
								></StarOutlined>
							</div>
							<hr className="card-hr" />
							<div className="card-content">
								<p>{doc.status}</p>
							</div>
							<div className="card-reactions">
								<HeartOutlined className="reactions-icon"></HeartOutlined>
								<span>people liked it</span>
							</div>
						</Card>
					);
				})
			) : (
				<div></div>
			)}
		</div>
	);
}

export default Feed;
