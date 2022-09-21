/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
	isSignin: boolean;
	email: string;
	role: any;
	roles: any[];
	vehicles: any[];
}

const initialState: UserState = {
	isSignin: false,
	email: '',
	role: null,
	roles: [],
	vehicles: [],
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
		setVehicles: (state, action) => {
			state.vehicles = action.payload;
		},
	},
});

export const { setIsSignin, setEmail, setRole, setRoles, setVehicles } = userSlice.actions;

export default userSlice.reducer;
