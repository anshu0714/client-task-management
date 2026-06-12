const { z } = require("zod");

const createProjectSchema = z.object({
  body: z.object({
    client: z.string(),
    name: z.string().min(2),
    description: z.string().optional(),
    startDate: z.string(),
    dueDate: z.string(),
  }),
});

const updateProjectSchema = z.object({
  body: z.object({
    client: z.string().optional(),
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    dueDate: z.string().optional(),
    status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]).optional(),
  }),
});

module.exports = {
  createProjectSchema,
  updateProjectSchema,
};
