import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type OrderType = {
  order_id: number;
  user_uuid: string;
  user_email: string;
  username: string;
  user_avatar_url: string;
  order_status_url: string;
  total_discounts: string;
  total_price: string;
  total_tax: string;
  total_tip_received: string;
  financial_status: number;
  processed_at: number;
};

type Props = {
  uuid?: string;
};

const ManageOrder = (props: Props) => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin, getUuid } = useUserPresistStore((state) => state);

  const init = async (uuid: string) => {
    try {
      if (!uuid || uuid === '') {
        setSnackSeverity('error');
        setSnackMessage('Need login');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.get(Http.order, {
        params: {
          uuid: uuid,
        },
      });

      if (response.result) {
        setOrders(response.data);
      } else {
        setOrders([]);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    if (props.uuid) {
      init(props.uuid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.uuid]);

  return (
    <Box>
      <Typography variant="h6">All order</Typography>

      {getIsLogin() && getUuid() === props.uuid ? (
        <Box mt={2}>
          {orders &&
            orders.length > 0 &&
            orders.map((item, index) => (
              <Box key={index} mb={4}>
                <Card>
                  <CardContent>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>{item.order_id}</Typography>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Button
                          variant={'contained'}
                          color={'success'}
                          onClick={() => {
                            window.location.href = item.order_status_url;
                          }}
                        >
                          Check out
                        </Button>
                        <Button
                          variant={'contained'}
                          color={'success'}
                          onClick={() => {
                            window.location.href = `/payment/${item.order_id}`;
                          }}
                        >
                          Go to pay
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
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

export default ManageOrder;
