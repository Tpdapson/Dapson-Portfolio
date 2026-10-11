import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF first (smallest), WebP as the fallback; each sized to the screen.
    formats: ["image/avif", "image/webp"],
    // 75 for photos, 90 for UI screenshots so small text stays crisp.
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 365,
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
