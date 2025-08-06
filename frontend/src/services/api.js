import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Function to get CSRF token
const getCSRFToken = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Authorization': `Token ${userToken}`,
    'Content-Type': 'application/json',
  },
});

// Add CSRF token to requests
api.interceptors.request.use(request => {
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    request.headers['X-CSRFToken'] = csrfToken;
  }
  console.log('Starting Request', request);
  return request;
});

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

// Auth endpoints
export const authAPI = {
  register: (userData) => api.post('/auth/register/', userData),
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/'),
  getCurrentUser: () => api.get('/auth/me/'),
  getUserProfile: (username) => api.get(`/auth/profile/${username}/`),
};

// Posts endpoints
export const postsAPI = {
  getAllPosts: () => api.get('/posts/'),
  createPost: (postData) => api.post('/posts/', postData),
  getUserPosts: (username) => api.get(`/posts/user/${username}/`),
};

export default api;
