"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  CircleAlert,
  MessageSquare,
  Plus,
  Sparkles,
  Star,
  ThumbsUp,
  Zap,
} from "lucide-react";

import { MailHeader, NoEmail } from "@/components/shared";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getEmployeeMails } from "@/helpers";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCategoryStore, useMailDetailStore, useMailStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MailResponse } from "@/types";

const MailContent = () => {
  const { employee } = useMailStore();
  const { category } = useCategoryStore();
  const searchParams = useSearchParams();
  const { setMail } = useMailDetailStore();
  const [isOpen, setIsOpen] = useState(false);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const { data: mails, isLoading } = useQuery({
    queryKey: ["mails", employee?.id],
    queryFn: () => getEmployeeMails(employee?.id ?? "", page, limit),
    enabled: !!employee,
  });

  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  });

  const filteredMails =
    category === "All"
      ? mails
      : mails?.filter((mail) => mail.status === category);

  const columns: ColumnDef<MailResponse>[] = useMemo(
    () => [
      {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => <span>{row.getValue("subject")}</span>,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Date
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return new Date(row.getValue("createdAt")).toLocaleString();
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const color = row.original.color;

          return (
            <span
              className={cn("px-2 py-1 rounded-full text-xs font-semibold")}
              style={{
                backgroundColor: `#${color}`,
              }}
            >
              {row.getValue("status")}
            </span>
          );
        },
      },
    ],

    [mails]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: filteredMails || [],
    columns: columns as ColumnDef<MailResponse>[] | [],
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((filteredMails?.length || 0) / pagination.pageSize),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div className="flex-1 bg-background border rounded-lg overflow-hidden flex flex-col">
      <MailHeader
        isLoading={isLoading}
        column={table.getColumn("status") as Column<any, unknown>}
      />

      <div className="flex-1 p-2">
        {employee ? (
          <Table className="rounded-lg">
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                [...Array(10)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                      setMail(row.original);
                      setIsOpen(true);
                    }}
                    className="cursor-pointer h-12"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <NoEmail />
        )}
      </div>
      <div className="h-16 border-t border-border px-4 dark:border-gray-100/10">
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
      <MailDetail setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

interface MailDetailProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const MailDetail = ({ setIsOpen, isOpen }: MailDetailProps) => {
  const { mail } = useMailDetailStore();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle>Email Thread Analysis</DialogTitle>
        </DialogHeader>
        <div className="border  border-border dark:border-gray-100/10 rounded-lg overflow-hidden">
          <div className="p-4 bg-muted h-12 flex items-center">
            <h1 className="text-xl font-semibold">Email Thread Analysis</h1>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 border-b dark:border-gray-100/10 pb-4">
              <Subject subject={mail?.subject ?? ""} />
              <Feedback feedback={mail?.subject ?? ""} />
              <Importance
                importance={mail?.status ?? ""}
                color={mail?.color ?? ""}
              />
              <Recommendation recommendation={mail?.subject ?? ""} />
              <Rating rating={5} />
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Email Thread</h1>
                <Button size="icon" variant="outline">
                  <Plus className="size-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                {mail?.thread?.length && mail?.thread?.length > 0
                  ? mail?.thread.map((thread) => (
                      <div key={thread.id} className="flex flex-col gap-2">
                        <p className="text-sm text-muted-foreground">
                          {thread.content}
                        </p>
                      </div>
                    ))
                  : Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="border border-border dark:border-gray-100/10 rounded-lg p-4"
                      >
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quod tempora libero vero perspiciatis. Nostrum
                          delectus eum cumque perferendis officiis explicabo
                          tempora quasi error provident aliquam porro, corporis
                          distinctio. Accusamus, voluptatem!
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Subject = ({ subject }: { subject: string }) => {
  return (
    <div className="border border-border dark:border-gray-100/10 h-fit rounded-lg p-4  bg-muted/50 flex-col gap-2 flex">
      <h1 className="text-base font-semibold">Subject</h1>
      <p className="text-sm text-muted-foreground">{subject}</p>
    </div>
  );
};

const Feedback = ({ feedback }: { feedback: string }) => {
  return (
    <div className="border border-border dark:border-gray-100/10 h-fit rounded-lg p-4  bg-green-100/50 flex-col gap-2 flex">
      <h1 className="text-base font-semibold flex items-center gap-2">
        <MessageSquare className="size-4 text-green-500" /> Feedback
      </h1>
      <p className="text-sm text-primary">{feedback}</p>
    </div>
  );
};

const Importance = ({
  importance,
  color,
}: {
  importance: string;
  color: string;
}) => {
  return (
    <div className="border border-border dark:border-gray-100/10 h-fit rounded-lg p-4  bg-rose-100/50 flex-col gap-2 flex">
      <h1 className="text-base font-semibold flex items-center gap-2">
        <CircleAlert className="size-4 text-rose-500" /> Importance
      </h1>
      <p
        className="text-sm text-primary w-fit px-2 py-1 rounded-full font-semibold"
        style={{ background: `#${color}` }}
      >
        {importance}
      </p>
    </div>
  );
};

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="border border-border dark:border-gray-100/10 h-fit rounded-lg p-4  bg-blue-100/50 flex-col gap-2 flex">
      <h1 className="text-base font-semibold flex items-center gap-2">
        <ThumbsUp className="size-4 text-blue-500" />
        Conversation Rating
      </h1>
      <p className="text-sm text-primary">{rating}</p>
    </div>
  );
};

const Recommendation = ({ recommendation }: { recommendation: string }) => {
  const recomendations = [
    "This is a recommendation",
    "This is a recommendation",
    "This is a recommendation",
  ];
  return (
    <div className="border border-border dark:border-gray-100/10 h-fit rounded-lg p-4  bg-purple-100/50 flex-col gap-2 flex">
      <h1 className="text-base font-semibold flex items-center gap-2">
        <Zap className="size-4 text-purple-500" /> Recommendation
      </h1>
      <ul className="list-disc list-inside pl-4">
        {recomendations.map((recomendation, index) => (
          <li key={index} className="text-sm text-primary">
            {recomendation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MailContent;
