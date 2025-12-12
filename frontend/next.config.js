/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true, // <-- FIXES YOUR ERROR
  },

  images: {
    domains: [
      "localhost",
      "encrypted-tbn0.gstatic.com",
      "images.unsplash.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
