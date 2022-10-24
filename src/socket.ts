import { io } from 'socket.io-client';
import { store } from './app/store';
import { updateVehicle } from './features/userSlice';

let socket: any = null;
export const createSocket = () => {
	const token = localStorage.getItem('token');
	const env = process.env.NODE_ENV;
	socket = io(env === 'development' ? 'ws://localhost:3001' : `wss://${window.location.host}`, {
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
