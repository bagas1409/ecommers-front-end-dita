"use client";

import Link from "next/link";
import CarouselWelcome from "@/components/carousel";
import type { ReactNode } from "react";
import { Fragment as SessionProvider } from "react";
import Navbar from "@/components/navbar";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="bg-accent col flex h-full w-screen flex-col items-center p-6 md:h-[95vh] md:flex-row">
        {/* Bagian kiri: carousel */}

        <div className="h-4/12 w-full rounded-2xl md:h-full md:w-6/12">
          <CarouselWelcome className="h-60 w-full md:h-full" />
        </div>
        <SessionProvider>{children}</SessionProvider>
      </div>
    </>
  );
};

export default AuthLayout;
