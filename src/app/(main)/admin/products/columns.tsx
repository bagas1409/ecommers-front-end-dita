"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/types/product";
import { Column } from "@/components/ui/data-table";
import { ProductActions } from "@/components/product/product-actions";

export const productColumns: Column<Product>[] = [
  { key: "name", title: "Name" },
  {
    key: "price",
    title: "Price",
    render: (value) => <span>Rp {value.toLocaleString("id-ID")}</span>,
  },
  { key: "stock", title: "Stock" },
  { key: "category", title: "Category" },
  {
    key: "image",
    title: "Image",
    render: (value) => (
      <img src={value} className="h-12 w-12 rounded-md object-cover" />
    ),
  },
  {
    key: "id",
    title: "Actions",
    render: (_value, row) => <ProductActions id={row.id} />,
  },
];
