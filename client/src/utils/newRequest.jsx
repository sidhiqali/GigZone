import axios from 'axios';

const newRequest = axios.create({
  baseURL: 'https://gigzone.up.railway.app/api/',
  withCredentials: true,
});

export default newRequest;
