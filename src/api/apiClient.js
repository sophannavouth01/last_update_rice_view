// src/api/apiClient.js

import axios from 'axios';
import { getAuthToken, isTokenExpired, clearAuth } from '@/utils/auth';
import router from '@/router';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure to set this in your environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is expired or invalid
      clearAuth();
      router.push('/'); // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;
