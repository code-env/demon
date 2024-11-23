"use client";

import { Employee } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllEmployees } from "@/helpers";
import EmployeeHeader from "./shared/employee-header";
import { EmployeeSidebarSkeleton } from "./shared/loaders";
import { useMailStore } from "@/store";
import { cn } from "@/lib/utils";

const MailSidebar = () => {
  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  if (isLoading) return <EmployeeSidebarSkeleton />;

  if (!employees) return null;

  return (
    <div className="flex-1 max-w-20 md:max-w-sm bg-background border min-h-[calc(100vh-175px)] rounded-lg overflow-hidden flex flex-col gap-2">
      <EmployeeHeader isLoading={isLoading} />
      <ScrollArea className="h-full flex flex-col gap-2 max-h-[calc(100vh-240px)] px-2">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </ScrollArea>
    </div>
  );
};

const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const { setEmployee, employee: selectedEmployee } = useMailStore();
  const usernameAvatar = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2 rounded-md hover:bg-accent/50 hover:cursor-pointer transition-colors duration-200 w-full justify-center md:justify-start",
        employee.id === selectedEmployee?.id && "bg-accent/50"
      )}
      onClick={() => setEmployee(employee)}
    >
      <Avatar>
        <AvatarFallback>{usernameAvatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex-col gap-1 hidden md:flex">
        <p className="text-sm font-medium">{employee.name}</p>
        <p className="text-xs text-muted-foreground">{employee.email}</p>
      </div>
    </div>
  );
};

export default MailSidebar;
