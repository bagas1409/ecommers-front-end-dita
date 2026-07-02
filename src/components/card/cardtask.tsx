"use client";

import {
  Clock,
  FileUp,
  CheckCircle2,
  AlertTriangle,
  MessageCircleWarning,
} from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";

export default function CardTask() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Gagal memuat data</p>;

  return (
    <div className="grid grid-cols-4 gap-4 text-xl">
      <div className="bg-sidebar text-accent-foreground col-span-4 flex flex-col rounded-lg p-4 shadow">
        <div className="flex w-full flex-row">
          <div className="flex w-1/3 flex-col pr-4">
            <div className="flex w-full flex-row justify-between">
              <h2 className="font-bold">Laporan</h2>
              <FileUp size={50} />
            </div>
            <p>Total </p>
            <p className="mt-1 w-full text-6xl font-bold">
              {data?.laporan.total}
            </p>
          </div>
          <div className="flex w-2/3 flex-row gap-4">
            <div className="text-accent-foreground bg-accent d w-full rounded-lg p-4 shadow">
              <div className="flex w-full flex-row justify-between">
                <h2 className="font-bold">Belum Dibaca</h2>
                <MessageCircleWarning size={30} />
              </div>

              <p className="mt-1 w-full text-4xl font-bold">
                {data?.laporan.unread}
              </p>
            </div>
            <div className="text-accent-foreground bg-accent w-full rounded-lg p-4 shadow">
              <div className="flex w-full flex-row justify-between">
                <h2 className="font-bold">Dalam Proses</h2> <Clock size={30} />
              </div>

              <p className="mt-1 w-full text-4xl font-bold">
                {data?.laporan.pending}
              </p>
            </div>
            <div className="text-accent-foreground bg-accent w-full rounded-lg p-4 shadow">
              <div className="flex w-full flex-row justify-between">
                <h2 className="font-bold">Selesai</h2>
                <CheckCircle2 size={30} />
              </div>

              <p className="mt-1 w-full text-4xl font-bold">
                {data?.laporan.done}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-accent-foreground bg-sidebar col-span-2 rounded-lg p-4 shadow">
        <h2 className="font-bold">Berita</h2>
        <p className="mt-1 w-full text-6xl font-bold">{data?.berita.total}</p>
      </div>

      <div className="bg-sidebar text-accent-foreground col-span-2 rounded-lg p-4 shadow">
        <h2 className="font-bold">Postingan</h2>
        <p className="mt-1 w-full text-6xl font-bold">
          {data?.postingan.total}
        </p>
      </div>
    </div>
  );
}
