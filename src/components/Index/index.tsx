import { useRouter } from 'next/router';
import { Alert, AlertTitle, Box, IconButton, LinearProgress, Snackbar, Stack, Typography } from '@mui/material';
import { routes, RouteType } from './Routes';
import MetaTags from 'components/Common/MetaTags';
import { useEffect, useState } from 'react';

const Home = () => {
  const router = useRouter();

  const [currentRoute, setCurrentRoute] = useState<RouteType>();

  useEffect(() => {
    const route = routes.find((item) => item.path === router.pathname);

    if (!route) return;

    if (route?.needLogin) {
      window.location.href = '/login';
    }

    setCurrentRoute(route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <Box height={'100%'}>
      <MetaTags title={currentRoute?.title} />

      <Box>{currentRoute?.component || null}</Box>
    </Box>
  );
};

export default Home;
