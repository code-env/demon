import { z } from "zod";

const requiredString = z.string().min(1, "Required.");

export const categorySchema = z.object({
  name: requiredString,
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format.")
    .optional(),
});

export const mailSchema = z.object({
  subject: requiredString,
  body: requiredString,
  from: requiredString.email("Invalid email"),
  to: requiredString.email("Invalid email"),
  categoryId: requiredString,
});

export const employeeSchema = z.object({
  name: requiredString,
  email: requiredString.email("Invalid email"),
});

export const getEmailsSchema = z.object({
  page: z.number(),
  limit: z.number().max(50),
});
