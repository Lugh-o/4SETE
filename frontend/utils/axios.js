import axiosLib from "axios";
import { getToken } from "../services/TokenService";

const axios = axiosLib.create({
  // baseURL: "https://casual-eft-slightly.ngrok-free.app/api",
  baseURL: "http://192.168.0.19:8080/api",
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.request.use(async (req) => {
  const token = await getToken();

  if (token !== null) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

export default axios;
