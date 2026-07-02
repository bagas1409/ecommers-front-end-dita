"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MapPin, Check } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface AddressItem {
  id: string;
  label: string;
  receiver: string;
  phone: string;
  fullAddress: string;
  isDefault: boolean;
}

export default function AddressPage() {
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/addresses");
      if (res.data.success) {
        setAddresses(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengambil data alamat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const setDefault = async (id: string) => {
    try {
      const res = await api.patch(`/addresses/${id}/default`);
      if (res.data.success) {
        toast.success("Alamat utama berhasil diubah");
        fetchAddresses();
      }
    } catch (err) {
      toast.error("Gagal mengubah alamat utama");
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      const res = await api.delete(`/addresses/${id}`);
      if (res.data.success) {
        toast.success("Alamat berhasil dihapus");
        fetchAddresses();
      }
    } catch (err) {
      toast.error("Gagal menghapus alamat");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Memuat alamat...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <Link href="/customer/address/create">
          <Button>Add New Address</Button>
        </Link>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-10">Belum ada alamat yang tersimpan.</div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className="rounded-xl border shadow-sm transition hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <MapPin size={20} />
                    {address.label}
                  </h2>

                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => deleteAddress(address.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="text-gray-700">
                  <p className="font-medium">{address.receiver}</p>
                  <p className="text-sm">{address.phone}</p>
                </div>

                <p className="text-sm leading-relaxed text-gray-600">
                  {address.fullAddress}
                </p>

                <div className="flex items-center justify-between pt-2">
                  {address.isDefault ? (
                    <span className="text-green-600 flex items-center gap-1 font-medium">
                      <Check size={16} /> Default Address
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDefault(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
