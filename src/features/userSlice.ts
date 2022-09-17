/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
	isSignin: boolean;
	email: string;
	role: any;
	roles: any;
}

const initialState: UserState = {
	isSignin: false,
	email: '',
	role: null,
	roles: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsSignin: (state, action) => {
			state.isSignin = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setRole: (state, action) => {
			state.role = action.payload;
		},
		setRoles: (state, action) => {
			state.roles = action.payload;
		},
	},
});

export const { setIsSignin, setEmail, setRole, setRoles } = userSlice.actions;

export default userSlice.reducer;
