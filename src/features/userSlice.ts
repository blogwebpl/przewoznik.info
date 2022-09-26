/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

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

			if (action.payload === true) {
				const token = localStorage.getItem('token');
				// window.location.origin;
				const socket = io('ws://localhost:3001', {
					query: { token },
				});
				socket.on('error', (error) => {
					console.log(error);
				});

				socket.on('point', (data) => {
					console.log('data');
					console.log(data);
				});

				console.log(socket);
			}
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
		setVehicleLive: (state, action) => {
			state.vehicles = state.vehicles.map((vehicle) => {
				if (vehicle.imei === action.payload.imei) {
					vehicle.live = action.payload.live;
				}
				return vehicle;
			});
		},
		setVehicleShow: (state, action) => {
			state.vehicles = state.vehicles.map((vehicle) => {
				if (vehicle.imei === action.payload.imei) {
					vehicle.show = action.payload.show;
				}
				return vehicle;
			});
		},
		setVehicleInfo: (state, action) => {
			state.vehicles = state.vehicles.map((vehicle) => {
				if (vehicle.imei === action.payload.imei) {
					vehicle.info = action.payload.info;
				}
				return vehicle;
			});
		},
	},
});

export const {
	setIsSignin,
	setEmail,
	setRole,
	setRoles,
	setVehicles,
	setVehicleLive,
	setVehicleShow,
	setVehicleInfo,
} = userSlice.actions;

export default userSlice.reducer;
