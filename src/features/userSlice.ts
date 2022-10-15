/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import { createSocket, disconnectSocket } from '../socket';

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
				createSocket();
			} else {
				disconnectSocket();
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
		updateVehicle: (state, action) => {
			const { vehicles } = state;
			const vehicleIndex = _.findIndex(vehicles, { vid: action.payload.vid });
			const vehicleExists = vehicleIndex > -1;
			const vehicleTime = action.payload.time;
			const currentTime = state.vehicles[vehicleIndex].time;
			if (vehicleExists && vehicleTime >= currentTime) {
				vehicles[vehicleIndex] = {
					...state.vehicles[vehicleIndex],
					...action.payload,
				};
				state.vehicles = vehicles;
			}
		},
		setVehicleFollow: (state, action) => {
			state.vehicles = state.vehicles.map((vehicle) => {
				if (vehicle.vid === action.payload.vid) {
					vehicle.follow = action.payload.follow;
				}
				return vehicle;
			});
		},
		setVehicleShow: (state, action) => {
			state.vehicles = state.vehicles.map((vehicle) => {
				if (vehicle.vid === action.payload.vid) {
					vehicle.show = action.payload.show;
				}
				return vehicle;
			});
		},
		setVehicleInfo: (state, action) => {
			state.vehicles = state.vehicles.map((vehicle) => {
				if (vehicle.vid === action.payload.vid) {
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
	updateVehicle,
	setVehicleFollow,
	setVehicleShow,
	setVehicleInfo,
} = userSlice.actions;

export default userSlice.reducer;
