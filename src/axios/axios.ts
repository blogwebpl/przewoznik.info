import axios from 'axios';

const env = process.env.NODE_ENV;

const URL = env === 'development' ? 'http://localhost:3001/api' : `${window.location.origin}/api`;

const instance = axios.create({
	baseURL: URL,
});

export default instance;
