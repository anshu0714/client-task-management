const { z } = require("zod");

const createCommentSchema = z.object({
  body: z.object({
    text: z.string().trim().min(1, "Comment is required"),
  }),
});

module.exports = {
  createCommentSchema,
};
