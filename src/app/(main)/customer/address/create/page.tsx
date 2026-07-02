"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function AddAddressPage() {
  const router = useRouter();

  const [label, setLabel] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fullAddress, setFullAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    const newAddress = {
      label,
      receiver,
      phone,
      fullAddress,
      city,
      province,
      postalCode,
      isDefault,
    };

    try {
      const res = await api.post("/addresses", newAddress);
      if (res.data.success) {
        toast.success("Alamat berhasil ditambahkan!");
        router.push("/customer/address");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal menyimpan alamat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Card className="rounded-xl shadow-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Add New Address</h1>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Label */}
          <div className="space-y-2">
            <Label>Address Label</Label>
            <Input
              placeholder="Contoh: Rumah / Kantor"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          {/* Receiver */}
          <div className="space-y-2">
            <Label>Receiver Name</Label>
            <Input
              placeholder="Nama penerima"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Full Address */}
          <div className="space-y-2">
            <Label>Full Address</Label>
            <Textarea
              placeholder="Jl. Melati No. 24, Kelurahan Mawar, Kecamatan Sukajadi"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              className="h-28"
            />
          </div>

          {/* Province */}
          <div className="space-y-2">
            <Label>Province</Label>
            <Input
              placeholder="Jawa Barat / DKI Jakarta"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              placeholder="Bandung / Jakarta / Surabaya"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <Label>Postal Code</Label>
            <Input
              placeholder="40123"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          {/* Default Address */}
          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              checked={isDefault}
              onCheckedChange={(val) => setIsDefault(Boolean(val))}
            />
            <Label>Set as default address</Label>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => router.push("/customer/address")} disabled={loading}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Address"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
