import type { NextConfig } from 'next'

// Replace GLOBAL_VERCEL_URL with your actual ivara-global.vercel.app URL after deploying
const GLOBAL_LANDING_URL = process.env.GLOBAL_LANDING_URL || 'https://ivara-global.vercel.app'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  typedRoutes: false,
  async rewrites() {
    return [
      {
        source: '/us',
        destination: `${GLOBAL_LANDING_URL}/`,
      },
      {
        source: '/us/:path*',
        destination: `${GLOBAL_LANDING_URL}/:path*`,
      },
    ]
  },
}

export default nextConfig
