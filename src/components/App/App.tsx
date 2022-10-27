import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoutes } from '../../ProtectedRoutes';
import { RootState } from '../../app/store';
import axios from '../../axios/axios';
import { setEmail, setIsSignin, setRole, setRoles, setVehicles } from '../../features/userSlice';
import { Blank } from '../Blank';
import { ChangePassword } from '../ChangePassword';
import { Profile } from '../Profile';
import { Signin } from '../Signin';
import { AppBar } from '../UI/AppBar';
import { Drawer } from '../UI/Drawer';
import { Main } from '../UI/Main';
import { MapContainer } from '../Map';
import { SideMenu } from '../Sidemenu/Sidemenu';

export function App() {
	const dispatch = useDispatch();
	const { isSignin } = useSelector((state: RootState) => state.user);

	useLayoutEffect(() => {
		if (isSignin) return;
		const token = localStorage.getItem('token');
		if (token && axios) {
			axios
				.get('user/issignin', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response: any) => {
					dispatch(setIsSignin(true));
					dispatch(setEmail(response.data.email));
					dispatch(setRole(response.data.role));
					dispatch(setRoles(response.data.roles));
					dispatch(setVehicles(response.data.vehicles));
				})
				.catch(() => {
					dispatch(setIsSignin(false));
					localStorage.removeItem('token');
					window.location.reload();
				});
		}
	});
	return (
		<>
			<Main isCovered>
				<Routes>
					<Route path="signin" element={isSignin ? <Blank /> : <Signin />} />
					<Route element={<ProtectedRoutes />}>
						<Route path="" element={<Blank />} />
						<Route path="profile" element={<Profile />} />
						<Route path="change-password" element={<ChangePassword />} />
						<Route path="map" element={<MapContainer />} />
					</Route>
				</Routes>
			</Main>
			<AppBar title="przewoznik.info" />
			<Drawer closeOnClick />
			<SideMenu />
		</>
	);
}
