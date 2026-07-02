"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useAuth() {
  const [session, setSession] = useState<{ user: any } | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setStatus("unauthenticated");
      return;
    }

    api.get("/auth/me")
      .then(res => {
        if (res.data.success) {
          setSession({ user: res.data.data });
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setStatus("unauthenticated");
      });
  }, []);

  const signOut = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      // Abaikan error saat logout
    } finally {
      localStorage.removeItem("accessToken");
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      window.location.href = "/auth/signin";
    }
  };

  return { data: session, status, signOut };
}
