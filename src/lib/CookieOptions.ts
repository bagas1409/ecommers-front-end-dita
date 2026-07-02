export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // harus sama dengan logout
  path: "/",
  sameSite: "strict" as const, // harus sama dengan logout
};
