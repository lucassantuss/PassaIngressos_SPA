import axios from "axios";

// URL da WebAPI
const api = axios.create({
  baseURL: "http://localhost:5026/",
});

export default api;