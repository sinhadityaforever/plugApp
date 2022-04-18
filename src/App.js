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

function App() {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

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
