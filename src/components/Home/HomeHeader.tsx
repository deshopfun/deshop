import { Box, Button, Typography } from '@mui/material';

const HomeHeader = () => {
  return (
    <Box p={2}>
      <Box display={'flex'} justifyContent={'right'} gap={1}>
        <Button
          onClick={() => {
            window.location.href = '/create';
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
    </Box>
  );
};

export default HomeHeader;
