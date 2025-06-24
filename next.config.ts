import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //  config options here */
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'rare-dotterel-680.convex.cloud',
      pathname: '/api/storage/**',
    },
  ],
},



};

export default nextConfig;
