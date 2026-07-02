"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";

export function ProductActions({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        const res = await api.delete(`/products/${id}`);
        if (res.data.success) {
          toast.success("Product deleted successfully");
          // Refresh page to show updated data
          window.location.reload();
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to delete product");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Link href={`/admin/products/${id}`}>
        <Button variant="outline" size="sm" disabled={loading}>
          Edit
        </Button>
      </Link>
      <Button 
        variant="destructive" 
        size="sm" 
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}
