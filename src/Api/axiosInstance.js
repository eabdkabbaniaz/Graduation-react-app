import axios from "axios";

// const token = localStorage.getItem("token")

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    // "Content-Type": "application/json",
    Authorization: `Bearer 1|NC77KbELwkUWQwdYymvBcVLImqrauvV0lDRrOertc31d25ff`
  },
});

export default axiosInstance;
