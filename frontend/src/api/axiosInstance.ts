import axios from "axios";
import router from "../router"; // Import Vue Router

const api = axios.create({
  baseURL: "https://vue-nextjs-exercise.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if no token
      return Promise.reject("No token found! Redirecting to login...");
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      router.push("/login"); // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
