import axios from "axios";

// const token = localStorage.getItem("token")

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer 1|LZbz8g3xNu8n4v1B53K9cXxXrwcLtYBtTIPGURhDa1636f72`
  },
});

export default axiosInstance;
