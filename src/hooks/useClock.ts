// src/hooks/useClock.ts
"use client";
import { useEffect, useState } from "react";

export function useClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // update setiap 1 detik
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return time;
}
