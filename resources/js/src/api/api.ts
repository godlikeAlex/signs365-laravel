import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_APP_URL}/api`,
});

api.interceptors.request.use(async (config) => {
  if (config.headers === undefined) {
    config.headers = {};
  }

  return config;
});

axios.defaults.withCredentials = true;

export default api;
