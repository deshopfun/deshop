import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CustomLogo } from 'components/Logo/CustomLogo';
import { useEffect, useState } from 'react';
import { IsValidEmail, isValidPassword } from 'utils/verify';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLogin = () => {};

  return (
    <Box>
      <Container>
        <Stack alignItems={'center'} mt={8}>
          <CustomLogo style={{ width: 50, height: 50 }}>M</CustomLogo>
          <Typography variant="h5" fontWeight={'bold'} mt={4}>
            Welcome to decentralized cryptocurrency exchange
          </Typography>

          <Card sx={{ minWidth: 450, mt: 4, padding: 2 }}>
            <CardContent>
              <Typography variant="h5">Sign in</Typography>
              <Box mt={3}>
                <Typography>Email</Typography>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    size="small"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box mt={3}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography>Password</Typography>
                  <Button
                    onClick={() => {
                      window.location.href = '/forgot-password';
                    }}
                  >
                    Forgot password?
                  </Button>
                </Stack>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    type={'password'}
                    size="small"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              {/* <Box mt={3}>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </Box> */}

              <Box mt={3}>
                <Button fullWidth variant={'contained'} size={'large'} onClick={onLogin}>
                  Sign in
                </Button>
              </Box>

              <Box mt={2} textAlign={'center'}>
                <Button
                  size={'large'}
                  fullWidth
                  onClick={() => {
                    window.location.href = '/register';
                  }}
                >
                  Create your account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
