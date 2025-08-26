import { Badge, Box, Button, FormControl, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import { CustomLogo } from 'components/Logo/CustomLogo';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

const SidebarHeader = () => {
  const [notificationNumber, setNotificationNumber] = useState<number>(0);

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  const init = async () => {
    try {
      if (!getIsLogin()) {
        return;
      }

      const response: any = await axios.get(Http.user_notification);

      if (response.result) {
        if (response.data) {
          const count = response.data.reduce((total: number, item: any) => {
            if (item.is_read && item.is_read === 2) {
              return total + 1;
            }
            return total
          }, 0);
          setNotificationNumber(count);
        } else {
          setNotificationNumber(0);
        }
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
    init();
  }, []);

  return (
    <Box paddingLeft={3} paddingRight={1} paddingY={3} overflow={'hidden'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Button
          style={{ padding: 0 }}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <CustomLogo>D</CustomLogo>
            <Typography fontWeight={'bold'} color="#0098e5" fontSize={'large'}>
              Deshop
            </Typography>
          </Stack>
        </Button>

        {getIsLogin() && (
          <Box>
            <IconButton
              size="small"
              onClick={() => {
                window.location.href = '/notification';
              }}
            >
              <Badge badgeContent={notificationNumber} color="error">
                <NotificationsNoneIcon color="action" />
              </Badge>
            </IconButton>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default SidebarHeader;
