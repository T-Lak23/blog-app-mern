import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-app-mern-backend-o7ya.onrender.com/api/",
  withCredentials: true,
});

export default API;
