import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://146.59.255.88:8000/", // Replace with your base URL
  // You can add more custom configurations here
});

export default axiosInstance;
