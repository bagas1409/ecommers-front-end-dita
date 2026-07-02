"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <Card className="group relative overflow-hidden border transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/customer/products/${product.id}`}>
        <CardContent className="space-y-3 p-4 cursor-pointer">
          <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <h3 className="line-clamp-1 text-lg font-semibold">{product.name}</h3>

          <p className="text-primary font-semibold">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <p className="text-muted-foreground text-xs">Stok: {product.stock}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
