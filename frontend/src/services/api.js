// frontend/src/services/api.js

import axios from 'axios';

// CHANGED: Use the environment variable for your deployed Render backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Useful for handling CSRF if needed, but not for the token
  headers: {
    'Content-Type': 'application/json',
  },
  // REMOVED: The static Authorization header was the source of the error.
});

// NEW: Use a request interceptor to dynamically add the auth token.
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage on each request
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers['Authorization'] = `Token ${token}`;
    }
    
    // The CSRF token logic can be simplified or removed if only using TokenAuthentication
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];

    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    
    console.log('Starting Request', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.log('Error Response:', error.response);
    return Promise.reject(error);
  }
);


// Auth endpoints (no changes needed here)
export const authAPI = {
  register: (userData) => api.post('/auth/register/', userData),
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/'),
  getCurrentUser: () => api.get('/auth/me/'),
  getUserProfile: (username) => api.get(`/auth/profile/${username}/`),
};

// Posts endpoints (no changes needed here)
export const postsAPI = {
  getAllPosts: () => api.get('/posts/'),
  createPost: (postData) => api.post('/posts/', postData),
  getUserPosts: (username) => api.get(`/posts/user/${username}/`),
};

export default api;
