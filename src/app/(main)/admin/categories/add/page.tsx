"use client";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddCategoryPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    try {
      const res = await api.post("/categories", {
        name,
        slug,
      });

      if (res.data.success) {
        toast.success("Kategori berhasil ditambahkan");
        router.push("/admin/categories");
      } else {
        toast.error(res.data.message || "Gagal menambahkan kategori");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan server");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md">
      <h1 className="text-xl font-bold">Tambah Kategori</h1>

      <input
        name="name"
        placeholder="Nama Kategori"
        className="w-full border p-2 rounded"
        required
      />

      <button className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 transition">Simpan</button>
    </form>
  );
}
