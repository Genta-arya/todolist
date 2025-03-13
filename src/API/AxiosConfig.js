import axios from "axios";

const AxiosConfig = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default AxiosConfig;
