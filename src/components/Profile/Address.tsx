import { Add } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import UserAddressDialog from 'components/Dialog/UserAddressDialog';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useState } from 'react';

type Props = {
  uuid?: string;
  username?: string;
};

const ProfileAddress = (props: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  return (
    <Box>
      <Typography variant="h6">All address</Typography>

      {getIsLogin() ? (
        <Box mt={2}>
          <Button
            variant={'contained'}
            fullWidth
            startIcon={<Add />}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Add new shipping address
          </Button>

          <UserAddressDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </Box>
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

export default ProfileAddress;
