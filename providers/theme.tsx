"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import * as React from "react";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemeProvider>) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}