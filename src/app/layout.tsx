import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCP Server Generator",
  description: "Generate a TypeScript Model Context Protocol (MCP) server from an OpenAPI spec.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
