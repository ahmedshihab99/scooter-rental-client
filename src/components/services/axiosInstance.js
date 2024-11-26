import axios from "axios";
import AuthService from "./AuthService";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL, // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;