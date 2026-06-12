const { z } = require("zod");

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2),
    description: z.string().optional(),
    project: z.string(),
    assignedUser: z.string(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    dueDate: z.string(),
  }),
});

const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2).optional(),
    description: z.string().optional(),
    assignedUser: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
    dueDate: z.string().optional(),
  }),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
