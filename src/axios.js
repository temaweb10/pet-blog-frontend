import axios from "axios";

const istance = axios.create({
  baseURL: "http://localhost:4444",
});

istance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default istance;
