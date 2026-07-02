// src/components/Benefits.jsx
"use client";
import { motion } from "framer-motion";
import Drop from "./icons/Drop";
import Sparkles from "./icons/Sparkles";
import Shield from "./icons/Shield";

export default function Benefits() {
  const data = [
    {
      title: "Glowing & Hydrated",
      desc: "Niacinamide 5% + Hyaluronic untuk kelembapan 24 jam.",
      icon: Drop,
      tag: "Hydration",
      accent: "from-rose-100 to-rose-200",
    },
    {
      title: "Memudarkan Noda",
      desc: "Alpha arbutin bantu samarkan dark spot & bekas jerawat.",
      icon: Sparkles,
      tag: "Brightening",
      accent: "from-amber-100 to-rose-100",
    },
    {
      title: "Melindungi Kulit",
      desc: "Antioksidan vitamin C melawan polusi & radikal bebas.",
      icon: Shield,
      tag: "Protection",
      accent: "from-indigo-100 to-rose-100",
    },
  ];

  return (
    <section id="benefits" className="relative mx-auto max-w-7xl px-4 py-20">
      {/* dekor halus */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-rose-100/60 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-indigo-100/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-3 py-1 text-xs text-rose-600 backdrop-blur">
          Dermatologist crafted
        </span>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Manfaat Utama</h2>
        <p className="mt-3 text-gray-600">
          Formulasi ringan, cepat menyerap, cocok untuk semua jenis kulit.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-xl"
          >
            {/* border gradient on hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(244, 114, 182, .25), rgba(99, 102, 241, .25))",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />

            {/* badge index */}
            <span className="absolute top-4 right-4 rounded-full border border-gray-200 bg-white/70 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* icon + copy */}
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ y: 0 }}
                whileInView={{ y: [-1.5, 1.5, -1.5] }} // animasi lebih kecil
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-indigo-50 text-rose-500 ring-1 ring-rose-200/60 will-change-transform group-hover:ring-rose-300"
              >
                <b.icon className="pointer-events-none h-6 w-6" />
              </motion.div>

              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm text-gray-600">{b.desc}</p>
              </div>
            </div>

            {/* footer row */}
            <div className="mt-5 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600 ring-1 ring-rose-200 ring-inset">
                {b.tag}
              </span>
              <a
                href="#bestsellers"
                className="text-sm font-medium text-rose-600 underline-offset-4 transition hover:text-rose-700 hover:underline"
              >
                Lihat produk
              </a>
            </div>

            {/* bottom glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 bottom-0 h-16 translate-y-1/2 rounded-full bg-gradient-to-r from-rose-200 via-rose-300 to-indigo-200 opacity-0 blur-2xl transition group-hover:opacity-100"
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
