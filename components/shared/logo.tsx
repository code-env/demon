import React from "react";
import { MailSearch } from "lucide-react";

const Logo = () => {
  return (
    <div className="text-xl font-bold flex items-center gap-2">
      <MailSearch />
      <span>Mailman</span>
    </div>
  );
};

export default Logo;
