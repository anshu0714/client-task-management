const logger = require("../utils/logger");
const env = require("../config/env");

const sanitize = (body) => {
  if (!body) return body;

  const cloned = { ...body };

  if (cloned.password) cloned.password = "****";
  if (cloned.refreshToken) cloned.refreshToken = "****";
  if (cloned.accessToken) cloned.accessToken = "****";

  return cloned;
};

const sanitizeResponse = (data) => {
  if (!data) return data;

  const cloned = JSON.parse(JSON.stringify(data));

  if (cloned.data) {
    if (cloned.data.accessToken) cloned.data.accessToken = "****";
    if (cloned.data.refreshToken) cloned.data.refreshToken = "****";
  }

  return cloned;
};

function requestLogger(req, res, next) {
  const start = Date.now();

  if (env.logging.enableRequestLogs) {
    logger.info("REQUEST", {
      method: req.method,
      url: req.originalUrl,
      body: sanitize(req.body),
      ip: req.ip,
    });
  }

  const originalJson = res.json;

  res.json = function (data) {
    if (env.logging.enableResponseLogs) {
      logger.info("RESPONSE", {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        response: sanitizeResponse(data),
      });
    }

    return originalJson.call(this, data);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("REQUEST_COMPLETED", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      user: req.user?.id || "guest",
      ip: req.ip,
    });
  });

  next();
}

module.exports = requestLogger;
