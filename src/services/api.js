import axios from "axios";

// URL da WebAPI
const api = axios.create({
  baseURL: "https://passaingressos-bxcgfegjh7gdexfp.brazilsouth-01.azurewebsites.net/",
  // baseURL: "http://localhost:5026/", // Testes em Localhost
});

export default api;