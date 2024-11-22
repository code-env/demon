import Link from "next/link";

import { Logo } from "@/components/shared";
import { routes } from "@/constants";
import { Button } from "../ui/button";
const Sidebar = () => {
  return (
    <aside className="w-1/5 h-screen bg-muted text-primary flex flex-col gap-4 border-r">
      <div className="p-4 border-b border-border dark:border-gray-100/10 h-16">
        <Logo />
      </div>
      <nav className="flex flex-col gap-2 px-4 flex-1">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.label}
            className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-background transition-colors duration-200"
          >
            <route.icon className="size-4" />
            <span>{route.label}</span>
          </Link>
        ))}
      </nav>
      <div className="border-t p-4 dark:border-gray-100/10 border-border">
        <Button variant="outline" className="w-full">
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
