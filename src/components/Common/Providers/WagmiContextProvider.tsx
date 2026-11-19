import { createAppKit } from '@reown/appkit/react'
import { mainnet } from '@reown/appkit/networks'
import React, { useEffect, type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { GetAllSupportAppKitNetwork } from '@/utils/web3'
import { SITE_URL, WALLETCONNECT_PROJECT_ID } from '@/packages/constants'
import { wagmiAdapter } from './WagmiAdapter'

const metadata = {
  name: 'Deshop',
  description: 'Decentralized open source product display and trading platform',
  url: SITE_URL,
  icons: [`/favicon.ico`],
}

export const projectId = WALLETCONNECT_PROJECT_ID
if (!projectId) throw new Error('Project ID is not defined')

export const networks = GetAllSupportAppKitNetwork()
if (!networks) throw new Error('Networks ID is not defined')

declare global {
  var __APPKIT_INITIALIZED__: boolean | undefined
}

function ensureAppKit() {
  if (typeof window === 'undefined') return
  if (globalThis.__APPKIT_INITIALIZED__) return

  createAppKit({
    adapters: [wagmiAdapter],
    projectId: projectId!,
    networks,
    defaultNetwork: mainnet,
    metadata,
    features: {
      analytics: false,
      socials: [],
      email: false,
    },
  })
  globalThis.__APPKIT_INITIALIZED__ = true
}

function WagmiContextProvider({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) {
  useEffect(() => {
    ensureAppKit()
  }, [])

  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      {children}
    </WagmiProvider>
  )
}

export default WagmiContextProvider
