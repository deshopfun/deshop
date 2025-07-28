import { Add, Delete } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Divider, IconButton, Stack, Typography } from '@mui/material';
import UserAddressDialog from 'components/Dialog/UserAddressDialog';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type AddressType = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  company: string;
  country: string;
  country_code: string;
  country_name: string;
  city: string;
  province: string;
  province_code: string;
  address_one: string;
  address_two: string;
  zip: string;
  is_default: number;
};

type Props = {
  uuid?: string;
  username?: string;
};

const ProfileAddress = (props: Props) => {
  const [handle, setHandle] = useState<number>(0);
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

  const handleCloseDialog = async () => {
    await init(username);
    setOpenDialog(false);
  };

  return (
    <Box>
      <Typography variant="h6">All address</Typography>

      {getIsLogin() && getUuid() === props.uuid ? (
        <Box mt={2}>
          {addresses &&
            addresses.length > 0 &&
            addresses.map((item, index) => (
              <Box key={index} mb={4}>
                <Card>
                  <CardContent>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>{`${item.first_name} ${item.last_name} , ${item.phone}`}</Typography>
                      <IconButton onClick={() => {}}>
                        <Delete />
                      </IconButton>
                    </Stack>
                    <Typography>{`${item.country} ${item.province} ${item.address_one}`}</Typography>
                    <Box py={2}>
                      <Divider />
                    </Box>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Button variant={'contained'} onClick={() => {}}>
                        Set as default
                      </Button>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Button variant={'contained'}>Copy</Button>
                        <Button variant={'contained'}>Edit</Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}

          <Button
            variant={'contained'}
            fullWidth
            startIcon={<Add />}
            onClick={() => {
              setHandle(1);
              setOpenDialog(true);
            }}
          >
            Add new shipping address
          </Button>

          <UserAddressDialog handle={handle} openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
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
