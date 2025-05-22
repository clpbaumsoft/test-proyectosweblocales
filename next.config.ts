import type { NextConfig } from "next";


import { validateEnv } from "@/utils";

validateEnv()

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: ['./src'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8002',
        pathname: '/medias/**',
        search: '',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
