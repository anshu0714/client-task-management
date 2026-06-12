const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const requestLogger = require("./middlewares/logger.middleware");
const { apiLimiter } = require("./middlewares/rateLimit.middleware");
const errorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./features/auth/auth.routes");
const clientRoutes = require("./features/client/client.routes");
const projectRoutes = require("./features/project/project.routes");
const taskRoutes = require("./features/task/task.routes");
const dashboardRoutes = require("./features/dashboard/dashboard.routes");
const userRoutes = require("./features/user/user.routes")

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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/users", userRoutes);

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
