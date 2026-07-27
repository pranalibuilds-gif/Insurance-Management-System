import axios, { AxiosError } from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
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
      localStorage.removeItem('auth_token');
      // Redirect to login could be handled here or in a hook
    }

    const businessError = (error.response?.data as any)?.error;
    if (businessError) {
      return Promise.reject(businessError);
    }

    return Promise.reject({
      code: 'UNEXPECTED_ERROR',
      message: 'An unexpected error occurred. Please try again later.',
      details: error.message
    });
  }
);

export default apiClient;
