const jwt = require("jsonwebtoken");
const env = require("../config/env");

function generateAccessToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiry,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user._id }, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiry,
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
