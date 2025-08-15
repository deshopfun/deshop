import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Providers from 'components/Common/Providers';
import { useSnackPresistStore } from 'lib';

import type { AppProps } from 'next/app';
import { useEffect, Suspense } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

const MyApp = ({ Component, pageProps, cookies }: AppProps & { cookies: string | null }) => {
  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const test = async () => {
    try {
      const response: any = await axios.get(Http.test);
      if (response.result) {
        console.log('Test connection successfully');
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  const init = async () => {
    // await test();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Suspense fallback="loading">
      <Providers cookies={cookies}>
        <Component {...pageProps} />
      </Providers>
    </Suspense>
  );
};

export default MyApp;
