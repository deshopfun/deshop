import { Box, Card, CardContent, Typography } from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';

type Props = {};

const ProfileWallet = (props: Props) => {
  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  return (
    <Box>
      <Typography>Wallet</Typography>

      {getIsLogin() ? (
        <></>
      ) : (
        <Box mt={2}>
          <Card>
            <CardContent>
              <Typography>Not found</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default ProfileWallet;
