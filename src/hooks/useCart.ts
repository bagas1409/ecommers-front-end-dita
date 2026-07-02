"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

// Definisikan tipe Cart berdasarkan response backend baru
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: string;
    stock: number;
    images: string[];
  };
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cart");
      if (res.data.success) {
        setCart(res.data.data);
      }
    } catch (err: any) {
      if (err.response?.status !== 401) {
        setError("Gagal mengambil data keranjang");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const res = await api.post("/cart/items", { productId, quantity });
      if (res.data.success) {
        setCart(res.data.data);
        toast.success("Produk ditambahkan ke keranjang");
        return true;
      }
    } catch (err: any) {
      const errorData = err.response?.data;
      let errorMessage = errorData?.message || "Gagal menambahkan produk";
      
      // Jika error validasi Zod (array of errors)
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        errorMessage = errorData.errors.map((e: any) => `${e.field}: ${e.message}`).join(", ");
      }
      
      toast.error(errorMessage);
      console.error("Cart Error:", errorData || err);
      return false;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await api.patch(`/cart/items/${productId}`, { quantity });
      if (res.data.success) {
        setCart(res.data.data);
        return true;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal mengupdate jumlah");
      console.error(err);
      return false;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const res = await api.delete(`/cart/items/${productId}`);
      if (res.data.success) {
        setCart(res.data.data);
        toast.success("Produk dihapus dari keranjang");
        return true;
      }
    } catch (err: any) {
      toast.error("Gagal menghapus produk");
      console.error(err);
      return false;
    }
  };

  const clearCart = async () => {
    try {
      const res = await api.delete("/cart");
      if (res.data.success) {
        setCart(res.data.data);
        toast.success("Keranjang berhasil dikosongkan");
        return true;
      }
    } catch (err: any) {
      toast.error("Gagal mengosongkan keranjang");
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    // Karena kita tidak lagi menggunakan NextAuth useSession,
    // kita hanya mencoba fetch cart. Jika gagal karena 401 (belum login),
    // interceptor Axios akan menangani retry/logout secara diam-diam.
    if (typeof window !== "undefined" && localStorage.getItem("accessToken")) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, []);

  const subtotal =
    cart?.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    ) || 0;

  const totalItems =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return {
    cart,
    loading,
    error,
    subtotal,
    totalItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetch: fetchCart,
  };
}
