"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Truck, Clock, CheckCircle, XCircle, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${unwrappedParams.id}`)
      .then((res) => {
        if (res.data.success) {
          setOrder(res.data.data);
        }
      })
      .catch((err) => console.error("Gagal load detail order:", err))
      .finally(() => setLoading(false));
  }, [unwrappedParams.id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" /> Menunggu Proses</Badge>;
      case "PROCESSING":
        return <Badge variant="outline" className="border-blue-400 text-blue-600"><Package className="mr-1 h-3 w-3" /> Diproses</Badge>;
      case "SHIPPED":
        return <Badge className="bg-purple-600"><Truck className="mr-1 h-3 w-3" /> Dikirim</Badge>;
      case "DELIVERED":
        return <Badge className="bg-green-600"><CheckCircle className="mr-1 h-3 w-3" /> Selesai</Badge>;
      case "CANCELED":
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Dibatalkan</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat detail pesanan...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Pesanan tidak ditemukan</div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/customer/orders">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Detail Pesanan</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Kolom Info Order */}
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
              <div>
                <p className="text-sm text-gray-500">ID Pesanan</p>
                <p className="font-semibold">{order.id.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Tanggal Transaksi</p>
                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-medium">Status:</span>
                {getStatusBadge(order.orderStatus)}
              </div>

              <h3 className="font-semibold mb-3">Daftar Produk:</h3>
              <div className="space-y-4">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <img src={item.product.images?.[0] || "/placeholder.jpg"} className="h-16 w-16 rounded-md object-cover border" alt="product" />
                    <div className="flex-1">
                      <p className="font-medium leading-tight">{item.product.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.quantity} x Rp {Number(item.priceEach).toLocaleString("id-ID")}</p>
                    </div>
                    <div className="font-semibold text-right">
                      Rp {(item.quantity * Number(item.priceEach)).toLocaleString("id-ID")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Info Pengiriman & Pembayaran */}
        <div className="space-y-6 md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                Info Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-gray-700">
              {order.address ? (
                <>
                  <p className="font-semibold text-black">{order.address.receiver}</p>
                  <p>{order.address.phone}</p>
                  <p className="mt-2">{order.address.fullAddress}</p>
                  <p>{order.address.city}, {order.address.province} {order.address.postalCode}</p>
                </>
              ) : (
                <p>Alamat tidak tersedia</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rincian Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Harga</span>
                <span>Rp {(Number(order.totalAmount) - Number(order.tax) - Number(order.shippingCost)).toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ongkos Kirim</span>
                <span>Rp {Number(order.shippingCost).toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pajak (11%)</span>
                <span>Rp {Number(order.tax).toLocaleString("id-ID")}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-base">
                <span>Total Belanja</span>
                <span className="text-blue-600">Rp {Number(order.totalAmount).toLocaleString("id-ID")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
