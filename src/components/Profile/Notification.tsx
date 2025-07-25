import { Box, Button, Card, CardContent, Stack, Switch, Typography } from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { NOTIFICATION, NOTIFICATIONS } from 'packages/constants/notification';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type Props = {
  uuid?: string;
  username?: string;
};

const ProfileNotification = (props: Props) => {
  const [username, setUsername] = useState<string>('');
  const [notification, setNotification] = useState<string>('');

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

      const response: any = await axios.get(Http.user_notification_setting_by_username, {
        params: {
          username: props.username,
        },
      });

      if (response.result) {
        setNotification(response.data.notification);
      } else {
        setNotification('');
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

  const onChangeNotification = async (id: number) => {
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
      await init(username);

      setSnackSeverity('success');
      setSnackMessage('Update successfully');
      setSnackOpen(true);
    } else {
      setSnackSeverity('error');
      setSnackMessage(response.message);
      setSnackOpen(true);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Setup Notification</Typography>

      {getIsLogin() && getUuid() === props.uuid ? (
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

export default ProfileNotification;
