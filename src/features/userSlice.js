const { createSlice } = require('@reduxjs/toolkit');

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		id: '',
		name: '',
		email: '',
		isAnonymous: '',
		imageUrl: '',
		status: '',
		likedStatuses: [],
		starredProfiles: []
	},
	reducers: {
		setUser: (state, action) => {
			state = action.payload;
			localStorage.setItem('user', JSON.stringify(state));
			console.log(state.status);
		},
		updateName: (state, action) => {
			state.name = action.payload;
			localStorage.setItem('user', JSON.stringify(state));
		},
		updateImageUrl: (state, action) => {
			state.imageUrl = action.payload;
			localStorage.setItem('user', JSON.stringify(state));
		},
		updateStatus: (state, action) => {
			state.status = action.payload;
			localStorage.setItem('user', JSON.stringify(state));
		}

		// setUser: (state, action) => {
		// 	state.user = action.payload;
		// 	console.log(state.user);
		// 	localStorage.setItem('user', JSON.stringify(state.user));
		// },
		// removeUser: (state, action) => {
		// 	state.user = {};
		// },
		// updateUser: (state, action) => {
		// 	localStorage.setItem('user', JSON.stringify(state.user));
		// },
		// updateStatus: (state, action) => {
		// 	state.user.status = action.payload;
		// 	localStorage.setItem('user', JSON.stringify(state.user));
		// }
	}
});

export const { setUser, updateImageUrl, updateName, updateStatus } =
	userSlice.actions;
export default userSlice.reducer;
