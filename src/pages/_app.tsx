import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Providers from 'components/Common/Providers';

import type { AppProps } from 'next/app';
import { useEffect, Suspense } from 'react';

const MyApp = ({ Component, pageProps, cookies }: AppProps & { cookies: string | null }) => {
  return (
    <Suspense fallback="loading">
      <Providers cookies={cookies}>
        <Component {...pageProps} />
      </Providers>
    </Suspense>
  );
};

export default MyApp;
