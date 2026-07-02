"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { MapPin } from "lucide-react";

interface AddressItem {
  id: string;
  label: string;
  fullAddress: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loading: cartLoading, subtotal } = useCart();
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    api.get("/addresses")
      .then((res) => {
        if (res.data.success) {
          setAddresses(res.data.data);
        }
      })
      .catch((err) => console.error("Gagal mengambil alamat:", err))
      .finally(() => setLoading(false));
  }, []);

  const handlePayment = async () => {
    if (addresses.length === 0) {
      toast.error("Silakan tambahkan alamat pengiriman terlebih dahulu.");
      return router.push("/customer/address");
    }

    setProcessing(true);
    try {
      const shippingCost = 25000;
      const res = await api.post("/orders", {
        addressId: addresses[0].id,
        shippingCost,
        notes: "Mohon dikemas dengan aman"
      });

      if (res.data.success) {
        toast.success("Pesanan berhasil dibuat!");
        router.push("/customer/orders");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal memproses pembayaran");
    } finally {
      setProcessing(false);
    }
  };

  if (loading || cartLoading) {
    return <div className="p-6 text-center">Memuat halaman checkout...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-6 text-center space-y-4">
        <p>Keranjang Anda kosong.</p>
        <Button onClick={() => router.push("/customer/products")}>Mulai Belanja</Button>
      </div>
    );
  }

  const shippingCost = 25000;
  const tax = subtotal * 0.11;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin size={20} /> Alamat Pengiriman
          </CardTitle>
        </CardHeader>
        <CardContent>
          {addresses.length > 0 ? (
            <div className="rounded-lg border p-4 bg-gray-50">
              <p className="font-semibold">{addresses[0].label}</p>
              <p className="text-gray-600 mt-1">{addresses[0].fullAddress}</p>
            </div>
          ) : (
            <div className="text-center p-4">
              <p className="text-gray-500 mb-4">Anda belum memiliki alamat pengiriman.</p>
              <Button onClick={() => router.push("/customer/address")}>Tambah Alamat</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Belanja</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Harga ({cart.items.length} Barang)</span>
            <span className="font-medium">Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Ongkos Kirim</span>
            <span className="font-medium">Rp {shippingCost.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pajak (PPN 11%)</span>
            <span className="font-medium">Rp {tax.toLocaleString("id-ID")}</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold">
            <span>Total Tagihan</span>
            <span className="text-blue-600">Rp {total.toLocaleString("id-ID")}</span>
          </div>

          <Button 
            className="w-full mt-6" 
            size="lg" 
            onClick={handlePayment}
            disabled={processing || addresses.length === 0}
          >
            {processing ? "Memproses..." : "Bayar Sekarang"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
