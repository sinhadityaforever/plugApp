import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { feedData } from '../features/dummyData';
import './Feed.css';
import avatar from '../../assets/avatar.png';
import {
	HeartFilled,
	HeartOutlined,
	StarFilled,
	StarOutlined
} from '@ant-design/icons';
import {
	collection,
	query,
	where,
	getDocs,
	updateDoc,
	arrayUnion,
	arrayRemove,
	doc,
	orderBy
} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useSelector } from 'react-redux';

function Feed() {
	const initialUser = JSON.parse(localStorage.getItem('user'));
	const usersRef = collection(db, 'users');

	const [posts, setPosts] = useState();
	let dummyArray = [];
	let dummyLikeCounter = [];
	const [likedProfiles, setLikedProfiles] = useState([]);
	const [starredProfiles, setStarredProfiles] = useState([]);
	const [likeCounter, setLikeCounter] = useState();
	//fetch  users logic
	const getPosts = async () => {
		console.log(initialUser.email + 'inittt');
		const q = query(usersRef, where('email', '!=', initialUser.email));
		const q2 = query(usersRef, where('email', '==', initialUser.email));

		try {
			const querySnapshot = await getDocs(q);
			const userSnapshot = await getDocs(q2);

			//Problematic line of code

			setLikedProfiles(userSnapshot.docs[0].data().likedProfiles);
			setStarredProfiles(userSnapshot.docs[0].data().starredProfiles);

			querySnapshot.forEach((doc) => {
				console.log(doc.id, ' => ', doc.data());

				dummyArray.push({
					id: doc.id,
					name: doc.data().name,
					email: doc.data().email,
					imageUrl: doc.data().imageUrl,
					status: doc.data().status,
					likers: doc.data().likers
				});

				dummyLikeCounter[doc.id] = doc.data().likers
					? doc.data().likers.length
					: 0;
				setLikeCounter(dummyLikeCounter);

				setPosts(
					dummyArray.sort((p1, p2) => {
						const p2len = p2.likers ? p2.likers.length : 0;
						const p1len = p1.likers ? p1.likers.length : 0;

						return p2len - p1len;
					})
				);
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getPosts();
	}, []);

	//Likes logic
	const likeHandler = async (toLike, id) => {
		const thisUserRef = doc(db, 'users', initialUser.id);
		const profileHolderRef = doc(db, 'users', id);
		if (toLike) {
			//add to state array
			setLikedProfiles((oldArray) => [...oldArray, id]);

			//add to likeCounter state variable
			let tempCounter = { ...likeCounter };

			tempCounter[id] = tempCounter[id] + 1;
			setLikeCounter(tempCounter);

			//call and add to this users likedProfiles array

			await updateDoc(thisUserRef, {
				likedProfiles: arrayUnion(id)
			});
			//call and add to profileHolder's likers array
			await updateDoc(profileHolderRef, {
				likers: arrayUnion(initialUser.id),
				totalLikes: likeCounter[id]
			});
		} else {
			let temp = [...likedProfiles];

			const index = temp.indexOf(id);

			temp.splice(index, 1);

			setLikedProfiles(temp);

			let tempCounter = { ...likeCounter };

			tempCounter[id] = tempCounter[id] - 1;
			setLikeCounter(tempCounter);
			await updateDoc(thisUserRef, {
				likedProfiles: arrayRemove(id)
			});

			await updateDoc(profileHolderRef, {
				likers: arrayRemove(initialUser.id),

				totalLikes: likeCounter.length
			});
		}
	};

	//starring logic
	const starHandler = async (toStar, id) => {
		const thisUserRef = doc(db, 'users', initialUser.id);
		const profileHolderRef = doc(db, 'users', id);
		if (toStar) {
			//add to state array
			setStarredProfiles((oldArray) => [...oldArray, id]);

			//call and add to this users likedProfiles array
			await updateDoc(thisUserRef, {
				starredProfiles: arrayUnion(id)
			});
		} else {
			let temp = [...starredProfiles];
			const index = temp.indexOf(id);

			temp.splice(index, 1);
			setStarredProfiles(temp);

			await updateDoc(thisUserRef, {
				starredProfiles: arrayRemove(id)
			});
		}
	};

	return (
		<div>
			{posts ? (
				posts.map((doc) => {
					return (
						starredProfiles.includes(doc.id) && (
							<Card key={doc.id} className="feed-card">
								<div className="profile-header">
									<img
										className="profile-avatar"
										src={doc.imageUrl ? doc.imageUrl : avatar}
									></img>
									<span>{doc.name}</span>
									{starredProfiles && starredProfiles.includes(doc.id) ? (
										<StarFilled
											onClick={() => {
												starHandler(false, doc.id);
											}}
											className="reactions-icon"
											style={{ marginLeft: '5px' }}
										></StarFilled>
									) : (
										<StarOutlined
											onClick={() => {
												starHandler(true, doc.id);
											}}
											className="reactions-icon"
											style={{ marginLeft: '5px' }}
										></StarOutlined>
									)}
								</div>
								<hr className="card-hr" />
								<div className="card-content">
									<p>{doc.status}</p>
								</div>
								<div className="card-reactions">
									{likedProfiles && likedProfiles.includes(doc.id) ? (
										<HeartFilled
											onClick={() => {
												likeHandler(false, doc.id);
											}}
											className="reactions-icon"
										></HeartFilled>
									) : (
										<HeartOutlined
											onClick={() => {
												likeHandler(true, doc.id);
											}}
											className="reactions-icon"
										></HeartOutlined>
									)}

									<span> {likeCounter[doc.id]} people liked it</span>
								</div>
							</Card>
						)
					);
				})
			) : (
				<div></div>
			)}
			{posts ? (
				posts.map((doc) => {
					return (
						!starredProfiles.includes(doc.id) && (
							<Card key={doc.id} className="feed-card">
								<div className="profile-header">
									<img
										className="profile-avatar"
										src={doc.imageUrl ? doc.imageUrl : avatar}
									></img>
									<span>{doc.name}</span>
									{starredProfiles && starredProfiles.includes(doc.id) ? (
										<StarFilled
											onClick={() => {
												starHandler(false, doc.id);
											}}
											className="reactions-icon"
											style={{ marginLeft: '5px' }}
										></StarFilled>
									) : (
										<StarOutlined
											onClick={() => {
												starHandler(true, doc.id);
											}}
											className="reactions-icon"
											style={{ marginLeft: '5px' }}
										></StarOutlined>
									)}
								</div>
								<hr className="card-hr" />
								<div className="card-content">
									<p>{doc.status}</p>
								</div>
								<div className="card-reactions">
									{likedProfiles && likedProfiles.includes(doc.id) ? (
										<HeartFilled
											onClick={() => {
												likeHandler(false, doc.id);
											}}
											className="reactions-icon"
										></HeartFilled>
									) : (
										<HeartOutlined
											onClick={() => {
												likeHandler(true, doc.id);
											}}
											className="reactions-icon"
										></HeartOutlined>
									)}

									<span> {likeCounter[doc.id]} people liked it</span>
								</div>
							</Card>
						)
					);
				})
			) : (
				<div></div>
			)}
		</div>
	);
}

export default Feed;
