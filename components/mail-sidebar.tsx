"use client";

import { getAllEmployees } from "@/helpers";
import { useQuery } from "@tanstack/react-query";
import { EmployeeSidebarSkeleton } from "./shared/loaders";
import { Employee } from "@prisma/client";

const MailSidebar = () => {
  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  if (isLoading) return <EmployeeSidebarSkeleton />;

  if (!employees) return null;

  return (
    <div className="flex-1 max-w-sm bg-background border min-h-[calc(100vh-175px)]">
      MailSidebar
    </div>
  );
};

const Employee = ({ employee }: { employee: Employee }) => {
  const usernameAvatar = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback>{usernameAvatar}</AvatarFallback>
      </Avatar>
      <div>
        <p>{employee.name}</p>
        <p>{employee.email}</p>
      </div>
    </div>
  );
};

export default MailSidebar;
