import { useRouter } from 'next/router';

import { Alert, AlertTitle, Box, IconButton, LinearProgress, Snackbar, Stack, Typography } from '@mui/material';

const Home = () => {
  const router = useRouter();

  return (
    <Box height={'100%'}>
      <Typography>Market</Typography>
    </Box>
  );
};

export default Home;
