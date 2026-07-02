"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    // Load dari local storage saat komponen di-mount
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (error) {
        console.error("Gagal membaca wishlist:", error);
      }
    }
  }, []);

  const addToWishlist = (product: WishlistItem) => {
    const existing = wishlist.find((item) => item.id === product.id);
    if (existing) {
      toast.info("Produk sudah ada di wishlist");
      return;
    }

    const newWishlist = [...wishlist, product];
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    toast.success("Ditambahkan ke wishlist");
  };

  const removeFromWishlist = (productId: string) => {
    const newWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    toast.success("Dihapus dari wishlist");
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
}
