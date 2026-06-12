const User = require("./user.model");
const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/response");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("_id name email role")
    .sort({ name: 1 });

  return sendResponse(res, {
    message: "Users fetched successfully",
    data: users,
  });
});

module.exports = {
  getUsers,
};
