import api from "../../../services/api.client";

export const getTasksApi = async (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );

  const res = await api.get("/tasks", {
    params: cleanParams,
  });

  return res.data;
};

export const getTaskByIdApi = async (id) => {
  const res = await api.get(`/tasks/${id}`);

  return res.data;
};

export const createTaskApi = async (payload) => {
  const res = await api.post("/tasks", payload);

  return res.data;
};

export const updateTaskApi = async (id, payload) => {
  const res = await api.patch(`/tasks/${id}`, payload);

  return res.data;
};

export const deleteTaskApi = async (id) => {
  const res = await api.delete(`/tasks/${id}`);

  return res.data;
};
