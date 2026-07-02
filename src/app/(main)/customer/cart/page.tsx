"use client";

import { useCart } from "@/hooks/useCart";
import { CartItemCard } from "@/components/card/itemcard";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    loading,
    subtotal,
    totalItems,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  const shippingCost = 25000;
  const tax = subtotal * 0.11;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="rounded-lg p-2 transition hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Keranjang Belanja
            </h1>
            <span className="ml-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {totalItems} Item
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item as any}
                onQuantityChange={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Ringkasan Belanja</h2>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ongkir</span>
                  <span className="text-gray-900">
                    Rp {shippingCost.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pajak (PPN 11%)</span>
                  <span className="text-gray-900">
                    Rp {tax.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-blue-600">
                      Rp {total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push("/customer/checkout")}
                className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
              >
                Lanjut ke Pembayaran
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                Harga sudah termasuk pajak
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
          <ShoppingCart className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Keranjang Kosong
        </h2>
        <p className="mb-6 text-gray-600">
          Belum ada produk di keranjang belanja Anda
        </p>
        <button
          onClick={() => router.push("/customer/products")}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Mulai Belanja
        </button>
      </div>
    </div>
  );
}
