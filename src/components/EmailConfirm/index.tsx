import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

const EmailConfirm = () => {
  const router = useRouter();

  const [code, setCode] = useState<string>('');
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const onClickVerify = async () => {
    try {
      if (!code || code === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect code input');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.get(Http.verify_invitation, {
        params: {
          code: code,
        },
      });

      if (response.result) {
        setShowLogin(true);
        setSnackSeverity('success');
        setSnackMessage('Registration successful, please proceed to log in');
        setSnackOpen(true);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Verification failed, please try again');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    const enterCode = router.query.code;
    if (enterCode) {
      setCode(enterCode as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <Box display={'flex'} justifyContent={'center'} mt={2}>
      <Box width={420}>
        <Card>
          <CardContent>
            <Typography variant="h6">Verify email</Typography>
            <Typography mt={2}>Click the button below to complete your registration.</Typography>
            <Box mt={3}>
              <Button size={'large'} variant={'contained'} color={'success'} onClick={onClickVerify} fullWidth>
                Verify
              </Button>
            </Box>

            {showLogin && (
              <Box mt={2}>
                <Button
                  variant={'contained'}
                  size={'large'}
                  fullWidth
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  Go to log in
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EmailConfirm;
