"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuth as useSession } from "@/hooks/useAuth";
import { useState } from "react";

export type CardReportProps = {
  _id: string;
  role: string;
  judul: string;
  penulis: string;
  deskripsi: string;
  isi: string;
  gambar?: string | null;
  lokasi: string;
  gmapsLink: string;
  status?: string; // tambahkan status
};

export function CardReport({
  _id,
  judul,
  penulis,
  isi,
  gambar,
  gmapsLink,
  status = "belum_dibaca",
}: CardReportProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const [currentStatus, setCurrentStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(newStatus: string) {
    try {
      setLoading(true);
      const res = await fetch(`/api/report/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        console.error("Gagal update status");
        return;
      }

      const data = await res.json();
      setCurrentStatus(data.status);
      console.log("Status berhasil diubah:", data);
    } catch (err) {
      console.error("Error update status:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-sidebar flex flex-col rounded-2xl shadow-sm">
      <div className="flex h-fit w-full flex-col gap-4 p-4 md:flex-row">
        {/* Thumbnail / Image */}
        <div className="flex max-h-50 w-full min-w-50 flex-none overflow-hidden rounded-2xl md:w-1/5 md:max-w-60">
          {gambar ? (
            <Image
              src={gambar}
              alt={judul}
              width={240}
              height={128}
              className="h-full w-full flex-shrink-0 rounded-lg object-cover"
              priority={false}
              unoptimized
            />
          ) : (
            <div className="bg-muted hidden h-full w-full items-center justify-center rounded-lg md:flex">
              <span className="text-muted-foreground text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Konten */}
        <div className="flex w-full flex-1 flex-col md:w-4/5">
          <h1 className="text-accent-foreground mb-2 line-clamp-2 text-lg font-bold md:text-2xl">
            {judul}
          </h1>
          <p className="text-accent-foreground mb-2 text-xs">
            Penulis • {penulis}
          </p>

          <div className="mb-2 flex w-full flex-row gap-4 text-sm">
            <p className="text-base font-medium">
              Cek lokasi{" "}
              <Link
                href={gmapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                klik di sini
              </Link>
            </p>
          </div>

          {/* Dropdown Status */}
          <div className="mb-3">
            <label className="mr-2 text-sm font-medium">Status:</label>
            <select
              value={currentStatus}
              disabled={loading}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="rounded-md border px-2 py-1 text-sm"
            >
              <option value="belum dibaca">Belum Dibaca</option>
              <option value="dalam proses">Proses</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>

          <div className="flex h-fit flex-col gap-4">
            <p className="text-accent-foreground line-clamp-3 text-sm">{isi}</p>
            <Link href={`/${user?.role}/report/${_id}`}>
              <Button variant="outline" className="w-full">
                Baca berita
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
