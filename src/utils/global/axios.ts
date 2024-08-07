import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " + (localStorage.getItem("token") || "Empty token value"),
  },
});

export default instance;
