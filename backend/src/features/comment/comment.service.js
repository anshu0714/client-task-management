const Comment = require("./comment.model");
const Task = require("../task/task.model");

const AppError = require("../../utils/appError");
const ERROR_CODES = require("../../constants/errorCodes");

async function createComment(taskId, text, user) {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(
      ERROR_CODES.TASK_NOT_FOUND.message,
      404,
      ERROR_CODES.TASK_NOT_FOUND.code,
    );
  }

  if (
    user.role === "EMPLOYEE" &&
    task.assignedUser.toString() !== user.id.toString()
  ) {
    throw new AppError(
      ERROR_CODES.TASK_ACCESS_DENIED.message,
      403,
      ERROR_CODES.TASK_ACCESS_DENIED.code,
    );
  }

  const comment = await Comment.create({
    task: taskId,
    user: user.id,
    text,
  });

  return comment.populate("user", "name email role");
}

async function getTaskComments(taskId, user) {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(
      ERROR_CODES.TASK_NOT_FOUND.message,
      404,
      ERROR_CODES.TASK_NOT_FOUND.code,
    );
  }

  if (
    user.role === "EMPLOYEE" &&
    task.assignedUser.toString() !== user.id.toString()
  ) {
    throw new AppError(
      ERROR_CODES.TASK_ACCESS_DENIED.message,
      403,
      ERROR_CODES.TASK_ACCESS_DENIED.code,
    );
  }

  return Comment.find({ task: taskId })
    .populate("user", "name email role")
    .sort({ createdAt: -1 });
}

module.exports = {
  createComment,
  getTaskComments,
};
