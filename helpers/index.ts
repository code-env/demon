import axios from "axios";
import { Category, Employee } from "@prisma/client";
import { MailResponse } from "@/types";
import { useAllCategoriesStore } from "@/store";

export const getAllCategories = async () => {
  const res = await axios.get("/api/category");
  useAllCategoriesStore.getState().setCategories(res.data as Category[]);
  return res.data as Category[];
};

export const getAllEmployees = async () => {
  const res = await axios.get("/api/employee");
  return res.data as Employee[];
};

export const getEmployeeMails = async (
  employeeId: string,
  page: number,
  limit: number
) => {
  const res = await axios.get(`/api/employee/${employeeId}/mail`, {
    params: { page, limit },
  });
  return res.data as MailResponse[];
};
