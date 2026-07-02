"use client";

import { useEffect, useState, use } from "react";
import { ProductGallery } from "@/components/product/product-gallery";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    api
      .get(`/products/${unwrappedParams.id}`)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.data);
        }
      })
      .catch((err) => console.error("Gagal mengambil data produk:", err))
      .finally(() => setLoading(false));
  }, [unwrappedParams.id]);

  if (loading) {
    return <div className="p-6 text-center">Memuat detail produk...</div>;
  }

  if (!product) {
    return <div className="p-6 text-center text-red-500">Produk tidak ditemukan.</div>;
  }

  const isWished = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.images?.[0] || "/placeholder.jpg",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10 p-6 lg:grid-cols-2">
      {/* Left: Gallery */}
      <ProductGallery images={product.images?.length ? product.images : ["/placeholder.jpg"]} />

      {/* Right: Detail */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-sm text-gray-500">Kategori: {product.category?.name || "Umum"}</p>

        <p className="text-primary text-2xl font-semibold">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>

        <p className="text-muted-foreground">Stok tersedia: {product.stock}</p>

        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.description}</p>

        <Button 
          className="mt-4 w-full" 
          size="lg"
          onClick={() => addToCart(product.id, 1)}
          disabled={product.stock < 1}
        >
          {product.stock > 0 ? "Add to Cart" : "Stok Habis"}
        </Button>

        <Button 
          variant={isWished ? "default" : "secondary"} 
          className="w-full"
          onClick={handleWishlistToggle}
        >
          {isWished ? "Hapus dari Wishlist" : "Add to Wishlist"}
        </Button>
      </div>
    </div>
  );
}
