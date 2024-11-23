import { Skeleton } from "@/components/ui/skeleton";
import { EmployeeHeader, MailHeader } from "@/components/shared";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MailHeaderSkeleton = () => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-full max-w-[150px] h-8 rounded-full"
        />
      ))}
    </div>
  );
};

export const EmployeeSidebarSkeleton = () => {
  return (
    <div className="flex-1 max-w-sm bg-background border min-h-[calc(100vh-175px)] rounded-lg overflow-hidden flex flex-col gap-2">
      <EmployeeHeader isLoading={true} />
      <ScrollArea className="h-full flex flex-col gap-2 max-h-[calc(100vh-240px)] px-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className="flex items-center gap-2 p-2 rounded-md hover:bg-accent hover:cursor-pointer transition-colors duration-200"
            key={index}
          >
            <Skeleton className="w-10 h-10 min-w-10 rounded-full" />
            <div className="flex-1 flex flex-col gap-1">
              <Skeleton className="w-1/2 h-2 rounded" />
              <Skeleton className="w-full h-3 rounded" />
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
