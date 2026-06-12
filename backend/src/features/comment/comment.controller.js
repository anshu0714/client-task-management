const commentService = require("./comment.service");

const asyncHandler = require("../../utils/asyncHandler");
const { sendResponse } = require("../../utils/response");

const createComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment(
    req.params.taskId,
    req.body.text,
    req.user,
  );

  return sendResponse(res, {
    status: 201,
    message: "Comment added successfully",
    data: comment,
  });
});

const getTaskComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getTaskComments(
    req.params.taskId,
    req.user,
  );

  return sendResponse(res, {
    message: "Comments fetched successfully",
    data: comments,
  });
});

module.exports = {
  createComment,
  getTaskComments,
};