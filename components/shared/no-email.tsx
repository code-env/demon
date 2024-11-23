import { Mail, User } from "lucide-react";
import React from "react";

const NoEmail = () => {
  return (
    <div className="h-full max-h-[calc(100vh-310px)] flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center justify-center">
        <Mail className="w-10 h-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No email selected</p>
      </div>
    </div>
  );
};

const EmployeeNoEmail = () => {
  return (
    <div className="h-full max-h-[calc(100vh-310px)] flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center justify-center">
        <User className="w-10 h-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No Mail for this employee
        </p>
      </div>
    </div>
  );
};

export { NoEmail, EmployeeNoEmail };
