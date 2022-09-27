import { io } from 'socket.io-client';
import { store } from './app/store';
import { updateVehicle } from './features/userSlice';

let socket: any = null;
export const createSocket = () => {
	const token = localStorage.getItem('token');
	// window.location.origin;
	socket = io('ws://localhost:3001', {
		query: { token },
	});
	socket.on('error', (error: any) => {
		console.log(error);
	});

	socket.on('point', (data: any) => {
		console.log('point');
		store.dispatch(updateVehicle(data));
	});

	console.log(socket);
};

export const disconnectSocket = () => {
	socket.disconnect();
	socket = null;
};
