"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
  const { signOut } = useAuth();

  return (
    <button
      onClick={() => signOut()}
      className="rounded bg-red-500 px-4 py-2 text-white"
    >
      Logout
    </button>
  );
}
