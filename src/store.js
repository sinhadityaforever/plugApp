import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/testSlice';
import userReducer from './features/userSlice';

export default configureStore({
	reducer: {
		counter: counterReducer,

		user: userReducer
	} //add reducers here
});
