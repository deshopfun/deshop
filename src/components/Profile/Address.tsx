import { Add } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import UserAddressDialog from 'components/Dialog/UserAddressDialog';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type AddressType = {
  address: string;
  chain_id: number;
  chain_name: string;
  disable_coin: string;
};

type Props = {
  uuid?: string;
  username?: string;
};

const ProfileAddress = (props: Props) => {
  const [username, setUsername] = useState<string>('');
  const [addresses, setAddresses] = useState<AddressType[]>([]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin, getUuid } = useUserPresistStore((state) => state);

  const init = async (username: string) => {
    try {
      if (!username || username === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect username input');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.get(Http.address_by_username, {
        params: {
          username: props.username,
        },
      });

      if (response.result) {
        setAddresses(response.data);
      } else {
        setAddresses([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (props.username) {
      setUsername(props.username);
      init(props.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.username]);

  return (
    <Box>
      <Typography variant="h6">All address</Typography>

      {getIsLogin() && getUuid() === props.uuid ? (
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
