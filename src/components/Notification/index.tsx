import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { NOTIFICATIONS } from 'packages/constants/notification';
import { NotificationType } from 'utils/types';

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  const init = async () => {
    try {
      if (!getIsLogin()) {
        return;
      }

      const response: any = await axios.get(Http.user_notification);

      if (response.result) {
        setNotifications(response.data);
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

  const onClickSeen = async (kind: number, id?: number) => {
    try {
      const response: any = await axios.put(Http.user_notification, {
        kind: kind,
        notification_id: kind === 2 ? id : undefined,
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
    <Container>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h6" mb={4}>
          Notifications
        </Typography>
        {notifications && notifications.length > 0 && (
          <Button
            color={'success'}
            variant={'contained'}
            onClick={() => {
              onClickSeen(1);
            }}
          >
            Mark all seen
          </Button>
        )}
      </Stack>
      {notifications && notifications.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.map((row, rowId) => (
                <TableRow key={rowId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Typography fontWeight={'bold'}>{row.title}</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Chip
                      label={NOTIFICATIONS.find((item) => item.id === row.notification_type)?.title}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell component="th" scope="row">
                    {new Date(row.create_time).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'right'} gap={1}>
                      <Button
                        size={'small'}
                        variant={'contained'}
                        onClick={() => {
                          window.location.href = row.url;
                        }}
                      >
                        Check
                      </Button>
                      {row.is_read === 2 && (
                        <Button
                          color="success"
                          size={'small'}
                          variant={'contained'}
                          onClick={() => {
                            onClickSeen(2, row.notification_id);
                          }}
                        >
                          Mark as seen
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Card>
          <CardContent>
            <Box py={2} textAlign={'center'}>
              <Typography variant="h6">not found the notification</Typography>
              <Typography mt={2}>No information was found about the notification.</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Notification;
