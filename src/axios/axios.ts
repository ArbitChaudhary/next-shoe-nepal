import axios from "axios";

export const authenticate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authenticate.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);
