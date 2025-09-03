import { useRouter } from 'next/router';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  LinearProgress,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import RecentViewCard from 'components/Card/RecentViewCard';
import { ChevronRight } from '@mui/icons-material';
import NowTrendingCard from 'components/Card/NowTrendingCard';
import ExploreCard from 'components/Card/ExploreCard';
import IntroCard from 'components/Card/IntroCard';

const Home = () => {
  const router = useRouter();

  return (
    <Container>
      <Box>
        <IntroCard />
      </Box>

      {/* <Box>
        <Box display={'flex'} alignItems={'center'}>
          <Button color={'inherit'}  endIcon={<ChevronRight  />}>
            <Typography variant="h6" >
              Recently viewed
            </Typography>
          </Button>
        </Box>

        <Box mt={2}>
          <RecentViewCard />
        </Box>
      </Box> */}

      <Box mt={4}>
        <Box display={'flex'} alignItems={'center'}>
          <Typography variant="h6" color={'textPrimary'}>
            Now trending
          </Typography>
        </Box>

        <Box mt={2}>
          <NowTrendingCard />
        </Box>
      </Box>

      <Box mt={4}>
        <Box display={'flex'} alignItems={'center'}>
          <Button
            color={'inherit'}
            endIcon={<ChevronRight />}
            onClick={() => {
              window.location.href = '/explore';
            }}
          >
            <Typography variant="h6">Explore</Typography>
          </Button>
        </Box>

        <Box mt={2}>
          <ExploreCard />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
