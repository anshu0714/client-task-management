const { z } = require("zod");

const createClientSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    companyName: z.string().min(2),
    address: z.string().min(2),
  }),
});

const updateClientSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).optional(),
    companyName: z.string().min(2).optional(),
    address: z.string().min(2).optional(),
  }),
});

module.exports = { createClientSchema, updateClientSchema };
