/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
	isMenuOpen: boolean;
}

const initialState: UIState = {
	isMenuOpen: false,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setIsMenuOpen: (state, action) => {
			state.isMenuOpen = action.payload;
		},
	},
});

export const { setIsMenuOpen } = uiSlice.actions;

export default uiSlice.reducer;
