import axios from 'axios';
import JwtService from './jwtService';

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const jwt = new JwtService(axiosIns);
export default jwt;
