// src/app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Base0 from "@/components/base0";

import ReactQueryProvider from "@/provider/ReactQueryProvider";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const Geistfallback = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "Modern E-commerce with Express and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${Geistfallback.className} flex flex-col antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Base0>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </Base0>
        </ThemeProvider>
      </body>
    </html>
  );
}
