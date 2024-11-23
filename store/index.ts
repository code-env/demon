import { create } from "zustand";

interface Store {
  category: string;
  setCategory: (category: string) => void;
}

export const useCategoryStore = create<Store>((set) => ({
  category: "All",
  setCategory: (category: string) => set({ category }),
}));
