import { Box, Container, Stack, Typography } from '@mui/material';

const Blockchain = () => {
  return (
    <Container>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h6" mb={4}>
          Blockchain
        </Typography>
      </Stack>
    </Container>
  );
};

export default Blockchain;
