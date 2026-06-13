const Task = require("./task.model");
const Project = require("../project/project.model");
const User = require("../user/user.model");
const AppError = require("../../utils/appError");
const ERROR_CODES = require("../../constants/errorCodes");
const ROLES = require("../../constants/roles");

async function createTask(payload) {
  payload.title = payload.title.trim();

  const project = await Project.findById(payload.project);
  if (!project) {
    throw new AppError(
      ERROR_CODES.PROJECT_NOT_FOUND.message,
      404,
      ERROR_CODES.PROJECT_NOT_FOUND.code,
    );
  }

  const assignedUser = await User.findById(payload.assignedUser);
  if (!assignedUser) {
    throw new AppError(
      ERROR_CODES.ASSIGNED_USER_NOT_FOUND.message,
      404,
      ERROR_CODES.ASSIGNED_USER_NOT_FOUND.code,
    );
  }

  const existingTask = await Task.findOne({
    project: payload.project,
    title: payload.title,
  });

  if (existingTask) {
    throw new AppError(
      ERROR_CODES.TASK_ALREADY_EXISTS.message,
      409,
      ERROR_CODES.TASK_ALREADY_EXISTS.code,
    );
  }

  return Task.create(payload);
}

async function getTasks(filters, user) {
  const {
    page = 1,
    limit = 10,
    status,
    priority,
    assignedUser,
    dueDate,
    search,
    client,
    project,
  } = filters;

  const query = {};

  if (user.role === ROLES.EMPLOYEE) {
    query.assignedUser = user.id;
  }

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (project) query.project = project;

  if (assignedUser && user.role === ROLES.ADMIN) {
    query.assignedUser = assignedUser;
  }

  if (dueDate) {
    const selectedDate = new Date(dueDate);
    const nextDate = new Date(dueDate);
    nextDate.setDate(nextDate.getDate() + 1);
    query.dueDate = { $gte: selectedDate, $lt: nextDate };
  }

  let projectIdsFromSearch = [];

  if (client) {
    const projects = await Project.find({ client }).select("_id");
    projectIdsFromSearch = projects.map((p) => p._id);
    query.project = { $in: projectIdsFromSearch };
  }

  if (search) {
    const matchingProjects = await Project.find()
      .populate("client", "name companyName")
      .lean();

    const matchedProjectIds = matchingProjects
      .filter((p) => {
        const text =
          `${p.name || ""} ${p.client?.name || ""} ${p.client?.companyName || ""}`.toLowerCase();
        return text.includes(search.toLowerCase());
      })
      .map((p) => p._id);

    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { project: { $in: matchedProjectIds } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [tasks, total] = await Promise.all([
    Task.find(query)
      .populate({
        path: "project",
        populate: { path: "client" },
      })
      .populate("assignedUser", "-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Task.countDocuments(query),
  ]);

  return {
    tasks,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
}

async function getTaskById(taskId, user) {
  const task = await Task.findById(taskId)
    .populate({
      path: "project",
      populate: {
        path: "client",
      },
    })
    .populate("assignedUser", "-password");

  if (!task) {
    throw new AppError(
      ERROR_CODES.TASK_NOT_FOUND.message,
      404,
      ERROR_CODES.TASK_NOT_FOUND.code,
    );
  }

  if (
    user.role === "EMPLOYEE" &&
    task.assignedUser._id.toString() !== user.id.toString()
  ) {
    throw new AppError(
      ERROR_CODES.UNAUTHORIZED.message,
      403,
      ERROR_CODES.UNAUTHORIZED.code,
    );
  }

  return task;
}

async function updateTask(taskId, payload, user) {
  const existingTask = await Task.findById(taskId);

  if (!existingTask) {
    throw new AppError(
      ERROR_CODES.TASK_NOT_FOUND.message,
      404,
      ERROR_CODES.TASK_NOT_FOUND.code,
    );
  }

  if (user.role === "EMPLOYEE") {
    if (existingTask.assignedUser.toString() !== user.id.toString()) {
      throw new AppError(
        ERROR_CODES.UNAUTHORIZED.message,
        403,
        ERROR_CODES.UNAUTHORIZED.code,
      );
    }

    const allowedFields = ["status"];

    const invalidField = Object.keys(payload).find(
      (field) => !allowedFields.includes(field),
    );

    if (invalidField) {
      throw new AppError(
        ERROR_CODES.INVALID_TASK_UPDATE.message,
        403,
        ERROR_CODES.INVALID_TASK_UPDATE.code,
      );
    }
  }

  if (payload.assignedUser) {
    const assignedUser = await User.findById(payload.assignedUser);

    if (!assignedUser) {
      throw new AppError(
        ERROR_CODES.ASSIGNED_USER_NOT_FOUND.message,
        404,
        ERROR_CODES.ASSIGNED_USER_NOT_FOUND.code,
      );
    }
  }

  if (payload.project) {
    const project = await Project.findById(payload.project);

    if (!project) {
      throw new AppError(
        ERROR_CODES.PROJECT_NOT_FOUND.message,
        404,
        ERROR_CODES.PROJECT_NOT_FOUND.code,
      );
    }
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, payload, {
    new: true,
    runValidators: true,
  })
    .populate({
      path: "project",
      populate: {
        path: "client",
      },
    })
    .populate("assignedUser", "-password");

  return updatedTask;
}

async function deleteTask(taskId) {
  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw new AppError(
      ERROR_CODES.TASK_NOT_FOUND.message,
      404,
      ERROR_CODES.TASK_NOT_FOUND.code,
    );
  }

  return true;
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
