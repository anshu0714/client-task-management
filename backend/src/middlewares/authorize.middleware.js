const AppError = require("../utils/appError");
const ERROR_CODES = require("../constants/errorCodes");

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          ERROR_CODES.INSUFFICIENT_ROLE.message,
          403,
          ERROR_CODES.INSUFFICIENT_ROLE.code,
        ),
      );
    }

    next();
  };
}

module.exports = authorize;