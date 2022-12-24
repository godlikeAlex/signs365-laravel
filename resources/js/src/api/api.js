import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_APP_URL}/api`,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (config.headers === undefined) {
    config.headers = {};
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
