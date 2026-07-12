import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "pg"],
  turbopack: {
    resolveAlias: {
      ".prisma/client/default": "./node_modules/.prisma/client/default.js",
    },
  },
};

export default nextConfig;
