const express = require("express");

const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("./client.controller");

const { protect } = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  createClientSchema,
  updateClientSchema,
} = require("./client.validator");

const ROLES = require("../../constants/roles");

const router = express.Router();

router.use(protect);

router.post(
  "/",
  authorize(ROLES.ADMIN),
  validate(createClientSchema),
  createClient,
);

router.get("/", getClients);

router.get("/:id", getClientById);

router.patch(
  "/:id",
  authorize(ROLES.ADMIN),
  validate(updateClientSchema),
  updateClient,
);

router.delete(
  "/:id",
  authorize(ROLES.ADMIN),
  deleteClient,
);

module.exports = router;