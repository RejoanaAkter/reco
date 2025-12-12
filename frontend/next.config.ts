
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
images: {
domains: [
'localhost',
'encrypted-tbn0.gstatic.com',
'images.unsplash.com',
'res.cloudinary.com',
], }, };

export default nextConfig;