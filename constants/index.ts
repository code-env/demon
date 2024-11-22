import { Inbox, Send, FileText } from "lucide-react";

export const routes = [
  {
    label: "Emails",
    icon: Inbox,
    href: "/",
  },
  {
    label: "Memory",
    icon: Send,
    href: "/memory",
  },
  {
    label: "Ingest leads",
    icon: FileText,
    href: "/ingest-leads",
  },
];
