"use client";

import LogoutButton from "@/components/ButtonLogout";
import { useAuth as useSession } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading profile...</p>;
  }

  if (!session) {
    return <p>Kamu belum login</p>;
  }

  return (
    <div className="max-w-md rounded-lg border p-6">
      <h1 className="mb-4 text-2xl font-semibold">Profile</h1>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Nama:</span> {session.user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {session.user.email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {session.user.role}
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
