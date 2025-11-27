import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export function registerUser(email, password) {
  return axios.post(`${API_URL}/register`, { email, password });
}

export function loginUser(email, password) {
  return axios.post(`${API_URL}/login`, { email, password });
}
