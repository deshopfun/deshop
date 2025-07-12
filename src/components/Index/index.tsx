import { useRouter } from 'next/router';
import { Alert, AlertTitle, Box, IconButton, LinearProgress, Snackbar, Stack, Typography } from '@mui/material';
import { routes, RouteType } from './Routes';
import MetaTags from 'components/Common/MetaTags';
import { useEffect, useState } from 'react';
import HomeSidebar from 'components/Sidebar';

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

      {currentRoute?.enableSidebar ? (
        <Stack direction={'row'} height={'100%'}>
          <HomeSidebar />

          <Box width={'100%'}>
            {/* {getShowProgress() ? <LinearProgress /> : null} */}

            <Box>{currentRoute?.component || null}</Box>
          </Box>
        </Stack>
      ) : (
        <Box>
          {currentRoute?.component || null}

          {/* {currentRoute?.enableInnerFooter && (
            <Box>
              <Footer />
            </Box>
          )} */}
        </Box>
      )}
    </Box>
  );
};

export default Home;
