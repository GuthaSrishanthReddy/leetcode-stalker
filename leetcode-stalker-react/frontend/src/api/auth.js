import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export async function registerUser(email, password) {
  return axios.post(`${API_URL}/register`, { email, password });
}

export async function loginUser(email, password) {
  return axios.post(`${API_URL}/login`, { email, password });
}
