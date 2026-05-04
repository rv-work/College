import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Add this to prevent Webpack from trying to bundle pdf-parse and pdfjs-dist
  serverExternalPackages: ["pdf-parse", "pdfjs-dist"],
};

export default nextConfig;
