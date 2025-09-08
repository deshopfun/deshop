import { Box, Button, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { CURRENCYS } from 'packages/constants/currency';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { ProfileType } from 'utils/types';

const ManageSetting = () => {
  const [user, setUser] = useState<ProfileType>();
  const [currency, setCurrency] = useState<string>('');

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async () => {
    try {
      const response: any = await axios.get(Http.user_setting);
      if (response.result) {
        setUser(response.data);
        setCurrency(response.data.currency);
      } else {
        setUser(undefined);
        setCurrency('');
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Typography variant="h6">Setup user setting</Typography>

      <Box mt={2} width={500}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Avatar</Typography>
          {user?.avatar_url ? (
            <img src={user.avatar_url} alt={'image'} loading="lazy" width={80} height={80} />
          ) : (
            <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={80} height={80} />
          )}
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
          <Typography>Username</Typography>
          <Typography fontWeight={'bold'}>{user?.username}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
          <Typography>Email</Typography>
          <Typography fontWeight={'bold'}>{user?.email}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
          <Typography>Invitation code</Typography>
          <Typography fontWeight={'bold'}>{user?.invitation_code}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
          <Typography>Bio</Typography>
          <Typography fontWeight={'bold'}>{user?.bio}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
          <Typography>Created time</Typography>
          <Typography fontWeight={'bold'}>{new Date(Number(user?.created_time)).toLocaleString()}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1} gap={10}>
          <Typography>Currency</Typography>
          <FormControl hiddenLabel fullWidth>
            <Select
              displayEmpty
              value={currency}
              onChange={(e: any) => {
                setCurrency(e.target.value);
              }}
              size={'small'}
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <em>Choose currency</em>;
                }

                return selected;
              }}
            >
              {CURRENCYS &&
                CURRENCYS.map((item, index) => (
                  <MenuItem value={item.name} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
          <Typography>Currency code</Typography>
          <Typography fontWeight={'bold'}>{CURRENCYS.find((item) => item.name === currency)?.code}</Typography>
        </Stack>
        <Box mt={4}>
          <Button variant={'contained'} color="success" fullWidth>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageSetting;
