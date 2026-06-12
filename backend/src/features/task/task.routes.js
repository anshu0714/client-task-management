const express = require("express");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("./task.controller");

const { protect } = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");
const validate = require("../../middlewares/validate.middleware");

const { createTaskSchema, updateTaskSchema } = require("./task.validator");

const commentRoutes = require("../comment/comment.routes");

const ROLES = require("../../constants/roles");

const router = express.Router();

router.use(protect);

router.post(
  "/",
  authorize(ROLES.ADMIN),
  validate(createTaskSchema),
  createTask,
);

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.patch("/:id", validate(updateTaskSchema), updateTask);

router.delete("/:id", authorize(ROLES.ADMIN), deleteTask);

router.use("/:taskId/comments", commentRoutes);

module.exports = router;
