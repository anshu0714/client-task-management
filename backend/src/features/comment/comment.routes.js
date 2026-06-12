const express = require("express");

const { protect } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const { createComment, getTaskComments } = require("./comment.controller");

const { createCommentSchema } = require("./comment.validator");

const router = express.Router({ mergeParams: true });

router.post("/", protect, validate(createCommentSchema), createComment);

router.get("/", protect, getTaskComments);

module.exports = router;
