import api from "../../../services/api.client";

export const getClientsApi = async (params) => {
  const res = await api.get("/clients", {
    params,
  });

  return res.data;
};

export const createClientApi = async (payload) => {
  const res = await api.post("/clients", payload);

  return res.data;
};

export const getClientByIdApi = async (id) => {
  const res = await api.get(`/clients/${id}`);
  return res.data;
};

export const updateClientApi = async (id, payload) => {
  const res = await api.patch(`/clients/${id}`, payload);

  return res.data;
};

export const deleteClientApi = async (id) => {
  const res = await api.delete(`/clients/${id}`);

  return res.data;
};
