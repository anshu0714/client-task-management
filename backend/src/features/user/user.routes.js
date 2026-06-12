const express = require("express");

const { getUsers } = require("./user.controller");

const { protect } = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");

const ROLES = require("../../constants/roles");

const router = express.Router();

router.get(
  "/",
  protect,
  authorize(ROLES.ADMIN),
  getUsers
);

module.exports = router;