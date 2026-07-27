import axios, { AxiosError } from 'axios';
import { mapStatusToErrorCode, ErrorCode } from './errors';
import { API_CONFIG, STORAGE_KEYS } from '../config/constants';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_CONFIG.TIMEOUT_MS,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      // Redirect logic...
    }

    const businessError = (error.response?.data as any)?.error;
    if (businessError) {
      return Promise.reject(businessError);
    }

    return Promise.reject({
      code: mapStatusToErrorCode(error.response?.status),
      message: 'An error occurred while communicating with the server.',
      details: error.message
    });
  }
);

export default apiClient;
