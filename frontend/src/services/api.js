import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Task API
export const taskAPI = {
  // Get all tasks with optional filters
  getTasks: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    return api.get(`/tasks?${params.toString()}`);
  },

  // Get single task
  getTask: (id) => api.get(`/tasks/${id}`),

  // Create task with file upload
  createTask: (formData) => {
    return api.post('/tasks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Update task
  updateTask: (id, formData) => {
    return api.put(`/tasks/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Delete task
  deleteTask: (id) => api.delete(`/tasks/${id}`),

  // Get user stats
  getMyStats: () => api.get('/tasks/stats/me')
};

// Admin API
export const adminAPI = {
  // Get dashboard stats
  getDashboardStats: () => api.get('/admin/stats'),

  // User management
  getAllUsers: () => api.get('/admin/users'),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),

  // Task management
  getAllTasks: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);
    if (filters.userId) params.append('userId', filters.userId);
    return api.get(`/admin/tasks?${params.toString()}`);
  }
};

export default api;
