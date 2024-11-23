import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import { Header, Sidebar } from "@/components/shared";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { QueryProvider, ThemeProvider } from "@/providers";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className, "bg-muted")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <main className="flex">
              <Sidebar />
              <div className="md:w-4/5 w-full h-screen bg-background">
                <Header />
                <div className="w-full max-w-7xl mx-auto p-4">{children}</div>
              </div>
            </main>
            <TailwindIndicator />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
