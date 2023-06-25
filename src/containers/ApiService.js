// apiService.js
import axios from "axios";

const apiService = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Add authentication token to request headers
apiService.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers.Authorization = `Token ${authToken}`;
  }
  return config;
});

export default apiService;
