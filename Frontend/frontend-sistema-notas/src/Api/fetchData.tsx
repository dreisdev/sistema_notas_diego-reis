import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://sistema-notas-api.netlify.app",
});

export default api;
