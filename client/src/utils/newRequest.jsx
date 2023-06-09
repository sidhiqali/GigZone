import axios from 'axios';

const newRequest = axios.create({
  baseURL: 'https://gigzone.onrender.com/api/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default newRequest;
