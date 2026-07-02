"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { api } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Memuat produk...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Products</h1>

      {products.length === 0 ? (
        <div className="text-center py-10">Belum ada produk.</div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard 
              key={p.id} 
              product={{
                id: p.id,
                name: p.name,
                price: Number(p.price),
                stock: p.stock,
                category: p.category.name,
                image: p.images[0] || "/placeholder.jpg",
                description: p.description,
                createdAt: p.createdAt
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
