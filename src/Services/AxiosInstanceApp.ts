import axios from "axios";

const AxiosInstanceApp: any = axios.create({
  baseURL: "http://localhost:3000/",
});

export { AxiosInstanceApp };
