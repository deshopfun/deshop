import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // allowedDevOrigins: ['127.0.0.1'],
  serverExternalPackages: [
    '@walletconnect/logger',
    '@walletconnect/universal-provider',
    '@walletconnect/core',
    '@walletconnect/sign-client',
    '@reown/appkit',
    '@reown/appkit-wagmi-adapter',
  ],
}

export default nextConfig
