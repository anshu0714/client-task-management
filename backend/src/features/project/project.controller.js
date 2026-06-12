const projectService = require("./project.service");

const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/response");

const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body);

  return sendResponse(res, {
    status: 201,
    message: "Project created successfully",
    data: project,
  });
});

const getProjects = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await projectService.getProjects({
    page,
    limit,
  });

  return sendResponse(res, {
    message: "Projects fetched successfully",
    data: result,
  });
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);

  return sendResponse(res, {
    message: "Project fetched successfully",
    data: project,
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);

  return sendResponse(res, {
    message: "Project updated successfully",
    data: project,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  await projectService.deleteProject(req.params.id);

  return sendResponse(res, {
    message: "Project deleted successfully",
  });
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
