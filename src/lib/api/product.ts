import { ProductFormValues } from "@/components/form/product-form";
import { api } from "@/lib/api";

export interface CreateProductResponse {
  id: string;
  name: string;
}

export async function createProduct(
  values: ProductFormValues,
): Promise<CreateProductResponse> {
  // Filter gambar yang tidak kosong
  const images = [values.image].filter((img): img is string => Boolean(img));

  const payload = {
    name: values.name,
    description: values.description,
    price: Number(values.price),
    stock: Number(values.stock),
    categoryId: values.category,
    images,
  };

  console.log("[createProduct] payload:", payload); // debug

  try {
    const res = await api.post("/products", payload);
    if (!res.data.success) {
      throw new Error(res.data.message ?? "Failed to create product");
    }
    return res.data.data;
  } catch (error: any) {
    // Log detail validasi dari backend Zod
    const detail = error?.response?.data;
    console.error("[createProduct] 400 detail:", detail);
    const message =
      detail?.errors?.map((e: any) => `${e.field}: ${e.message}`).join(", ") ||
      detail?.message ||
      "Failed to create product";
    throw new Error(message);
  }
}
