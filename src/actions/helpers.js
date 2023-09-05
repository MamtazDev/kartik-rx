import axios from 'axios';
import {apiUrl} from 'serviceWorker';

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: apiUrl + '/api/v1',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
