import apiClient from "../../../services/api.client";

export const getDashboardStats = async () => {
  const { data } = await apiClient.get("/dashboard");
  return data.data;
};
