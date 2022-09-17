import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { RootState } from './app/store';

export function ProtectedRoutes() {
	const { isSignin } = useSelector((state: RootState) => state.user);
	const token = localStorage.getItem('token');
	const location = useLocation();
	return isSignin || token ? (
		<Outlet />
	) : (
		<Navigate to="/signin" replace state={{ from: location }} />
	);
}
