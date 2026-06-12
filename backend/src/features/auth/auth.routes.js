const express = require("express");
const {
  signup,
  login,
  refreshToken,
  logout,
  getMe,
} = require("./auth.controller");
const { protect } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { signupSchema, loginSchema } = require("./auth.validator");
const { authLimiter } = require("../../middlewares/rateLimit.middleware")

const router = express.Router();

router.post("/signup", authLimiter, validate(signupSchema), signup);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/refresh-token", authLimiter, refreshToken);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

module.exports = router;
