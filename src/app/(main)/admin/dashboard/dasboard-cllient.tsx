"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, RefreshCcw } from "lucide-react";
import { useSocket } from "@/context/SocketContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface ChartItem {
  name: string;
  total: number;
}

interface DashboardStats {
  revenue: {
    total: number;
    thisMonth: number;
    growth: number;
  };
  totalCustomers: number;
  totalOrders: number;
  totalProducts: number;
  chart?: ChartItem[];
}

interface Props {
  stats: DashboardStats;
}

export default function DashboardClient({ stats: initialStats }: Props) {
  const [stats, setStats] = useState(initialStats);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const socket = useSocket();

  const fetchStats = async (showToast = false) => {
    setIsRefreshing(true);
    try {
      const res = await api.get("/admin/dashboard/stats");
      if (res.data.success) {
        setStats(res.data.data);
        if (showToast) toast.success("Data dashboard diperbarui");
      }
    } catch (err) {
      console.error("Gagal refresh stats:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewOrder = (data: any) => {
      console.log("Real-time: Pesanan baru diterima", data);
      toast.info(`Pesanan baru dari ${data.customerName}! Rp ${data.totalAmount.toLocaleString("id-ID")}`, {
        duration: 5000,
      });
      fetchStats();
    };

    const handleStatusUpdate = () => {
      fetchStats();
    };

    socket.on("NEW_ORDER", handleNewOrder);
    socket.on("ORDER_STATUS_UPDATE", handleStatusUpdate);

    return () => {
      socket.off("NEW_ORDER", handleNewOrder);
      socket.off("ORDER_STATUS_UPDATE", handleStatusUpdate);
    };
  }, [socket]);

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Monitoring Real-time Aktif
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fetchStats(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Ke Landing Page
            </Button>
          </Link>
        </div>
      </div>

      {/* ===== TOP METRIC CARDS ===== */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Revenue */}
        <Card className="shadow-sm transition hover:shadow-md border-t-4 border-t-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {(stats?.revenue?.total || 0).toLocaleString("id-ID")}
            </div>
            <p className="text-xs text-emerald-600 mt-1">
              Data terupdate otomatis
            </p>
          </CardContent>
        </Card>

        {/* Customers */}
        <Card className="shadow-sm transition hover:shadow-md border-t-4 border-t-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              Pelanggan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalCustomers || 0}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Customer terdaftar
            </p>
          </CardContent>
        </Card>

        {/* Orders */}
        <Card className="shadow-sm transition hover:shadow-md border-t-4 border-t-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              Total Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalOrders || 0}
            </div>
            <p className="text-xs text-purple-600 mt-1">
              Transaksi diproses
            </p>
          </CardContent>
        </Card>

        {/* Products */}
        <Card className="shadow-sm transition hover:shadow-md border-t-4 border-t-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              Total Produk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalProducts || 0}
            </div>
            <p className="text-xs text-orange-600 mt-1">
              Item di inventaris
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ===== REVENUE GRAPH ===== */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Grafik Penjualan</CardTitle>
            <p className="text-sm text-muted-foreground">Analisis bulanan</p>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
            Trend Positif
          </div>
        </CardHeader>
        <CardContent className="h-[350px]">
          {stats?.chart && stats?.chart.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chart}>
                <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
                <YAxis stroke="#888" tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) =>
                    "Rp " + value.toLocaleString("id-ID")
                  }
                />
                <Bar
                  dataKey="total"
                  radius={[4, 4, 0, 0]}
                  fill="#10b981"
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Data grafik belum tersedia
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
