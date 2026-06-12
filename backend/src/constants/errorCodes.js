const ERROR_CODES = {
  // AUTH ERRORS
  ACCESS_TOKEN_EXPIRED: {
    code: "ACCESS_TOKEN_EXPIRED",
    message: "Access token expired",
  },
  INVALID_TOKEN: {
    code: "INVALID_TOKEN",
    message: "Invalid authentication token",
  },
  NO_TOKEN: {
    code: "NO_TOKEN",
    message: "No authentication token provided",
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "Unauthorized access",
  },

  // REFRESH TOKEN ERRORS
  REFRESH_TOKEN_REQUIRED: {
    code: "REFRESH_TOKEN_REQUIRED",
    message: "Refresh token is required",
  },
  INVALID_REFRESH_TOKEN: {
    code: "INVALID_REFRESH_TOKEN",
    message: "Invalid or expired refresh token",
  },

  // AUTH FLOW
  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    message: "Invalid email or password",
  },

  // USER ERRORS
  USER_NOT_FOUND: {
    code: "USER_NOT_FOUND",
    message: "User not found",
  },
  USER_ALREADY_EXISTS: {
    code: "USER_ALREADY_EXISTS",
    message: "User already exists",
  },

  // FEATURES ERRORS
  CLIENT_NOT_FOUND: {
    code: "CLIENT_NOT_FOUND",
    message: "Client not found",
  },
  CLIENT_ALREADY_EXISTS: {
    code: "CLIENT_ALREADY_EXISTS",
    message: "Client already exists",
  },
  PROJECT_NOT_FOUND: {
    code: "PROJECT_NOT_FOUND",
    message: "Project not found",
  },
  PROJECT_ALREADY_EXISTS: {
    code: "PROJECT_ALREADY_EXISTS",
    message: "Project already exists for this client",
  },
  INVALID_DATE_RANGE: {
    code: "INVALID_DATE_RANGE",
    message: "Due date must be after start date",
  },
  TASK_NOT_FOUND: {
    code: "TASK_NOT_FOUND",
    message: "Task not found",
  },
  ASSIGNED_USER_NOT_FOUND: {
    code: "ASSIGNED_USER_NOT_FOUND",
    message: "Assigned user not found",
  },
  TASK_ALREADY_EXISTS: {
    code: "TASK_ALREADY_EXISTS",
    message: "Task already exists in this project",
  },
  INVALID_TASK_UPDATE: {
    code: "INVALID_TASK_UPDATE",
    message: "Employees can only update task status",
  },
  COMMENT_NOT_FOUND: {
    code: "COMMENT_NOT_FOUND",
    message: "Comment not found",
  },
  TASK_ACCESS_DENIED: {
    code: "TASK_ACCESS_DENIED",
    message: "You are not allowed to access this task",
  },

  // AUTHORIZATION ERRORS
  INSUFFICIENT_ROLE: {
    code: "INSUFFICIENT_ROLE",
    message: "You do not have the required role to perform this action",
  },

  // VALIDATION
  VALIDATION_ERROR: {
    code: "VALIDATION_ERROR",
    message: "Validation failed",
  },

  // RATE LIMIT
  TOO_MANY_REQUESTS: {
    code: "TOO_MANY_REQUESTS",
    message: "Too many requests, please try again later",
  },

  // GENERAL
  INTERNAL_ERROR: {
    code: "INTERNAL_ERROR",
    message: "Something went wrong",
  },
};

module.exports = ERROR_CODES;
