"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Minimum price is 1"),
  stock: z.number().min(0, "Stock cannot be negative"),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  onSubmit?: (values: ProductFormValues) => void;
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          price: product.price,
          stock: product.stock,
          category:
            typeof product.category === "string"
              ? product.category
              : (product.category as any).id || "",
          image: product.image,
          description: product.description,
        }
      : {
          name: "",
          price: 0,
          stock: 0,
          category: "",
          image: "",
          description: "",
        },
  });

  useEffect(() => {
    api.get("/categories")
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  const submitHandler = async (values: ProductFormValues) => {
    try {
      setUploading(true);
      let imageUrl = values.image;

      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const uploadRes = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        if (uploadRes.data.success) {
          // Strip /api dari baseURL agar URL gambar = http://localhost:5000/uploads/...
          const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
          const storageBase = apiBase.replace(/\/api$/, "");
          imageUrl = `${storageBase}${uploadRes.data.url}`;
        }
      }

      if (!imageUrl && !product) {
        form.setError("image", { message: "Image is required" });
        setUploading(false);
        return;
      }

      onSubmit?.({ ...values, image: imageUrl || "" });
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(submitHandler)}
      className="space-y-5 rounded-xl border bg-white p-4 shadow-sm"
    >
      <div className="space-y-2">
        <label className="text-sm font-semibold">Product Name</label>
        <Input {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Price</label>
        <Input
          type="number"
          {...form.register("price", { valueAsNumber: true })}
        />
        {form.formState.errors.price && (
          <p className="text-sm text-red-500">
            {form.formState.errors.price.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Stock</label>
        <Input
          type="number"
          {...form.register("stock", { valueAsNumber: true })}
        />
        {form.formState.errors.stock && (
          <p className="text-sm text-red-500">
            {form.formState.errors.stock.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Category</label>
        <select
          {...form.register("category")}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {form.formState.errors.category && (
          <p className="text-sm text-red-500">
            {form.formState.errors.category.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Product Image</label>
        <Input 
          type="file" 
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
        {product?.image && !file && (
          <div className="mt-2 text-sm text-gray-500">
            Current image: {product.image.split('/').pop()}
          </div>
        )}
        {form.formState.errors.image && (
          <p className="text-sm text-red-500">
            {form.formState.errors.image.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Description</label>
        <Textarea {...form.register("description")} className="h-28" />
        {form.formState.errors.description && (
          <p className="text-sm text-red-500">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={uploading}>
        {uploading ? "Uploading..." : product ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
}
