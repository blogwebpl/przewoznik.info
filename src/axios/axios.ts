import axios from 'axios';

const URL = 'http://localhost:3001/api';

const instance = axios.create({
	baseURL: URL,
});

export default instance;
