// src/types/auth.ts
export interface UserPayload {
  id: string; // ini diambil dari user._id.toString()
  role: "admin" | "user";
  email?: string; // opsional, hanya untuk convenience
}
