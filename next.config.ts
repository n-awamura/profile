import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静的エクスポートを有効化
  images: {
    unoptimized: true, // GitHub Pagesでは画像最適化が使えないため
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unii-research.com",
      },
    ],
  },
  // カスタムドメイン (n-awamura.com) を使用するため、basePath と assetPrefix は不要
};

export default nextConfig;
