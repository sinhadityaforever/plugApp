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
			let user = JSON.parse(localStorage.getItem('user'));
			user.name = action.payload;
			state = user;
			localStorage.setItem('user', JSON.stringify(state));
		},
		updateImageUrl: (state, action) => {
			let user = JSON.parse(localStorage.getItem('user'));
			user.imageUrl = action.payload;
			state = user;
			localStorage.setItem('user', JSON.stringify(state));
		},
		updateStatus: (state, action) => {
			let user = JSON.parse(localStorage.getItem('user'));
			user.status = action.payload;
			state = user;
			localStorage.setItem('user', JSON.stringify(state));
		}
	}
});

export const { setUser, updateImageUrl, updateName, updateStatus } =
	userSlice.actions;
export default userSlice.reducer;
