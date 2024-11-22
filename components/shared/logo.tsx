import React from "react";
import { MailSearch } from "lucide-react";

const Logo = () => {
  return (
    <div className="text-2xl font-bold flex items-center gap-2">
      <MailSearch />
      <span>Mail</span>
    </div>
  );
};

export default Logo;
