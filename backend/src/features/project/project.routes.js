const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("./project.controller");

const { protect } = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  createProjectSchema,
  updateProjectSchema,
} = require("./project.validator");

const ROLES = require("../../constants/roles");

const router = express.Router();

router.use(protect);

router.post(
  "/",
  authorize(ROLES.ADMIN),
  validate(createProjectSchema),
  createProject,
);

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.patch(
  "/:id",
  authorize(ROLES.ADMIN),
  validate(updateProjectSchema),
  updateProject,
);

router.delete("/:id", authorize(ROLES.ADMIN), deleteProject);

module.exports = router;
