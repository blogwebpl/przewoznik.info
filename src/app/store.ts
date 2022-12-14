import { configureStore } from '@reduxjs/toolkit';

import uiReducer from '../features/uiSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
	reducer: {
		ui: uiReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
