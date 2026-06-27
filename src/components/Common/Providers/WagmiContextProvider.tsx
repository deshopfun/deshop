import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { mainnet } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { GetAllSupportAppKitNetwork } from '@/utils/web3'
import { WALLETCONNECT_PROJECT_ID } from '@/packages/constants'
import { wagmiAdapter } from './WagmiAdapter'
import { Http } from '@/utils/http/http'

const queryClient = new QueryClient()

const metadata = {
  name: 'Deshop',
  description: 'Decentralized Digital Exchange Platform',
  url: Http.httpClient,
  icons: [`${Http.httpClient} + /favicon.ico`],
}

export const projectId = WALLETCONNECT_PROJECT_ID
if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = GetAllSupportAppKitNetwork()
if (!networks) {
  throw new Error('Networks ID is not defined')
}

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: false,
    socials: [],
    email: false,
  },
})

function WagmiContextProvider({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default WagmiContextProvider
