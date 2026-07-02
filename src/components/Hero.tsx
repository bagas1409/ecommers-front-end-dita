// src/components/Hero.jsx
"use client";
import { motion } from "framer-motion";
import Stars from "./icons/Stars";
import Star from "./icons/Star";
import EmailCapture from "./EmailCapture";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Hero() {
  const { data: session, status } = useAuth();

  const getDashboardUrl = () => {
    if (session?.user?.role?.toUpperCase() === "ADMIN") {
      return "/admin/dashboard";
    }
    return "/customer/dashboard";
  };

  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs text-rose-700">
            <Star className="h-3.5 w-3.5" /> Best seller 2025 • 10.000+
            pelanggan
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Kulit Glowing,{" "}
            <span className="bg-gradient-to-r from-rose-500 to-indigo-600 bg-clip-text text-transparent">
              Percaya Diri Maksimal
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-gray-600 md:text-lg">
            Rangkaian skincare diformulasikan oleh dermatologis, tanpa paraben &
            cruelty-free. Lihat hasil nyata dalam 14 hari.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {status === "authenticated" ? (
              <a href={getDashboardUrl()} className="btn btn-primary">
                Dashboard
              </a>
            ) : (
              <a href="#shop" className="btn btn-primary">
                Belanja Sekarang
              </a>
            )}
            <a href="#bestsellers" className="btn btn-ghost">
              Lihat Produk Unggulan
            </a>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
            <Stars />
            <span>4.9/5 dari 2.134 ulasan</span>
          </div>

          <EmailCapture />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="order-1 md:order-2"
        >
          <div className="relative mx-auto aspect-[4/5] w-3/4 max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 via-white to-indigo-100 p-3 shadow-xl md:w-full md:max-w-md">
            <Image
              fill
              src="/skincare.jpeg"
              alt="Produk skincare Aurora Beauty"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 ring-inset" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
