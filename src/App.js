import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increase } from './features/testSlice';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';

function App() {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	return <Signup></Signup>;
}

export default App;
