import { Box, Button, Stack, Switch, Typography } from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { NOTIFICATION, NOTIFICATIONS } from 'packages/constants/notification';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

const ManageNotification = () => {
  const [notification, setNotification] = useState<string>('');

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async () => {
    try {
      const response: any = await axios.get(Http.user_notification_setting);

      if (response.result) {
        setNotification(response.data.notification);
      } else {
        setNotification('');
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

  const onChangeNotification = async (id: number) => {
    try {
      let notificationArray = notification.split(',').filter((item) => item !== '');
      let newNotifiction = '';
      if (id !== 0) {
        if (notificationArray.includes(String(id))) {
          newNotifiction = notificationArray.filter((item) => item !== String(id)).join(',');
        } else {
          notificationArray.push(String(id));
          newNotifiction = notificationArray.join(',');
        }
      }

      const response: any = await axios.put(Http.user_notification_setting, {
        notification: newNotifiction,
      });

      if (response.result) {
        await init();

        setSnackSeverity('success');
        setSnackMessage('Update successfully');
        setSnackOpen(true);
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

  return (
    <Box>
      <Typography variant="h6">Setup notification</Typography>
      <Box>
        <Box mt={2}>
          {NOTIFICATIONS &&
            NOTIFICATIONS.map((item: NOTIFICATION, index) => (
              <Stack direction={'row'} alignItems={'center'} key={index}>
                <Switch
                  checked={notification.split(',').includes(String(item.id)) ? true : false}
                  onChange={() => {
                    onChangeNotification(item.id);
                  }}
                />
                <Typography ml={2}>{item.title}</Typography>
              </Stack>
            ))}
        </Box>
        <Box mt={4}>
          <Button
            variant={'contained'}
            onClick={() => {
              onChangeNotification(0);
            }}
            color={'error'}
          >
            Disable all notifications
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageNotification;
