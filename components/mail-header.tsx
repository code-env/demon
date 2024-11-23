"use client";

import { getAllCategories } from "@/helpers";
import { useCategoryStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { MailHeaderSkeleton } from "./shared/loaders";
import { buttonVariants } from "./ui/button";
import CreateCategory from "./forms/create-category";

const MailHeader = () => {
  const { category: initialCategory, setCategory } = useCategoryStore();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  if (!categories) return <MailHeaderSkeleton />;

  if (isLoading) return <MailHeaderSkeleton />;

  const defaultCategory = {
    id: "all",
    name: "All",
  };

  const allCategories = [defaultCategory, ...categories];

  return (
    <div className="flex flex-col md:flex-row justify-between gap-2 items-center flex-wrap">
      <div className="flex gap-2 items-center flex-wrap">
        {allCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => setCategory(category.name)}
            className={buttonVariants({
              variant:
                category.name === initialCategory ? "default" : "secondary",
              className: "cursor-pointer !rounded-full capitalize",
              size: "sm",
            })}
          >
            {category.name.split("-").join(" ")}
          </div>
        ))}
      </div>
      <CreateCategory />
    </div>
  );
};

export default MailHeader;
