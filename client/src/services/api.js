import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ================================
// ATTACH JWT TOKEN TO EVERY REQUEST
// ================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("fp_token");

    console.log("JWT Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================================
// RESPONSE ERROR HANDLER
// ================================
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("fp_token");
    }

    return Promise.reject(
      new Error(
        error.response?.data?.message ||
        "Something went wrong"
      )
    );
  }
);

export default api;