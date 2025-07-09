import axios from "axios";
export const API_BASE_URL = "https://4f2a3a08eafd.ngrok-free.app/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
