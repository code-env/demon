import { MailResponse } from "@/types";
import { Category, Employee } from "@prisma/client";
import { create } from "zustand";

interface Store {
  category: string;
  setCategory: (category: string) => void;
}

export const useCategoryStore = create<Store>((set) => ({
  category: "All",
  setCategory: (category: string) => set({ category }),
}));

interface MailStore {
  employee: Employee | null;
  setEmployee: (employee: Employee | null) => void;
}

export const useMailStore = create<MailStore>((set) => ({
  employee: null,
  setEmployee: (employee: Employee | null) => set({ employee }),
}));

interface MailDetailStore {
  mail: MailResponse | null;
  setMail: (mail: MailResponse | null) => void;
}

export const useMailDetailStore = create<MailDetailStore>((set) => ({
  mail: null,
  setMail: (mail: MailResponse | null) => set({ mail }),
}));

interface CategoryStore {
  categories: Category[] | null;
  setCategories: (categories: Category[] | null) => void;
}

export const useAllCategoriesStore = create<CategoryStore>((set) => ({
  categories: null,
  setCategories: (categories: Category[] | null) => set({ categories }),
}));
