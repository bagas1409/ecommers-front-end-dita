"use client";

import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem } from "@/hooks/useCart";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  loading?: boolean;
}

export function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  loading = false,
}: CartItemCardProps) {
  const { productId, quantity, product } = item;
  const price = Number(product.price);
  const itemTotal = price * quantity;
  const isLowStock = product.stock <= 5;

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative h-24 w-24 flex-shrink-0 bg-gray-50 rounded-lg">
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="rounded-lg object-cover"
            unoptimized
          />
        </div>

        {/* Product Info */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">Umum</p>
          <p className="mt-2 text-lg font-bold text-blue-600">
            Rp {price.toLocaleString("id-ID")}
          </p>

          {isLowStock && (
            <p className="mt-1 text-xs text-orange-600">
              Stok tinggal {product.stock}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end justify-between">
          <button
            onClick={() => onRemove(productId)}
            disabled={loading}
            className="rounded p-1 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => onQuantityChange(productId, quantity - 1)}
              disabled={quantity <= 1 || loading}
              className="rounded p-1 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => onQuantityChange(productId, quantity + 1)}
              disabled={quantity >= product.stock || loading}
              className="rounded p-1 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Item Total */}
      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <span className="text-sm text-gray-600">Total Item</span>
        <span className="font-bold text-gray-900">
          Rp {itemTotal.toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );
}
