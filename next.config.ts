import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable modern image formats — Next.js will serve WebP/AVIF to supported browsers
    formats: ["image/avif", "image/webp"],
    // Responsive breakpoints for srcset generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Reduce cache TTL for local dev, increase in prod if needed
    minimumCacheTTL: 31536000, // 1 year
  },
};

export default nextConfig;
