const authService = require("./auth.service");
const { sendResponse } = require("../../utils/response");
const {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} = require("../../utils/cookie");
const asyncHandler = require("../../utils/asyncHandler");
const { REFRESH_TOKEN_REQUIRED } = require("../../constants/errorCodes");
const AppError = require("../../utils/appError");
const env = require("../../config/env");

const signup = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  return sendResponse(res, {
    status: 201,
    message: "User registered successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const data = await authService.loginUser(req.body);

  setRefreshTokenCookie(res, data.refreshToken);
  delete data.refreshToken;

  return sendResponse(res, {
    message: "Login successful",
    data,
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.[env.auth.cookieName];

  if (!token) {
    throw new AppError(
      REFRESH_TOKEN_REQUIRED.message,
      401,
      REFRESH_TOKEN_REQUIRED.code,
    );
  }

  const data = await authService.refreshAccessToken(token);

  setRefreshTokenCookie(res, data.refreshToken);
  delete data.refreshToken;

  return sendResponse(res, {
    message: "Token refreshed",
    data,
  });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.user.id);

  clearRefreshTokenCookie(res);

  return sendResponse(res, {
    message: "Logged out successfully",
  });
});

const getMe = asyncHandler(async (req, res) => {
  return sendResponse(res, {
    message: "User fetched successfully",
    data: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

module.exports = {
  signup,
  login,
  refreshToken,
  logout,
  getMe,
};
