
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [];
  },
  webSocketTimeout: 1000000,
  experimental: {
    serverActions: true,
  }
};

module.exports = {
  ...nextConfig,
  async headers() {
    return [];
  },
  webpack: (config) => {
    return config;
  },
  images: {
    unoptimized: true,
  }
};
