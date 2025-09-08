import { useRouter } from 'next/router';
import { Alert, AlertTitle, Box, IconButton, LinearProgress, Snackbar, Stack, Typography } from '@mui/material';
import { routes } from './Routes';
import MetaTags from 'components/Common/MetaTags';
import { useEffect, useState } from 'react';
import HomeSidebar from 'components/Sidebar';
import HomeHeader from 'components/Home/HomeHeader';
import { useSnackPresistStore } from 'lib';
import HomeFooter from 'components/Home/HomeFooter';
import { RouteType } from 'utils/types';

const Home = () => {
  const router = useRouter();

  const { snackOpen, snackMessage, snackSeverity, setSnackOpen } = useSnackPresistStore((state) => state);
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

            {currentRoute?.enableHomeHeader && <HomeHeader />}

            <Box mt={10}>{currentRoute?.component || null}</Box>

            {currentRoute?.enableHomeFooter && (
              <Box mt={10}>
                <HomeFooter />
              </Box>
            )}
          </Box>
        </Stack>
      ) : (
        <Box>
          {currentRoute?.component || null}

          {currentRoute?.enableHomeFooter && (
            <Box mt={10}>
              <HomeFooter />
            </Box>
          )}
        </Box>
      )}

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={snackOpen}>
        <Alert
          onClose={() => {
            setSnackOpen(false);
          }}
          severity={snackSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
