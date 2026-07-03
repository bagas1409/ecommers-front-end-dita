"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { Home } from "lucide-react";

export default function UserDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          api.get("/orders"),
          api.get("/products?limit=3"),
        ]);
        
        if (ordersRes.data.success) {
          setOrders(ordersRes.data.data || []);
        }
        
        if (productsRes.data.success) {
          setProducts(productsRes.data.products || []);
        }
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === "PENDING").length;
  const totalSpending = orders
    .filter((o) => o.orderStatus !== "CANCELED")
    .reduce((acc, curr) => acc + Number(curr.totalAmount), 0);

  const metrics = [
    { label: "Total Pesanan", value: totalOrders },
    { label: "Pesanan Pending", value: pendingOrders },
    { label: "Total Belanja", value: `Rp ${totalSpending.toLocaleString("id-ID")}` },
  ];

  const recentOrders = orders.slice(0, 3);
  const recommendedProducts = products;

  if (loading) {
    return <div className="p-10 text-center">Memuat dashboard...</div>;
  }

  return (
    <div className="space-y-10 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Ke Landing Page
          </Button>
        </Link>
      </div>

      {/* ====== METRICS ====== */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {metrics.map((item) => (
          <Card
            key={item.label}
            className="rounded-xl border bg-white shadow-sm transition hover:shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ====== RECENT ORDERS ====== */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Pesanan Terakhir</h2>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 py-4 text-center">Belum ada pesanan.</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-lg border p-3 transition hover:bg-gray-50 flex-wrap gap-4"
                  >
                    <div>
                      <p className="font-semibold">Order ID: {order.id.slice(-8).toUpperCase()}</p>
                      <p className="text-muted-foreground text-sm">
                        {order.items.length} Barang
                      </p>
                    </div>

                    <Badge
                      variant={
                        order.orderStatus === "DELIVERED" ? "default" : "secondary"
                      }
                    >
                      {order.orderStatus}
                    </Badge>

                    <p className="font-medium">
                      Rp {Number(order.totalAmount).toLocaleString("id-ID")}
                    </p>

                    <Link href={`/customer/orders/${order.id}`}>
                      <Button size="sm" variant="outline">
                        Detail
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ====== RECOMMENDED PRODUCTS ====== */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Rekomendasi Produk</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden rounded-xl shadow-sm transition hover:shadow-md flex flex-col"
            >
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <CardContent className="space-y-2 p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
                <p className="font-medium text-gray-600">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </p>

                <div className="mt-auto pt-4">
                  <Link href={`/customer/products/${product.id}`}>
                    <Button className="w-full">Lihat Produk</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
