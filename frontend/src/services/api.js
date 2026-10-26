import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://moneymate-4bjo.onrender.com";

const API = axios.create({
  baseURL: API_BASE_URL,
});

export default API;