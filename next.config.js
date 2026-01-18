/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Specified when deploying to a subdirectory like GitHub Pages
  // Example: /issuehub
  basePath: process.env.BASE_PATH || '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;