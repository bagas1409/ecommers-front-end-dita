"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, DollarSign, ShoppingBag, Users, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const [stats, setStats] = useState<any>(null);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, reportsRes] = await Promise.all([
          api.get("/admin/dashboard/stats"),
          api.get("/admin/dashboard/reports"),
        ]);

        if (statsRes.data.success) setStats(statsRes.data.data);
        if (reportsRes.data.success) setSalesData(reportsRes.data.data);
      } catch (err) {
        console.error("Gagal memuat data laporan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-500">Menyusun laporan...</div>;

  const summaryCards = [
    {
      title: "Total Pendapatan",
      value: `Rp ${stats?.revenue?.total?.toLocaleString("id-ID")}`,
      description: "Pendapatan dari pesanan lunas",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Total Pesanan",
      value: stats?.totalOrders,
      description: "Jumlah transaksi keseluruhan",
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Pelanggan",
      value: stats?.totalCustomers,
      description: "User terdaftar sebagai customer",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Produk Aktif",
      value: stats?.totalProducts,
      description: "Total item di inventaris",
      icon: Package,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          Laporan & Analitik
        </h1>
        <p className="text-gray-500">Pantau performa penjualan dan pertumbuhan bisnis kamu.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Chart */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tren Penjualan Bulanan</CardTitle>
              <CardDescription>Visualisasi pendapatan kotor setiap bulan</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-white text-blue-600 border-blue-100">
              Update Real-time
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#6b7280", fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickFormatter={(val) => `Rp ${val / 1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: "#f9fafb" }}
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  formatter={(value) => [`Rp ${value.toLocaleString("id-ID")}`, "Pendapatan"]}
                />
                <Bar 
                  dataKey="total" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                >
                   {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
