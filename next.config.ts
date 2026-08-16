import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security-headers";

function lanDevOrigins(): string[] {
  const hosts = new Set(["127.0.0.1", "localhost"]);
  for (const addrs of Object.values(networkInterfaces())) {
    for (const addr of addrs ?? []) {
      if (addr.family === "IPv4" && !addr.internal) {
        hosts.add(addr.address);
      }
    }
  }
  return [...hosts];
}

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  allowedDevOrigins: lanDevOrigins(),
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      { pathname: "/photos/**", search: "" },
      { pathname: "/brand/**", search: "" },
      { pathname: "/og.png", search: "" },
      { pathname: "/icon.png", search: "" },
      { pathname: "/apple-icon.png", search: "" },
      { pathname: "/favicon.ico", search: "" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders(),
      },
    ];
  },
};

export default nextConfig;
