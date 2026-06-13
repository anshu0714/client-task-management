import api from "../../../services/api.client";

export const getUsersApi = async (params) => {
  const res = await api.get("/users", {
    params,
  });

  return res.data;
};