import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@app": path.resolve(__dirname, "src/app"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "biosfera25.ru",
      },
      {
        protocol: "http",
        hostname: "130.49.148.45",
        port: "1337",
      },
    ],
  },
};

export default nextConfig;
