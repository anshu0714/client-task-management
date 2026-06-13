import api from "../../../services/api.client";

export const getCommentsApi = async (taskId) => {
  const res = await api.get(`/tasks/${taskId}/comments`);
  return res.data;
};

export const createCommentApi = async (taskId, payload) => {
  const res = await api.post(`/tasks/${taskId}/comments`, payload);
  return res.data;
};