const AppError = require("../utils/appError");
const { VALIDATION_ERROR } = require("../constants/errorCodes");

function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
      });
      next();
    } catch (error) {
      const message = error.issues?.[0]?.message || VALIDATION_ERROR.message;
      return next(new AppError(message, 400, VALIDATION_ERROR.code));
    }
  };
}

module.exports = validate;
