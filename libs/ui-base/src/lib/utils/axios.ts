import axios from 'axios';
import { API_ENDPOINTS } from './apiConstants';
import getHostname from './getHostname';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: getHostname(API_ENDPOINTS.API),
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
