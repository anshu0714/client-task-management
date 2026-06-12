const env = require("../config/env");

function setRefreshTokenCookie(res, token) {
  res.cookie(env.auth.cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function clearRefreshTokenCookie(res) {
  res.clearCookie(env.auth.cookieName);
}

module.exports = {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
};
