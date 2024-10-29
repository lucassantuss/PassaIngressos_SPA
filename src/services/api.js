import axios from "axios";

// URL da WebAPI
const api = axios.create({
  baseURL: "https://passa-ingressos.azurewebsites.net/",
  // baseURL: "http://localhost:5026/", // Testes em Localhost
});

export default api;