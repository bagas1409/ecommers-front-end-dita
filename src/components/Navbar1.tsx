// src/components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useAuth();

  const getDashboardUrl = () => {
    if (session?.user?.role?.toUpperCase() === "ADMIN") {
      return "/admin/dashboard";
    }
    return "/customer/dashboard";
  };

  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:py-6">
        <a href="#" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-indigo-500 font-bold text-white">
            AB
          </span>
          <span className="font-semibold tracking-tight">Aurora Beauty</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a className="nav-link" href="#benefits">
            Keunggulan
          </a>
          <a className="nav-link" href="#bestsellers">
            Produk
          </a>
          <a className="nav-link" href="#testimonials">
            Review
          </a>
          <a className="nav-link" href="#faq">
            FAQ
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {status === "authenticated" ? (
            <a href={getDashboardUrl()} className="btn btn-primary">
              Dashboard
            </a>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="cursor-pointer text-sm font-medium"
              >
                Masuk
              </Link>
              <a href="#shop" className="btn btn-primary">
                Belanja Sekarang
              </a>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white/70 backdrop-blur hover:bg-white md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path
              fill="currentColor"
              d="M4 7h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3">
            <a
              className="nav-link"
              href="#benefits"
              onClick={() => setOpen(false)}
            >
              Keunggulan
            </a>
            <a
              className="nav-link"
              href="#bestsellers"
              onClick={() => setOpen(false)}
            >
              Produk
            </a>
            <a
              className="nav-link"
              href="#testimonials"
              onClick={() => setOpen(false)}
            >
              Review
            </a>
            <a className="nav-link" href="#faq" onClick={() => setOpen(false)}>
              FAQ
            </a>
            {status === "authenticated" ? (
              <a
                className="btn btn-primary mt-2 w-full"
                href={getDashboardUrl()}
                onClick={() => setOpen(false)}
              >
                Dashboard
              </a>
            ) : (
              <a
                className="btn btn-primary mt-2 w-full"
                href="#shop"
                onClick={() => setOpen(false)}
              >
                Belanja Sekarang
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
