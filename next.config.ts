import type { NextConfig } from "next";
import { CUSTOM_HEADER } from "./src/constants";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.bjak.my"],
  },

  rewrites: async () => {
    return {
      fallback: [
        {
          source: "/:path*",
          missing: [{ type: "header", key: CUSTOM_HEADER, value: "true" }],
          destination: "https://web.dev.bjak.my/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
