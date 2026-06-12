const taskService = require("./task.service");

const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/response");

const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body);

  return sendResponse(res, {
    status: 201,
    message: "Task created successfully",
    data: task,
  });
});

const getTasks = asyncHandler(async (req, res) => {
  const result = await taskService.getTasks(req.query, req.user);

  return sendResponse(res, {
    message: "Tasks fetched successfully",
    data: result,
  });
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id, req.user);

  return sendResponse(res, {
    message: "Task fetched successfully",
    data: task,
  });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body, req.user);

  return sendResponse(res, {
    message: "Task updated successfully",
    data: task,
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id);

  return sendResponse(res, {
    message: "Task deleted successfully",
  });
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
