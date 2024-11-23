import { z } from "zod";

const requiredString = z.string().min(1, "Required");

export const categorySchema = z.object({
  name: requiredString,
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
