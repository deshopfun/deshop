import { ReactNode, useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from '../ErrorBoundary'
import Web3Provider from './Web3Provider'
import { createAppQueryClient } from '@/lib/queryClient'

const Providers = ({ children, cookies }: { children: ReactNode; cookies: string | null }) => {
  const [queryClient] = useState(() => createAppQueryClient())

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Web3Provider cookies={cookies}>{children}</Web3Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default Providers
