import axios from "axios";

// Base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, 
});

// Request interceptor (optional enhancement)
api.interceptors.request.use((config) => {
  return config;
});

// Response interceptor (future: refresh token handling)
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    return Promise.reject(err);
  }
);

export default api;