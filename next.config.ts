
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  images: {
    // Use one optimized image format
    formats: ["image/webp"],

    // Restrict image quality variations
    qualities: [75],
     // Cache optimized images for 30 days
  minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
