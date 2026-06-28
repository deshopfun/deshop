import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // allowedDevOrigins: ['127.0.0.1'],
  serverExternalPackages: ['@walletconnect/logger'],
  output: 'standalone',
}

export default nextConfig
