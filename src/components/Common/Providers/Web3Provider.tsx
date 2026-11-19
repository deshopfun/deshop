import { type ReactNode } from 'react'
import WagmiContextProvider from './WagmiContextProvider'

const Web3Provider = ({ children, cookies }: { children: ReactNode; cookies: string | null }) => {
  return <WagmiContextProvider cookies={cookies}>{children}</WagmiContextProvider>
}

export default Web3Provider
