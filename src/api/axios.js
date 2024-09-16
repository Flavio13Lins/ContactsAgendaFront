import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://localhost:8181/api/",
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
});

export default axiosAPI;
