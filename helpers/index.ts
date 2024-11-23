import axios from "axios";
import { Category, Employee } from "@prisma/client";

export const getAllCategories = async () => {
  const res = await axios.get("/api/category");
  return res.data as Category[];
};

export const getAllEmployees = async () => {
  const res = await axios.get("/api/employee");
  return res.data as Employee[];
};
