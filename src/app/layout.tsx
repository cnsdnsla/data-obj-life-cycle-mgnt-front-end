import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { ThemeProvider } from "./components/material-tailwind";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
