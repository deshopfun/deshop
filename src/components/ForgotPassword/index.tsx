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
import { IsValidEmail } from 'utils/verify';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');

  const { getIsLogin } = useUserPresistStore((state) => state);

  const onResetPassword = async () => {};

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

          <Card sx={{ minWidth: 450, mt: 4, padding: 2 }}>
            <CardContent>
              <Typography variant="h5">Forgot Password</Typography>
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
                <Button fullWidth variant={'contained'} size={'large'} onClick={onResetPassword}>
                  Send reset email
                </Button>
              </Box>
              <Box mt={2}>
                <Button
                  fullWidth
                  size={'large'}
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  Return to Login
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
