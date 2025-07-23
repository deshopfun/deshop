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
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import { IsValidEmail } from 'utils/verify';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [showCode, setShowCode] = useState<boolean>(false);

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsLogin, setIsLogin, setAuth, setUuid } = useUserPresistStore((state) => state);

  const onLogin = async () => {
    try {
      if (!email || email === '' || !IsValidEmail(email)) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect email input');
        setSnackOpen(true);
        return;
      }

      if (showCode) {
        if (!code || code === '') {
          setSnackSeverity('error');
          setSnackMessage('Incorrect code input');
          setSnackOpen(true);
          return;
        }

        const response: any = await axios.post(Http.login_by_code, {
          email: email,
          code: code,
        });
        if (response.result) {
          setAuth(response.data.auth);
          setUuid(response.data.uuid);
          setIsLogin(true);

          window.location.href = '/';
        } else {
          setSnackSeverity('error');
          setSnackMessage('Login failed');
          setSnackOpen(true);
        }
      } else {
        const response: any = await axios.post(Http.login, {
          email: email,
        });
        if (response.result) {
          setShowCode(true);
        } else {
          setSnackSeverity('error');
          setSnackMessage('Cannot get the login code, please check your email');
          setSnackOpen(true);
        }
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    if (getIsLogin()) {
      window.location.href = '/';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Container>
        <Stack alignItems={'center'} mt={8}>
          <CustomLogo style={{ width: 50, height: 50 }}>D</CustomLogo>
          <Typography variant="h5" fontWeight={'bold'} mt={4}>
            Welcome to Deshop
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

              {showCode && (
                <Box mt={3}>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>Code</Typography>
                    <Typography fontWeight={'bold'} color={'warning'} fontSize={14}>
                      The login code has been sent to your email
                    </Typography>
                  </Stack>
                  <Box mt={1}>
                    <TextField
                      fullWidth
                      hiddenLabel
                      type={'text'}
                      size="small"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
                    />
                  </Box>
                </Box>
              )}

              <Box mt={3}>
                <Button fullWidth variant={'contained'} size={'large'} onClick={onLogin}>
                  {showCode ? 'Sign in' : 'Get code'}
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
