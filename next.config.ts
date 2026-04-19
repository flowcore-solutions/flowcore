import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "flowcore-site.vercel.app",
          },
        ],
        destination: "https://flowcoresolutions.in/:path*",
        permanent: true,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 100],

    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;