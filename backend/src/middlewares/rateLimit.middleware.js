const rateLimit = require("express-rate-limit");
const env = require("../config/env");
const { TOO_MANY_REQUESTS } = require("../constants/errorCodes");

// Authentication routes limiter
const authLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.authMax,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: TOO_MANY_REQUESTS.message,
      code: TOO_MANY_REQUESTS.code,
      retryAfter: Math.ceil(env.rateLimit.windowMs / 1000),
      data: null,
    });
  },
});

// API routes limiter
const apiLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.apiMax,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: TOO_MANY_REQUESTS.message,
      code: TOO_MANY_REQUESTS.code,
      retryAfter: Math.ceil(env.rateLimit.windowMs / 1000),
      data: null,
    });
  },
});

module.exports = {
  authLimiter,
  apiLimiter,
};
