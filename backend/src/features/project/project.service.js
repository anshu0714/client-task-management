const Project = require("./project.model");
const Client = require("../client/client.model");

const AppError = require("../../utils/appError");
const { validateDateRange } = require("../../utils/dateValidation");
const ERROR_CODES = require("../../constants/errorCodes");

async function createProject(payload) {
  payload.name = payload.name.trim();

  if (!validateDateRange(payload.startDate, payload.dueDate)) {
    throw new AppError(
      ERROR_CODES.INVALID_DATE_RANGE.message,
      400,
      ERROR_CODES.INVALID_DATE_RANGE.code,
    );
  }

  const client = await Client.findById(payload.client);

  if (!client) {
    throw new AppError(
      ERROR_CODES.CLIENT_NOT_FOUND.message,
      404,
      ERROR_CODES.CLIENT_NOT_FOUND.code,
    );
  }

  const existingProject = await Project.findOne({
    client: payload.client,
    name: payload.name,
  });

  if (existingProject) {
    throw new AppError(
      ERROR_CODES.PROJECT_ALREADY_EXISTS.message,
      409,
      ERROR_CODES.PROJECT_ALREADY_EXISTS.code,
    );
  }

  const project = await Project.create(payload);

  return project;
}

async function getProjects({ page = 1, limit = 10 }) {
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find()
      .populate("client")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Project.countDocuments(),
  ]);

  return {
    projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function getProjectById(projectId) {
  const project = await Project.findById(projectId).populate("client");

  if (!project) {
    throw new AppError(
      ERROR_CODES.PROJECT_NOT_FOUND.message,
      404,
      ERROR_CODES.PROJECT_NOT_FOUND.code,
    );
  }

  return project;
}

async function updateProject(projectId, payload) {
  const existingProject = await Project.findById(projectId);

  if (!existingProject) {
    throw new AppError(
      ERROR_CODES.PROJECT_NOT_FOUND.message,
      404,
      ERROR_CODES.PROJECT_NOT_FOUND.code,
    );
  }

  const startDate = payload.startDate || existingProject.startDate;
  const dueDate = payload.dueDate || existingProject.dueDate;

  if (!validateDateRange(startDate, dueDate)) {
    throw new AppError(
      ERROR_CODES.INVALID_DATE_RANGE.message,
      400,
      ERROR_CODES.INVALID_DATE_RANGE.code,
    );
  }
  
  const clientId = payload.client || existingProject.client;

  if (payload.client) {
    const client = await Client.findById(payload.client);

    if (!client) {
      throw new AppError(
        ERROR_CODES.CLIENT_NOT_FOUND.message,
        404,
        ERROR_CODES.CLIENT_NOT_FOUND.code,
      );
    }
  }

  const projectName = payload.name ? payload.name.trim() : existingProject.name;

  const duplicateProject = await Project.findOne({
    client: clientId,
    name: projectName,
    _id: { $ne: projectId },
  });

  if (duplicateProject) {
    throw new AppError(
      ERROR_CODES.PROJECT_ALREADY_EXISTS.message,
      409,
      ERROR_CODES.PROJECT_ALREADY_EXISTS.code,
    );
  }

  if (payload.name) {
    payload.name = payload.name.trim();
  }

  const project = await Project.findByIdAndUpdate(projectId, payload, {
    new: true,
    runValidators: true,
  }).populate("client");

  return project;
}

async function deleteProject(projectId) {
  const project = await Project.findByIdAndDelete(projectId);

  if (!project) {
    throw new AppError(
      ERROR_CODES.PROJECT_NOT_FOUND.message,
      404,
      ERROR_CODES.PROJECT_NOT_FOUND.code,
    );
  }

  return true;
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
