"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken, UserPayload } from "@/lib/jwt";

type SessionContextType = {
  user: UserPayload | null;
  setUser: (user: UserPayload | null) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      const decoded = decodeToken(token);

      // cek apakah token expired
      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        console.warn("Token expired");
        setUser(null);
        return;
      }

      setUser(decoded);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useCustomSession() {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error(
      "useCustomSession must be used inside CustomSessionProvider",
    );
  return context;
}
