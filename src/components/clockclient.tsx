// components/ClockClient.tsx (Client Component)
"use client";
import { useClock } from "@/hooks/useClock";

export default function ClockClient({ serverTime }: { serverTime: string }) {
  const now = new Date().toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex w-fit justify-end-safe">
      <p className="text-accent-foreground p-2 text-sm font-semibold">
        {now} {"  "}
      </p>
    </div>
  );
}
