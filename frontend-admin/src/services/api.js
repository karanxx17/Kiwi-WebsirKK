import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "https://backend.kiwiconnectdigital.com/api";

// Create axios instance
const api = axios.create({ baseURL: API_BASE });

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// Stories
export const storiesAPI = {
  getAll: () => api.get("/stories"),
  create: (data) => api.post("/stories", data),
  update: (id, data) => api.put(`/stories/${id}`, data),
  delete: (id) => api.delete(`/stories/${id}`),
  markSeen: (id) => api.post(`/stories/${id}/seen`),
};

// Posts
export const postsAPI = {
  getAll: () => api.get("/posts"),
  create: (data) => api.post("/posts", data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
  like: (id) => api.post(`/posts/${id}/like`),
  addComment: (id, data) => api.post(`/posts/${id}/comment`, data),
};

// Reels
export const reelsAPI = {
  getAll: () => api.get("/reels"),
  create: (data) => api.post("/reels", data),
  update: (id, data) => api.put(`/reels/${id}`, data),
  delete: (id) => api.delete(`/reels/${id}`),
  like: (id) => api.post(`/reels/${id}/like`),
  addComment: (id, data) => api.post(`/reels/${id}/comment`, data),
};

// Users
export const usersAPI = {
  getAll: () => api.get("/users"),
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put("/users/profile", data),
};

// Employees
export const employeesAPI = {
  getAll: () => api.get("/employees"),
  create: (data) => api.post("/employees", data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
};

export default api;
