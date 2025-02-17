import axios from "axios";

const url =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "https://recruitment-api-hssc.onrender.com/api";

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
