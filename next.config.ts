import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静的エクスポートを有効化
  basePath: "/profile", // GitHub Pages: n-awamura.github.io/profile
  assetPrefix: "/profile/", // GitHub Pages: n-awamura.github.io/profile
  images: {
    unoptimized: true, // GitHub Pagesでは画像最適化が使えないため
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unii-research.com",
      },
    ],
  },
};

export default nextConfig;
