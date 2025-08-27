import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import UserAddressDialog from 'components/Dialog/UserAddressDialog';
import { useSnackPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type AddressType = {
  address_id: number;
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
  kind: number;
  is_default: number;
};

const ManageAddress = () => {
  const [alignment, setAlignment] = useState<'received' | 'delivery'>('received');
  const [handle, setHandle] = useState<number>(0);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [currentAddress, setCurrentAddress] = useState<AddressType>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async (kind: string) => {
    try {
      const response: any = await axios.get(Http.address, {
        params: {
          kind: kind === 'received' ? 1 : 2,
        },
      });

      if (response.result) {
        setAddresses(response.data);
      } else {
        setAddresses([]);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    init('received');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseDialog = async () => {
    setCurrentAddress(undefined);
    await init(alignment);
    setOpenDialog(false);
  };

  const onClickSetDefault = async (id: number, set: number) => {
    try {
      const response: any = await axios.put(Http.address, {
        address_id: id,
        is_default: set,
      });

      if (response.result) {
        await init(alignment);

        setSnackSeverity('success');
        setSnackMessage('Save successfully');
        setSnackOpen(true);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Save Failed');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  const onClickDelete = async (id: number) => {
    try {
      const response: any = await axios.delete(Http.address, {
        params: {
          address_id: id,
        },
      });

      if (response.result) {
        await init(alignment);

        setSnackSeverity('success');
        setSnackMessage('Save successfully');
        setSnackOpen(true);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Save Failed');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  return (
    <Box>
      <Typography variant="h6">All addresses</Typography>

      <Box mt={2}>
        <ToggleButtonGroup
          fullWidth
          exclusive
          color="primary"
          value={alignment}
          onChange={async (e: any) => {
            setAlignment(e.target.value);
            await init(e.target.value);
          }}
        >
          <ToggleButton value={'received'}>Received</ToggleButton>
          <ToggleButton value={'delivery'}>Delivery</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box mt={2}>
        {addresses &&
          addresses.length > 0 &&
          addresses.map((item, index) => (
            <Box key={index} mb={4}>
              <Card>
                <CardContent>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>{`${item.first_name} ${item.last_name} , ${item.phone}`}</Typography>
                    <IconButton
                      onClick={() => {
                        onClickDelete(item.address_id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                  <Typography>{`${item.country} ${item.province} ${item.address_one}`}</Typography>
                  <Box py={2}>
                    <Divider />
                  </Box>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    {item.is_default === 1 ? (
                      <Button
                        variant={'contained'}
                        color={'success'}
                        onClick={() => {
                          onClickSetDefault(item.address_id, 2);
                        }}
                      >
                        Default
                      </Button>
                    ) : (
                      <Button
                        variant={'contained'}
                        color={'success'}
                        onClick={() => {
                          onClickSetDefault(item.address_id, 1);
                        }}
                      >
                        Set as default
                      </Button>
                    )}
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <Button
                        variant={'contained'}
                        color={'inherit'}
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            `${item.first_name} ${item.last_name} ${item.phone} ${item.country} ${item.province} ${item.address_one}`,
                          );

                          setSnackMessage('Copy successfully');
                          setSnackSeverity('success');
                          setSnackOpen(true);
                        }}
                      >
                        Copy
                      </Button>
                      <Button
                        variant={'contained'}
                        onClick={() => {
                          setCurrentAddress(item);
                          setHandle(2);
                          setOpenDialog(true);
                        }}
                      >
                        Edit
                      </Button>
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

        <UserAddressDialog
          handle={handle}
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          addressId={currentAddress?.address_id}
          firstName={currentAddress?.first_name}
          lastName={currentAddress?.last_name}
          company={currentAddress?.company}
          addressOne={currentAddress?.address_one}
          addressTwo={currentAddress?.address_two}
          email={currentAddress?.email}
          phone={currentAddress?.phone}
          country={currentAddress?.country}
          city={currentAddress?.city}
          province={currentAddress?.province}
          zip={currentAddress?.zip}
          kind={alignment === 'received' ? 1 : 2}
        />
      </Box>
    </Box>
  );
};

export default ManageAddress;
