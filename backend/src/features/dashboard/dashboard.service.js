const Client = require("../client/client.model");
const Project = require("../project/project.model");
const Task = require("../task/task.model");

async function getDashboardStats(user) {
  const isAdmin = user.role === "ADMIN";

  if (isAdmin) {
    const [
      totalClients,
      totalProjects,
      totalTasks,
      pendingTasks,
      completedTasks,
      overdueTasks,
    ] = await Promise.all([
      Client.countDocuments(),
      Project.countDocuments(),
      Task.countDocuments(),

      Task.countDocuments({
        status: "PENDING",
      }),

      Task.countDocuments({
        status: "COMPLETED",
      }),

      Task.countDocuments({
        dueDate: { $lt: new Date() },
        status: { $ne: "COMPLETED" },
      }),
    ]);

    return {
      totalClients,
      totalProjects,
      totalTasks,
      pendingTasks,
      completedTasks,
      overdueTasks,
    };
  }

  const [totalTasks, pendingTasks, completedTasks, overdueTasks] =
    await Promise.all([
      Task.countDocuments({
        assignedUser: user.id,
      }),

      Task.countDocuments({
        assignedUser: user.id,
        status: "PENDING",
      }),

      Task.countDocuments({
        assignedUser: user.id,
        status: "COMPLETED",
      }),

      Task.countDocuments({
        assignedUser: user.id,
        dueDate: { $lt: new Date() },
        status: { $ne: "COMPLETED" },
      }),
    ]);

  return {
    totalTasks,
    pendingTasks,
    completedTasks,
    overdueTasks,
  };
}

module.exports = {
  getDashboardStats,
};
