import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  poweredByHeader: false,
  // The homepage is the single-file "performance" design in public/performance.html.
  // beforeFiles lets it take over "/" from the original React page.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/performance.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
  // Old preview addresses now live at "/" — send visitors and links there.
  async redirects() {
    return [
      { source: "/luxury", destination: "/", permanent: true },
      { source: "/performance", destination: "/", permanent: true },
      { source: "/performance.html", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
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
