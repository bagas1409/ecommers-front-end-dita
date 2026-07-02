import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3proxy.cdn-zlib.sk",
      },
      {
        protocol: "https",
        hostname: "id.z-library.sk",
      },
      {
        protocol: "https",
        hostname: "covers.zlibcdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**", // Mengizinkan semua path dari localhost:5000 termasuk /api/uploads
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
