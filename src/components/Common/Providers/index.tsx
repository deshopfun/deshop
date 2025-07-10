import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import ErrorBoundary from '../ErrorBoundary';

const Providers = ({ children, cookies }: { children: ReactNode; cookies: string | null }) => {
  return (
    <ErrorBoundary>
      {/* <Web3Provider cookies={cookies}> */}
      <CssBaseline />
      {children}
      {/* </Web3Provider> */}
    </ErrorBoundary>
  );
};

export default Providers;
