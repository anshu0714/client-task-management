const jwt = require("jsonwebtoken");
const User = require("../features/user/user.model");
const AppError = require("../utils/appError");
const env = require("../config/env");
const ERROR_CODES = require("../constants/errorCodes");

async function protect(req, res, next) {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError(
          ERROR_CODES.NO_TOKEN.message,
          401,
          ERROR_CODES.NO_TOKEN.code,
        ),
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(token, env.jwt.accessSecret);
    } catch (err) {
      const errorCode =
        err.name === "TokenExpiredError"
          ? ERROR_CODES.ACCESS_TOKEN_EXPIRED
          : ERROR_CODES.INVALID_TOKEN;

      return next(new AppError(errorCode.message, 401, errorCode.code));
    }

    const user = await User.findById(decoded.id).select("-password").lean();

    if (!user) {
      return next(
        new AppError(
          ERROR_CODES.USER_NOT_FOUND.message,
          401,
          ERROR_CODES.USER_NOT_FOUND.code,
        ),
      );
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { protect };
