const User = require("../user/user.model");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const AppError = require("../../utils/appError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/generateTokens");
const ERROR_CODES = require("../../constants/errorCodes");
const ROLES = require("../../constants/roles");

async function registerUser({ name, email, password }) {
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError(
        ERROR_CODES.USER_ALREADY_EXISTS.message,
        400,
        ERROR_CODES.USER_ALREADY_EXISTS.code,
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      role: ROLES.EMPLOYEE,
    });

    return user;
  } catch (err) {
    if (err instanceof AppError) throw err;

    if (err.code === 11000) {
      throw new AppError(
        ERROR_CODES.USER_ALREADY_EXISTS.message,
        400,
        ERROR_CODES.USER_ALREADY_EXISTS.code,
      );
    }

    throw new AppError(
      ERROR_CODES.INTERNAL_ERROR.message,
      500,
      ERROR_CODES.INTERNAL_ERROR.code,
    );
  }
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(
      ERROR_CODES.INVALID_CREDENTIALS.message,
      401,
      ERROR_CODES.INVALID_CREDENTIALS.code,
    );
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new AppError(
      ERROR_CODES.INVALID_CREDENTIALS.message,
      401,
      ERROR_CODES.INVALID_CREDENTIALS.code,
    );
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
}

async function refreshAccessToken(refreshToken) {
  let decoded;

  try {
    decoded = jwt.verify(refreshToken, env.jwt.refreshSecret);
  } catch {
    throw new AppError(
      ERROR_CODES.INVALID_REFRESH_TOKEN.message,
      401,
      ERROR_CODES.INVALID_REFRESH_TOKEN.code,
    );
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError(
      ERROR_CODES.USER_NOT_FOUND.message,
      404,
      ERROR_CODES.USER_NOT_FOUND.code,
    );
  }

  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
}

async function logoutUser() {
  return true;
}

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
