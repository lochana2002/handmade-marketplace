// src/services/authService.js
import api from "./api";

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);

  // IMPORTANT: store here OR in context
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};