/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
	isMenuOpen: boolean;
	isSideMenuOpen: boolean;
}

const initialState: UIState = {
	isMenuOpen: false,
	isSideMenuOpen: false,
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
	},
});

export const { setIsMenuOpen, setIsSideMenuOpen } = uiSlice.actions;

export default uiSlice.reducer;
