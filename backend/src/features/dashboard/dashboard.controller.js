const dashboardService = require("./dashboard.service");

const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/response");

const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDashboardStats(req.user);

  return sendResponse(res, {
    message: "Dashboard statistics fetched successfully",
    data: stats,
  });
});

module.exports = {
  getDashboardStats,
};
