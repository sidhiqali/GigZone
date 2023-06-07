import axios from 'axios';

const newRequest = axios.create({
  baseURL: 'https://gigzone.onrender.com/api/',
  withCredentials: true,
});

export default newRequest;
