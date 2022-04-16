import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/testSlice';

export default configureStore({
	reducer: { counter: counterReducer } //add reducers here
});
