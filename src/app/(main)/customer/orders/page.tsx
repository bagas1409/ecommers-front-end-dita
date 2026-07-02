"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

interface OrderItem {
  id: string;
  createdAt: string;
  orderStatus: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED";
  totalAmount: string;
  items: {
    quantity: number;
    priceEach: string;
    product: {
      name: string;
      images: string[];
    };
  }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders")
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const StatusBadge = (status: OrderItem["orderStatus"]) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock size={14} /> Pending
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-blue-400 text-blue-600"
          >
            <Package size={14} /> Processing
          </Badge>
        );
      case "SHIPPED":
        return (
          <Badge className="bg-purple-600">
            <Truck size={14} className="mr-1" /> Shipped
          </Badge>
        );
      case "DELIVERED":
        return (
          <Badge className="flex items-center gap-1 bg-green-600">
            <CheckCircle size={14} /> Delivered
          </Badge>
        );
      case "CANCELED":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle size={14} /> Canceled
          </Badge>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Memuat pesanan...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-10">Belum ada pesanan.</div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="rounded-xl border shadow-sm transition hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Order ID: {order.id.slice(-8).toUpperCase()}</h2>
                  {StatusBadge(order.orderStatus)}
                </div>
                <p className="text-sm text-gray-500">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.product.images[0] || "/placeholder.jpg"}
                      className="h-20 w-20 rounded-md border object-cover"
                      alt={item.product.name}
                    />

                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × Rp {Number(item.priceEach).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <p className="font-semibold">
                      Rp {(item.quantity * Number(item.priceEach)).toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <p className="text-lg font-bold">
                  Total: Rp {Number(order.totalAmount).toLocaleString("id-ID")}
                </p>

                <Link href={`/customer/orders/${order.id}`}>
                  <Button size="sm">View Detail</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
