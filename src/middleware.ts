import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper untuk decode JWT di Edge Runtime (aman & zero-dependency)
function decodeJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  console.log(`[Middleware] Path: ${pathname}, HasToken: ${!!token}`);

  // Jika tidak ada token (belum login)
  if (!token) {
    console.log(`[Middleware] Redirecting to /auth/signin: Token missing`);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    // Decode token untuk mendapatkan role
    const decoded = decodeJwt(token);

    if (!decoded) {
      console.log(`[Middleware] Redirecting to /auth/signin: Decode failed`);
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    console.log(`[Middleware] Decoded user:`, decoded);

    // Proteksi route /admin hanya untuk role ADMIN
    if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
      console.log(`[Middleware] Redirecting to /customer/dashboard: User is not ADMIN`);
      return NextResponse.redirect(new URL("/customer/dashboard", req.url));
    }

  } catch (err: any) {
    console.log(`[Middleware] Redirecting to /auth/signin: Error`, err?.message || err);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  console.log(`[Middleware] Allowing request to ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/customer/:path*",
  ],
};
