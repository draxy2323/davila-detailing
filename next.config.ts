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
  // The site's pages are static HTML files in public/, built from the "performance" design.
  // beforeFiles maps the clean URLs onto them.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/performance.html" },
        { source: "/services", destination: "/services.html" },
        { source: "/gallery", destination: "/gallery.html" },
        { source: "/about", destination: "/about.html" },
        { source: "/book", destination: "/book.html" },
      ],
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
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/gallery.html", destination: "/gallery", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/book.html", destination: "/book", permanent: true },
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
