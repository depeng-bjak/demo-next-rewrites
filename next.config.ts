import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.bjak.my"],
  },

  rewrites: async () => {
    return [
      {
        source: "/:path*",
        destination: "https://bjak.my/:path*",
      },
    ];
  },
};

export default nextConfig;
