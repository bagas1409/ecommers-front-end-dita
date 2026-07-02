"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/form/product-form";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${unwrappedParams.id}`)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.data);
        }
      })
      .catch((err) => console.error("Failed to load product:", err))
      .finally(() => setLoading(false));
  }, [unwrappedParams.id]);

  if (loading) return <div className="p-6">Loading product...</div>;
  if (!product) return <div className="p-6 text-red-500">Product not found</div>;

  // Adapt the backend format to frontend form if necessary
  const formattedProduct = {
    ...product,
    price: Number(product.price),
    category: product.categoryId || product.category?.id || "",
    image: product.images?.[0] || "",
  };

  const handleUpdate = async (values: any) => {
    try {
      const payload = {
        name: values.name,
        price: values.price,
        stock: values.stock,
        categoryId: values.category,
        description: values.description,
        images: values.image ? [values.image] : [],
      };

      const res = await api.put(`/products/${unwrappedParams.id}`, payload);
      if (res.data.success) {
        toast.success("Produk berhasil diperbarui!");
        router.push("/admin/products");
      }
    } catch (err: any) {
      console.error("Update failed:", err);
      toast.error(err.response?.data?.message || "Gagal memperbarui produk");
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Edit Product</h1>
      <ProductForm product={formattedProduct} onSubmit={handleUpdate} />
    </div>
  );
}

