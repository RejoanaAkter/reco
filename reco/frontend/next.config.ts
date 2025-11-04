import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  images: {
    domains: [
    'localhost',
      'encrypted-tbn0.gstatic.com',
      'images.unsplash.com', 
    ],
  },
};


export default nextConfig;
