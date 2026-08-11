import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// ATTACH JWT TOKEN TO EVERY REQUEST
// ========================================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("fp_token");

    console.log("API JWT Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// HANDLE API ERRORS
// ========================================
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default API;