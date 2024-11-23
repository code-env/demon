"use client";

import { CategorySchema, EmployeeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categorySchema, employeeSchema } from "@/schema";
import CreateButton from "@/components/shared/create-btn";
import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CreateCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const { mutate: createCategory, isPending } = useMutation({
    mutationFn: async (data: CategorySchema) => {
      const response = await axios.post("/api/category", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsOpen(false);
      form.reset();
    },
  });

  const onSubmit = (data: CategorySchema) => {
    createCategory(data);
  };

  const COLOR_OPTIONS = [
    "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
    "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
    "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
    "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
    "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
    "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
    "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
    "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
    "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
    "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
  ];

  return (
    <div>
      <div>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <PlusIcon />
        </Button>
      </div>
      <Modal showModal={isOpen} setShowModal={setIsOpen}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Color</p>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      `bg-[${color}]`,
                      "size-10 rounded-full ring-2 ring-offset-2 transition-all",
                      form.watch("color") === color
                        ? "ring-brand-700 scale-110"
                        : "ring-transparent hover:scale-105"
                    )}
                    onClick={() => form.setValue("color", color)}
                  />
                ))}
              </div>
            </div>
            <CreateButton
              isLoading={isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              Create
            </CreateButton>
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateCategory;
