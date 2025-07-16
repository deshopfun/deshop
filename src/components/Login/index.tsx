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
import { useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import { IsValidEmail, isValidPassword } from 'utils/verify';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [showCode, setShowCode] = useState<boolean>(false);

  const { getIsLogin, setUserId, setUserEmail, setUsername, setIsLogin } = useUserPresistStore((state) => state);

  const onLogin = () => {
    
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

              {showCode && (
                <Box mt={3}>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>Code</Typography>
                  </Stack>
                  <Box mt={1}>
                    <TextField
                      fullWidth
                      hiddenLabel
                      type={'password'}
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
