const Client = require("./client.model");
const AppError = require("../../utils/appError");
const ERROR_CODES = require("../../constants/errorCodes");

async function createClient(payload) {
  try {
    const existingClient = await Client.findOne({
      email: payload.email,
    });

    if (existingClient) {
      throw new AppError(
        ERROR_CODES.CLIENT_ALREADY_EXISTS.message,
        400,
        ERROR_CODES.CLIENT_ALREADY_EXISTS.code,
      );
    }

    const client = await Client.create(payload);

    return client;
  } catch (err) {
    if (err instanceof AppError) throw err;

    if (err.code === 11000) {
      throw new AppError(
        ERROR_CODES.CLIENT_ALREADY_EXISTS.message,
        400,
        ERROR_CODES.CLIENT_ALREADY_EXISTS.code,
      );
    }

    throw new AppError(
      ERROR_CODES.INTERNAL_ERROR.message,
      500,
      ERROR_CODES.INTERNAL_ERROR.code,
    );
  }
}

async function getClients({ page = 1, limit = 10 }) {
  const skip = (page - 1) * limit;

  const [clients, total] = await Promise.all([
    Client.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Client.countDocuments(),
  ]);

  return {
    clients,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function getClientById(clientId) {
  const client = await Client.findById(clientId);

  if (!client) {
    throw new AppError(
      ERROR_CODES.CLIENT_NOT_FOUND.message,
      404,
      ERROR_CODES.CLIENT_NOT_FOUND.code,
    );
  }

  return client;
}

async function updateClient(clientId, payload) {
  const existingClient = await Client.findById(clientId);

  if (!existingClient) {
    throw new AppError(
      ERROR_CODES.CLIENT_NOT_FOUND.message,
      404,
      ERROR_CODES.CLIENT_NOT_FOUND.code,
    );
  }

  if (payload.email) {
    const duplicateClient = await Client.findOne({
      email: payload.email,
      _id: { $ne: clientId },
    });

    if (duplicateClient) {
      throw new AppError(
        ERROR_CODES.CLIENT_ALREADY_EXISTS.message,
        409,
        ERROR_CODES.CLIENT_ALREADY_EXISTS.code,
      );
    }
  }

  const client = await Client.findByIdAndUpdate(clientId, payload, {
    new: true,
    runValidators: true,
  });

  return client;
}

async function deleteClient(clientId) {
  const client = await Client.findByIdAndDelete(clientId);

  if (!client) {
    throw new AppError(
      ERROR_CODES.CLIENT_NOT_FOUND.message,
      404,
      ERROR_CODES.CLIENT_NOT_FOUND.code,
    );
  }

  return true;
}

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
