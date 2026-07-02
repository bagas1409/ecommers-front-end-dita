"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { OrderStatusSelect } from "@/components/orders/order-status-select";
import { api } from "@/lib/api";
import { toast } from "sonner";

export interface OrderItem {
  _id: string;
  user: string;
  total: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED";
  createdAt: string;
}

interface Props {
  orders: OrderItem[];
}

export default function OrdersClient({ orders }: Props) {
  const columns = [
    { key: "user", title: "Customer" },
    {
      key: "total",
      title: "Total",
      render: (value: number) => (
        <span>Rp {value.toLocaleString("id-ID")}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value: OrderItem["status"]) => (
        <OrderStatusBadge status={value} />
      ),
    },
    {
      key: "createdAt",
      title: "Date",
      render: (value: string) => (
        <span>{new Date(value).toLocaleDateString("id-ID")}</span>
      ),
    },
    {
      key: "_id",
      title: "Actions",
      render: (_id: string, row: OrderItem) => (
        <OrderStatusSelect
          orderId={row._id}
          initialStatus={row.status}
          onUpdate={async (id, status) => {
            try {
              const res = await api.patch(`/orders/${id}/status`, { status });
              if (res.data.success) {
                toast.success("Status pesanan berhasil diperbarui!");
              }
            } catch (error) {
              console.error("Gagal mengupdate status pesanan:", error);
              toast.error("Gagal memperbarui status pesanan");
            }
          }}
        />
      ),
    },
  ] as const;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<OrderItem> columns={columns} data={orders} />
        </CardContent>
      </Card>
    </div>
  );
}
