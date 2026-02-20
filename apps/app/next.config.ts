import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@dex/ui", "@dex/theme"],
};

export default nextConfig;
