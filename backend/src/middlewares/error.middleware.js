const logger = require("../utils/logger");
const env = require("../config/env");

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  if (env.logging.enableErrorLogs) {
    logger.error("ERROR", {
      message: err.message,
      statusCode,
      path: req.originalUrl,
      method: req.method,
      user: req.user?.id || "guest",
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
  }

  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? "Something went wrong"
      : err.message;

  res.status(statusCode).json({
    success: false,
    message,
    code: err.code || "INTERNAL_ERROR",
    data: null,
  });
}

module.exports = errorHandler;
