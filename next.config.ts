import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Old site URLs observed on expertsnanoplus.com. Harmless if the domain changes.
  async redirects() {
    return [
      { source: "/produits", destination: "/nos-produits", permanent: true },
      { source: "/science", destination: "/technologie-gonano", permanent: true },
      // "Conseils" became the blog.
      { source: "/conseils", destination: "/blogue", permanent: true },
      { source: "/conseils/:slug", destination: "/blogue/:slug", permanent: true },
      { source: "/en/conseils", destination: "/en/blogue", permanent: true },
      { source: "/en/conseils/:slug", destination: "/en/blogue/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
