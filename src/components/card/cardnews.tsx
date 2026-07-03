"use client";

type ObjectId = string;
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuth as useSession } from "@/hooks/useAuth";

export type CardNewsProps = {
  gambarType: string | undefined;
  _id: ObjectId;
  judul: string;
  penulis: string;
  isi: string;
  gambar?: string;
};

export function CardNews({ _id, judul, penulis, isi, gambar }: CardNewsProps) {
  const { data: session } = useSession();
  return (
    <div className="bg-sidebar flex flex-col rounded-2xl">
      <div className="flex h-fit w-full flex-col gap-4 p-4 md:flex-row">
        <div className="flex max-h-50 w-full min-w-50 flex-none flex-row overflow-hidden rounded-2xl md:w-1/5 md:max-w-60">
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
        <div className="flex w-full flex-1 flex-col md:w-4/5">
          <h1 className="text-accent-foreground mb-2 h-fit max-h-20 w-auto truncate text-lg font-bold text-pretty md:text-2xl md:text-balance">
            {judul}
          </h1>
          <p className="text-accent-foreground mb-2 text-xs">
            Penulis • {penulis}
          </p>
          <div className="flex h-fit flex-col gap-4">
            <p className="text-accent-foreground h-20 w-full truncate text-xs text-pretty text-ellipsis md:text-balance">
              {isi}
            </p>
            <Link href={`/${session?.user?.role}/news/${_id}`}>
              <Button variant="outline" className="h-full w-full">
                Baca berita
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
