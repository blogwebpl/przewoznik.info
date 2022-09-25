/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
	isMenuOpen: boolean;
	isSideMenuOpen: boolean;
	mapZoom: number;
	mapCenter: [number, number];
}

const initialState: UIState = {
	isMenuOpen: false,
	isSideMenuOpen: false,
	mapZoom: 4,
	mapCenter: [52.06889, 19.47944],
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
