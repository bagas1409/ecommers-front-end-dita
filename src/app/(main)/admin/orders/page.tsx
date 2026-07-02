"use client";

import { useEffect, useState } from "react";
import OrdersClient, { OrderItem } from "./orders-client";
import { api } from "@/lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/admin/all")
      .then((res) => {
        if (res.data.success) {
          // Format backend data to match OrderItem structure expected by OrdersClient
          const formattedOrders = res.data.data.map((order: any) => ({
            _id: order.id,
            user: order.user?.name || "Unknown",
            total: Number(order.totalAmount),
            status: order.orderStatus,
            createdAt: order.createdAt,
          }));
          setOrders(formattedOrders);
        }
      })
      .catch((err) => console.error("Gagal mengambil data pesanan:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Memuat daftar pesanan...</div>;
  }

  return <OrdersClient orders={orders} />;
}
