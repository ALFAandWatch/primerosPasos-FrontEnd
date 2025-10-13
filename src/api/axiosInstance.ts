import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'http://localhost:3000/api/',
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
});

axiosInstance.interceptors.request.use(
   (config) => {
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default axiosInstance;
