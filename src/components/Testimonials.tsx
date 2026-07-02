"use client";
import { motion } from "framer-motion";
import Star from "./icons/Star";

export default function Testimonials() {
  const data = [
    { name: "Rani", text: "Kulit terasa lembap & glowing dalam seminggu!" },
    { name: "Salsa", text: "Sunblock ringan, ga white cast sama sekali." },
    { name: "Nadia", text: "Dark spot mulai pudar, suka banget serumnya." },
  ];
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Apa Kata Mereka</h2>
        <p className="mt-2 text-gray-600">
          Dari komunitas #AuroraGlow di seluruh Indonesia.
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {data.map((t, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 text-rose-500">
              <Star className="h-4 w-4" />
              <Star className="h-4 w-4" />
              <Star className="h-4 w-4" />
              <Star className="h-4 w-4" />
              <Star className="h-4 w-4" />
            </div>
            <blockquote className="mt-3 text-gray-700">“{t.text}”</blockquote>
            <figcaption className="mt-4 text-sm font-medium">
              {t.name}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
