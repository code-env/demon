import { employeeSchema, mailSchema, categorySchema } from "@/schema";
import { z } from "zod";

export type MailResponse = {
  from: string;
  to: string;
  body: string;
  subject: string;
  status: string;
  color: string;
  createdAt: Date;
  thread: {
    content: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
  }[];
};

export type EmployeeSchema = z.infer<typeof employeeSchema>;
export type MailSchema = z.infer<typeof mailSchema>;
export type CategorySchema = z.infer<typeof categorySchema>;
