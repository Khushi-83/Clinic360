import axios from "axios";
const API_URL = "https://clinic360-7rgl.onrender.com/api/auth";

export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};
