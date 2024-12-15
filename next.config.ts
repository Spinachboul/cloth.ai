import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    domains: [
      "amazon.com",
      "flipkart.com",
      "ebay.com"
    ]
  },

  webpack : (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false
    };
  }
};

export default nextConfig;
