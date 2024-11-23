"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { mailSchema } from "@/schema";
import { useAllCategoriesStore, useMailStore } from "@/store";
import { MailSchema } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateButton from "../shared/create-btn";

const CreateMail = () => {
  const [showModal, setShowModal] = useState(false);
  const { categories } = useAllCategoriesStore();
  const queryClient = useQueryClient();
  const { employee } = useMailStore();

  const form = useForm<MailSchema>({
    resolver: zodResolver(mailSchema),
    defaultValues: {
      subject: "",
      body: "",
      to: employee?.email || "username@example.com",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: MailSchema) =>
      axios.post(`/api/employee/${employee?.id}/mail`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mails"] });
      setShowModal(false);
    },
  });

  const onSubmit = (data: MailSchema) => {
    mutate(data);
  };

  return (
    <div>
      <div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowModal(true)}
          disabled={isPending || !employee}
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
                Add Mail
              </h2>
              <p className="text-sm/6 text-muted-foreground">
                Create a new mail to send to {employee?.name}.
              </p>
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Subject"
                      className="placeholder:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Body"
                      className="placeholder:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="from"
                      className="placeholder:!text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="to"
                      value={employee?.email || "username@example.com"}
                      className="placeholder:!text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

export default CreateMail;
