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

const Home = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>('');

  return (
    <Box p={2}>
      <Box display={'flex'} justifyContent={'right'} gap={1}>
        <Button
          onClick={() => {
            window.location.href = '/payments/transactions';
          }}
          variant="contained"
          color={'success'}
        >
          Create Product
        </Button>
        <Button
          onClick={() => {
            window.location.href = '/payments/transactions';
          }}
          variant="contained"
        >
          Log in
        </Button>
      </Box>

      <Box display={'flex'} justifyContent={'center'} gap={1} mt={10}>
        <TextField
          hiddenLabel
          size="small"
          style={{ width: 400 }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="search for product"
        />
        <Button onClick={() => {}} variant="contained">
          Search
        </Button>
      </Box>

      <Box mt={10}>
        <Typography>Now trending</Typography>
      </Box>
    </Box>
  );
};

export default Home;
