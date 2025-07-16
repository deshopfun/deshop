import { Box, Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material';
import { CustomLogo } from 'components/Logo/CustomLogo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IsValidEmail } from 'utils/verify';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import RegisterDialog from 'components/Dialog/RegisterDialog';

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  const onRegister = async () => {
    try {
      if (!email || email === '' || !IsValidEmail(email)) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect email input');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.post(Http.register, {
        email: email,
      });
      if (response.result) {
        setOpen(true);
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message);
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

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
          <CustomLogo style={{ width: 50, height: 50 }}>D</CustomLogo>
          <Typography variant="h5" fontWeight={'bold'} mt={4}>
            Welcome to Deshop
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

      <RegisterDialog openDialog={open} setOpenDialog={setOpen} email={email} />
    </Box>
  );
};

export default Register;
