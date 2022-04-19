import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increase } from './features/testSlice';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProfileEdit from './pages/ProfileEdit';
import { initializeApp } from 'firebase/app';
import { db, firebaseApp } from '../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { setUser } from './features/userSlice';

function App() {
	const dispatch = useDispatch();
	firebaseApp();

	const retrieveUser = () => {
		console.log('heyoo');
		if (localStorage.getItem('user')) {
			const user = JSON.parse(localStorage.getItem('user'));
			dispatch(setUser(user));
			console.log('setUser done');
		}
	};

	retrieveUser();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing></Landing>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
				<Route path="/signup" element={<Signup></Signup>}></Route>
				<Route path="/home" element={<Home></Home>}></Route>
				<Route path="/editprofile" element={<ProfileEdit />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
