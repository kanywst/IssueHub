import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Set when deploying under a subpath (e.g. GitHub Pages: /IssueHub).
  basePath: process.env.BASE_PATH || '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
