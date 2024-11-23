"use client";

import CreateEmployee from "@/components/forms/create-employee";
interface EmployeeHeaderProps {
  isLoading: boolean;
}

const EmployeeHeader = ({ isLoading }: EmployeeHeaderProps) => {
  return (
    <div className="flex items-center justify-center md:justify-between gap-2 h-16 border-b border-border px-4 dark:border-gray-100/10">
      <p className="text-base font-semibold hidden md:block">Employees</p>
      <CreateEmployee />
    </div>
  );
};

export default EmployeeHeader;
