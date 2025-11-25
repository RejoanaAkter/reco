
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
reactStrictMode: true,
images: {
domains: [
'localhost',
'encrypted-tbn0.gstatic.com',
'images.unsplash.com',
'res.cloudinary.com', // ✅ Add Cloudinary
], }, };

export default nextConfig;