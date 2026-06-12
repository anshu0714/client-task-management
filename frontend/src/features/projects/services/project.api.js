import api from "../../../services/api.client";

export const getProjectsApi = async (params) => {
  const res = await api.get("/projects", {
    params,
  });

  return res.data;
};

export const createProjectApi = async (payload) => {
  const res = await api.post("/projects", payload);

  return res.data;
};

export const updateProjectApi = async (id, payload) => {
  const res = await api.patch(`/projects/${id}`, payload);

  return res.data;
};

export const deleteProjectApi = async (id) => {
  const res = await api.delete(`/projects/${id}`);

  return res.data;
};
