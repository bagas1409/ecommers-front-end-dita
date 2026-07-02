"use client";

import { ModeToggle } from "@/components/ui/themetoggle";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth as useSession } from "@/hooks/useAuth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    const handleScroll = () => {
      // Set state menjadi true jika posisi scroll lebih dari 10px
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener saat komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="navbar"
      // PERBAIKAN: Menghapus tanda kutip ekstra, memperbaiki 'ease-linear', dan menyederhanakan logika transisi
      className="bg-accent sticky top-0 z-30 flex w-full items-center justify-between p-3 transition-all duration-500 ease-out"
    >
      <div className="text-accent-foreground cursor-pointer text-lg font-bold">
        <Link href="/">E-GOVERMENT</Link>
      </div>

      <div className="flex items-center justify-end">
        <nav className="flex items-center justify-center gap-4 text-sm font-medium">
          {/* Logika kondisional ini sudah benar, dengan asumsi 'user' adalah null/undefined saat logout */}
          {!session?.user ? (
            <Link
              href="/auth/signin"
              className="hover:shadow-fixed bg-sidebar text-accent-foreground w-fit rounded-md border-zinc-200 px-4 py-2 transition-shadow"
            >
              Log-in
            </Link>
          ) : (
            <button className="hover:shadow-fixed bg-sidebar text-accent-foreground w-fit rounded-md border-zinc-200 px-4 py-2 transition-shadow">
              Log-out
            </button>
          )}
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
