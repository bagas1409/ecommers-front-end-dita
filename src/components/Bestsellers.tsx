"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category?: { name: string };
}

export default function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products?limit=6&sort=newest")
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products ?? []);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <section id="bestsellers" className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">Produk Unggulan</h2>
          <p className="mt-2 text-gray-600">
            Pilihan terbaik dari koleksi kami.
          </p>
        </div>
        <Link href="/customer/products" className="btn btn-ghost text-sm">
          Lihat Semua →
        </Link>
      </div>

      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-3xl bg-gray-100"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="mt-12 text-center text-gray-400">
          Belum ada produk tersedia.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-xl"
            >
              {p.category?.name && (
                <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-rose-500 px-2.5 py-1 text-xs font-medium text-white shadow">
                  {p.category.name}
                </span>
              )}
              <div className="rounded-2xl bg-gradient-to-br from-rose-50 via-white to-indigo-50 p-4">
                <Image
                  height={176}
                  width={176}
                  src={p.images?.[0] || "/skincare.jpeg"}
                  alt={p.name}
                  className="mx-auto h-44 w-44 object-contain"
                  unoptimized
                />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold tracking-tight">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.category?.name ?? "Produk"}</p>
                </div>
                <p className="font-semibold text-rose-600">{formatPrice(p.price)}</p>
              </div>
              <Link
                href={`/customer/products/${p.id}`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Lihat Produk
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}

