"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/lib/api";

interface Category {
  id: string;
  name: string;
  slug?: string;
}

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get("/categories")
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">Kategori Produk</h1>
      <Link href={"/admin/categories/add"}>
        <Button>Tambah Kategori</Button>
      </Link>
      <ul className="space-y-2 pt-4">
        {categories.map((cat) => (
          <li key={cat.id} className="rounded border p-3">
            <h3 className="font-semibold">{cat.name}</h3>
            <p className="text-sm text-gray-600">Slug: {cat.slug}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
