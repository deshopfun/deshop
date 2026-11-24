import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  serverExternalPackages: ['@walletconnect/logger'],
  output: 'standalone',
  images: {
    // Next 16 blocks optimizing images that resolve to private IPs (SSRF guard).
    // Local deshopserver assets are on 127.0.0.1:8899, so allow in development only.
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.deshop.space',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8899',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8899',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
