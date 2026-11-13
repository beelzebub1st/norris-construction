import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker image uses standalone; Vercel should use the default output.
  ...(process.env.DOCKER === "1" ? { output: "standalone" as const } : {}),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    unoptimized: process.env.VERCEL === "1",
  },
};

export default nextConfig;
