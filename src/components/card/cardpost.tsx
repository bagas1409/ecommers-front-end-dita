type ObjectId = string;
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuth as useSession } from "@/hooks/useAuth";

export type CardPostProps = {
  _id: ObjectId;
  penulis: string;
  isi: string;
  gambar?: string;
};

export function CardPost({ _id, penulis, isi, gambar }: CardPostProps) {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <Link href={`/${user?.role}/post/${_id}`}>
      <div className="bg-background flex flex-col rounded-2xl">
        <div className="flex h-fit w-full flex-col gap-4 p-4">
          <div className="">
            <p className="text-accent-foreground mb-2 text-xs">
              Penulis • {penulis}
            </p>
            <div className="flex h-fit flex-col gap-4">
              <p className="text-accent-foreground h-20 w-full truncate text-xs text-pretty text-ellipsis md:text-balance">
                {isi}
              </p>
            </div>
          </div>
          <div className="flex max-h-100 w-full min-w-50 flex-col overflow-hidden rounded-2xl">
            {gambar ? (
              <Image
                src={gambar}
                alt={`_id`}
                width={240}
                height={128}
                className="h-full w-full flex-shrink-0 rounded-lg object-cover"
                priority={false}
              />
            ) : (
              <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
                <span className="text-muted-foreground text-sm">No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
