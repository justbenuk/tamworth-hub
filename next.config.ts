import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: [
          {
            loader: "@tailwindcss/turbopack",
            options: { base: path.join(process.cwd(), "src") },
          },
        ],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
