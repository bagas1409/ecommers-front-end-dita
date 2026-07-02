"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useAuth();

  if (status === "loading") return <div className="p-10 text-center">Loading...</div>;

  // Jika belum login atau role bukan customer (fallback jika middleware lolos)
  if (!session?.user || session.user.role?.toLowerCase() !== "customer") {
    return (
      <UnauthorizedLayout
        code="401"
        message="Unauthorized"
        subMessage="Anda harus login sebagai Customer untuk mengakses halaman ini."
      />
    );
  }

  return <main>{children}</main>;
}

function UnauthorizedLayout({
  code,
  message,
  subMessage,
}: {
  code: string;
  message: string;
  subMessage: string;
}) {
  return (
    <div className="flex h-[92vh] w-full items-center justify-center">
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-accent-foreground text-4xl font-bold md:text-9xl">
            {code}
          </h1>
          <p className="text-accent-foreground text-base">{message}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:items-start">
          <h1 className="text-accent-foreground text-2xl font-bold md:text-6xl">
            Oops!
          </h1>
          <p className="text-accent-foreground text-base">{subMessage}</p>
          <Button className="w-fit rounded-full" asChild>
            <a href="/auth/signin">Silahkan Login</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
