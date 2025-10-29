import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    typescript: {
    ignoreBuildErrors: true, // ← Добавь эту строку
  },
  eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
