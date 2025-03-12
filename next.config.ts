import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  basePath: process.env.PAGES_BASE_PATH,
  distDir: "build",
  output: "export"
};

export default nextConfig;
