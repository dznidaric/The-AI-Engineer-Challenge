/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // In production, API calls go to the same domain (handled by Vercel routing)
  // In development, use the local backend URL
  async rewrites() {
    // Only rewrite in development
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: process.env.NEXT_PUBLIC_API_URL 
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
            : 'http://localhost:8000/api/:path*',
        },
      ];
    }
    // In production, Vercel routing handles /api/* -> backend
    return [];
  },
};

module.exports = nextConfig;
