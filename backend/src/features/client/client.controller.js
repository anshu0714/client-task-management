const clientService = require("./client.service");
const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/response");

const createClient = asyncHandler(async (req, res) => {
  const client = await clientService.createClient(req.body);

  return sendResponse(res, {
    status: 201,
    message: "Client created successfully",
    data: client,
  });
});

const getClients = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await clientService.getClients({
    page,
    limit,
  });

  return sendResponse(res, {
    message: "Clients fetched successfully",
    data: result,
  });
});

const getClientById = asyncHandler(async (req, res) => {
  const client = await clientService.getClientById(req.params.id);

  return sendResponse(res, {
    message: "Client fetched successfully",
    data: client,
  });
});

const updateClient = asyncHandler(async (req, res) => {
  const client = await clientService.updateClient(req.params.id, req.body);

  return sendResponse(res, {
    message: "Client updated successfully",
    data: client,
  });
});

const deleteClient = asyncHandler(async (req, res) => {
  await clientService.deleteClient(req.params.id);

  return sendResponse(res, {
    message: "Client deleted successfully",
  });
});

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
