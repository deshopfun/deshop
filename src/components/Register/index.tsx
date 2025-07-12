import { Box, Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material';
import { CustomLogo } from 'components/Logo/CustomLogo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isValidPassword, IsValidEmail } from 'utils/verify';
import { useUserPresistStore } from 'lib';

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { getIsLogin } = useUserPresistStore((state) => state);

  const onRegister = async () => {};

  useEffect(() => {
    const enterEmail = router.query.email;
    if (enterEmail) {
      setEmail(enterEmail as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

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
          <CustomLogo style={{ width: 50, height: 50 }}>M</CustomLogo>
          <Typography variant="h5" fontWeight={'bold'} mt={4}>
            Welcome to decentralized cryptocurrency exchange
          </Typography>
          <Typography mt={2}>
            This is a decentralized platform where anyone can list products, anyone can purchase products, and no
            third-party constraints.
          </Typography>

          <Card sx={{ minWidth: 450, mt: 4, padding: 2 }}>
            <CardContent>
              <Typography variant="h5">Create account</Typography>
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
                <Typography>Password</Typography>
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
              <Box mt={3}>
                <Typography>Confirm Password</Typography>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    type={'password'}
                    size="small"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box mt={3}>
                <Button fullWidth variant={'contained'} size={'large'} onClick={onRegister}>
                  Create account
                </Button>
              </Box>

              <Box mt={2} textAlign={'center'}>
                <Button
                  size={'large'}
                  fullWidth
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  Log in
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default Register;
