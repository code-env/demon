import { Button } from "@/components/ui/button";
import { Check, PlusCircle } from "lucide-react";
import CreateMail from "../forms/create-mail";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAllCategoriesStore, useMailStore } from "@/store";
import { Column } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface MailHeaderProps {
  isLoading: boolean;
  column: Column<any, unknown>;
}

const MailHeader = ({ isLoading, column }: MailHeaderProps) => {
  const { categories } = useAllCategoriesStore();
  const { employee } = useMailStore();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <div className="flex items-center justify-between gap-2 h-16 border-b border-border px-4 dark:border-gray-100/10">
      <div className="flex items-center gap-2">
        <p className="text-base font-semibold">Mails</p>
        {employee && (
          <Popover>
            <PopoverTrigger
              asChild
              className="cursor-pointer hover:bg-muted/50 rounded-sm"
            >
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                <PlusCircle />
                <span>Category</span>
                {selectedValues?.size > 0 && (
                  <>
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal lg:hidden"
                    >
                      {selectedValues.size}
                    </Badge>
                    <div className="hidden space-x-1 lg:flex">
                      {selectedValues.size &&
                        categories
                          ?.filter((category) =>
                            selectedValues.has(category.name)
                          )
                          .map((category) => (
                            <Badge
                              variant="secondary"
                              key={category.name}
                              className="rounded-sm px-1 font-normal"
                            >
                              {category.name}
                            </Badge>
                          ))}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent dir="ltr">
              {categories?.map((category) => {
                const isSelected = selectedValues.has(category.name);
                return (
                  <div
                    key={category.name}
                    onClick={() => {
                      if (isSelected) {
                        selectedValues.delete(category.name);
                      } else {
                        selectedValues.add(category.name);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                    className="cursor-pointer flex items-center gap-1"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check />
                    </div>
                    <span className="capitalize">
                      {category.name.split("-").join(" ")}
                    </span>
                  </div>
                );
              })}
            </PopoverContent>
          </Popover>
        )}
      </div>

      <CreateMail />
    </div>
  );
};

export default MailHeader;
