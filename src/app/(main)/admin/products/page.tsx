"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { productColumns } from "./columns";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        if (res.data.success) {
          const mapped = res.data.products.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: Number(p.price),
            stock: p.stock,
            category: p.category?.name || "Uncategorized",
            image: p.images[0] || "/placeholder.jpg",
            description: p.description,
            createdAt: p.createdAt
          }));
          setProducts(mapped);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/create">
          <Button>Create Product</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10">Memuat produk...</div>
      ) : (
        <DataTable columns={productColumns} data={products} />
      )}
    </div>
  );
}
