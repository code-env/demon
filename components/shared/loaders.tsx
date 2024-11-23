import { Skeleton } from "@/components/ui/skeleton";

export { Skeleton } from "@/components/ui/skeleton";

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
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex items-center gap-2" key={index}>
          <Skeleton className="w-10 h-10 min-w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="w-1/2 h-2 rounded-full" />
            <Skeleton className="w-full h- rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
