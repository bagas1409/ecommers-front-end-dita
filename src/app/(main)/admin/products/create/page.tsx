"use client";

import { ProductForm, ProductFormValues } from "@/components/form/product-form";
import { createProduct } from "@/lib/api/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateProductPage() {
  const router = useRouter();

  const handleCreate = async (values: ProductFormValues) => {
    try {
      await createProduct(values);

      toast.success("Product created successfully");
      router.push("/admin/products");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-2xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">Create Product</h1>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
}
