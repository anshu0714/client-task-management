require("dotenv").config();

const requiredEnv = ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "MONGO_URI"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

const env = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  clientURL: process.env.CLIENT_URL || "http://localhost:3000",

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiry: "15m",
    refreshExpiry: "7d",
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000,
    authMax: 10,
    apiMax: 100,
  },

  auth: {
    cookieName: "refreshToken",
  },

  logging: {
    level: process.env.LOG_LEVEL || "info",
    enableRequestLogs: process.env.ENABLE_REQUEST_LOGS !== "false",
    enableResponseLogs: process.env.ENABLE_RESPONSE_LOGS !== "false",
    enableErrorLogs: process.env.ENABLE_ERROR_LOGS !== "false",
  },

  defaultRole: process.env.DEFAULT_ROLE || "EMPLOYEE",
};

module.exports = env;
