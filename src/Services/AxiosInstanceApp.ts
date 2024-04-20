import axios, { AxiosInstance } from "axios";

const AxiosInstanceApp: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export { AxiosInstanceApp };
