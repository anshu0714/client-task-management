const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const requestLogger = require("./middlewares/logger.middleware");

const { apiLimiter } = require("./middlewares/rateLimit.middleware");
const errorHandler = require("./middlewares/error.middleware");
const env = require("./config/env");

const app = express();

// CORS
const allowedOrigins = [env.clientURL, "http://localhost:5000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  }),
);

// Core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running 🚀",
  });
});

// Rate Limit
app.use("/api/v1", apiLimiter);

// App routes

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;
