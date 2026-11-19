import '@/styles/globals.css'
import '@/styles/index.css'
import '@/styles/theme.config.css'
import Providers from '@/components/Common/Providers'

import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { Suspense } from 'react'

type DeshopAppProps = AppProps & { cookies: string | null }

const MyApp = ({ Component, pageProps, cookies }: DeshopAppProps) => {
  return (
    <Suspense fallback="loading">
      <Providers cookies={cookies}>
        <Component {...pageProps} />
      </Providers>
    </Suspense>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const cookies = appContext.ctx.req?.headers.cookie ?? null
  return { ...appProps, cookies }
}

export default MyApp
