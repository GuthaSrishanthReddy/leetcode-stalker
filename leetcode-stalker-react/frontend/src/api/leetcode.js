import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const listProfiles = () => {
  return axios.get(`${API_BASE_URL}/leetcode/home`, authHeaders());
};

export async function addProfile(username, token) {
  return axios.post(
    `${API_BASE_URL}/leetcode/add/${username}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}




export const deleteProfile = (id) => {
  return axios.delete(`${API_BASE_URL}/leetcode/delete/${id}`, authHeaders());
};

export const refreshProfile = (username) => {
  return axios.post(
    `${API_BASE_URL}/leetcode/refresh/${username}`,
    {},
    authHeaders()
  );
};
