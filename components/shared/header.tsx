import React from "react";

import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <header className="h-16 border-b flex items-center justify-between px-4">
      <h1 className="text-2xl font-bold">Header</h1>
      <ModeToggle />
    </header>
  );
};

export default Header;
