import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://sistema-notas-api.cyclic.app",
});

export default api;
