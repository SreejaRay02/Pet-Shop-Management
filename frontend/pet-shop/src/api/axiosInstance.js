// Axios library for making HTTP requests
import axios from 'axios';

// Import our Zustand store to get the authentication token
import { useAuthStore } from '../stores/authStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});


axiosInstance.interceptors.request.use(
  (config) => {
    // Get the current token from our Zustand global state
    const token = useAuthStore.getState().token;
    
    // If the user has a token, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Return the modified configuration so Axios can proceed with the request
    return config;
  },
  // If there's an error before the request is even sent, reject it
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  // If the response is successful, just pass it through
  (response) => response,
  
  // If the server returns an error
  (error) => {
    // Check if it's a 401 Unauthorized error
    if (error.response?.status === 401) {
      // Clear the user data from Zustand store
      useAuthStore.getState().logout();
      // Redirect the user back to the login page
      window.location.href = '/login';
    }
    // Reject the promise so the component knows an error happened
    return Promise.reject(error);
  }
);

export default axiosInstance;

