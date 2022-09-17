/* eslint-disable consistent-return */
import { useDispatch } from 'react-redux';

import axios from '../axios/axios';
import { setIsSignin } from '../features/userSlice';

export default (method: string): any => {
	const dispatch = useDispatch();
	if (!axios) {
		throw new Error('Axios Required');
	}
	switch (method) {
		case 'post':
			return ({ url, params }: { url: string; params: any }) => {
				const token = localStorage.getItem('token');
				return axios
					.post(url, params, {
						headers: { Authorization: `Bearer ${token}` },
					})
					.then((response) => {
						return response;
					})
					.catch((error) => {
						if (error && error.response && error.response.status === 401) {
							dispatch(setIsSignin(false));
						}
					});
			};
		case 'get':
			return ({ url }: { url: string }) => {
				const token = localStorage.getItem('token');
				return axios
					.get(url, {
						headers: { Authorization: `Bearer ${token}` },
					})
					.then((response) => {
						return response;
					})
					.catch((error) => {
						if (error && error.response && error.response.status === 401) {
							dispatch(setIsSignin(false));
						}
					});
			};
		default:
	}
};
