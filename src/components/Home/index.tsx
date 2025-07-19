import { useRouter } from 'next/router';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
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

const Home = () => {
  const router = useRouter();

  return (
    <Box p={2}>
      <Box>
        <Box display={'flex'} alignItems={'center'}>
          <Typography variant="h6">Recently viewed</Typography>
          <IconButton>
            <ChevronRight />
          </IconButton>
        </Box>

        <Box mt={2}>
          <RecentViewCard />
        </Box>
      </Box>

      <Box mt={4}>
        <Box display={'flex'} alignItems={'center'}>
          <Typography variant="h6">Now tranding</Typography>
          <IconButton>
            <ChevronRight />
          </IconButton>
        </Box>

        <Box mt={2}>
          <NowTrendingCard />
        </Box>
      </Box>

      <Box mt={4}>
        <Box display={'flex'} alignItems={'center'}>
          <Typography variant="h6">Explore</Typography>
          <IconButton>
            <ChevronRight />
          </IconButton>
        </Box>

        <Box mt={2}>
          <ExploreCard />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
