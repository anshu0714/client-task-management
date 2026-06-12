import api from "../../../services/api.client";

export const loginApi = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const signupApi = async (payload) => {
  const res = await api.post("/auth/signup", payload);
  return res.data;
};

export const getMeApi = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logoutApi = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
