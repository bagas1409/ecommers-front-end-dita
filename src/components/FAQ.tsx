"use client";

import { useState } from "react";

export default function FAQ() {
  const items = [
    {
      q: "Apakah aman untuk kulit sensitif?",
      a: "Ya. Semua produk telah melalui uji dermatologi dan bebas paraben, alkohol keras, serta pewangi berlebih.",
    },
    {
      q: "Kapan hasil mulai terlihat?",
      a: "Rata-rata pengguna melihat perubahan hidrasi sejak pemakaian pertama, dan perbaikan tekstur dalam 7–14 hari.",
    },
    {
      q: "Apakah sudah BPOM?",
      a: "Sudah. Seluruh batch diproduksi di fasilitas bersertifikat dan terdaftar di BPOM.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold md:text-4xl">
        Pertanyaan Umum
      </h2>
      <div className="mt-8 divide-y divide-gray-100 rounded-3xl border border-gray-100 bg-white">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full px-5 py-4 text-left hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{it.q}</p>
              <svg
                className={`h-5 w-5 transition ${
                  open === i ? "rotate-180" : "rotate-0"
                }`}
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </div>
            {open === i && <p className="mt-2 text-sm text-gray-600">{it.a}</p>}
          </button>
        ))}
      </div>
    </section>
  );
}
