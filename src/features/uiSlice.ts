/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import { LatLng } from 'leaflet';

export interface UIState {
	isMenuOpen: boolean;
	isSideMenuOpen: boolean;
	mapZoom: number;
	mapCenter: LatLng;
}

const initialState: UIState = {
	isMenuOpen: false,
	isSideMenuOpen: false,
	mapZoom: 15,
	mapCenter: new LatLng(50, 18),
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setIsMenuOpen: (state, action) => {
			state.isMenuOpen = action.payload;
		},
		setIsSideMenuOpen: (state, action) => {
			state.isSideMenuOpen = action.payload;
		},
		setMapZoom: (state, action) => {
			state.mapZoom = action.payload;
		},
		setMapCenter: (state, action) => {
			state.mapCenter = action.payload;
		},
	},
});

export const { setIsMenuOpen, setIsSideMenuOpen, setMapZoom, setMapCenter } = uiSlice.actions;

export default uiSlice.reducer;
