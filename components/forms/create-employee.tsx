"use client";

import { EmployeeSchema } from "@/types";
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
import { employeeSchema } from "@/schema";
import CreateButton from "@/components/shared/create-btn";
import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const CreateEmployee = () => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<EmployeeSchema>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: EmployeeSchema) => {
    createEmployee(data);
  };

  const { mutate: createEmployee, isPending } = useMutation({
    mutationFn: (data: EmployeeSchema) => {
      return axios.post("/api/employee", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setShowModal(false);
      form.reset();
    },
  });

  return (
    <div>
      <div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowModal(true)}
          disabled={isPending}
        >
          <PlusIcon className="size-4" />
        </Button>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-lg/7 font-medium tracking-tight text-primary">
                New Employee
              </h2>
              <p className="text-sm/6 text-muted-foreground">
                Create a new employee to send emails to.
              </p>
            </div>

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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default CreateEmployee;
