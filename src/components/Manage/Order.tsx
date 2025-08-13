import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type WalletType = {
  address: string;
  chain_id: number;
  chain_name: string;
  disable_coin: string;
};

type OrderItemType = {
  product_id: number;
  option: string;
  quantity: number;
  price: string;
  title: string;
  image: string;
};

type TransactionType = {
  transaction_id: number;
  amount: string;
  currency: number;
  gateway: string;
  message: string;
  source_name: number;
  transaction_status: number;
  blockchain: BlockchainType;
};

type BlockchainType = {
  qrcode: string;
  rate: string;
  chain_id: number;
  hash: string;
  address: string;
  from_address: string;
  to_address: string;
  token: string;
  transact_type: string;
  crypto_amount: string;
  block_timestamp: number;
};

type OrderType = {
  order_id: number;
  customer_uuid: string;
  customer_email: string;
  customer_username: string;
  customer_avatar_url: string;
  user_uuid: string;
  user_email: string;
  username: string;
  user_avatar_url: string;
  order_status_url: string;
  total_discounts: string;
  total_price: string;
  total_tax: string;
  total_tip_received: string;
  confirmed: number;
  financial_status: number;
  processed_at: number;
  items: OrderItemType[];
  wallets: WalletType[];
  transaction: TransactionType;
};

type Props = {
  uuid?: string;
};

const ManageOrder = (props: Props) => {
  const [alignment, setAlignment] = useState<string>('buy' || 'sell');
  const [orders, setOrders] = useState<OrderType[]>([]);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin, getUuid } = useUserPresistStore((state) => state);

  const init = async (uuid: string, kind: string) => {
    try {
      if (!uuid || uuid === '') {
        setSnackSeverity('error');
        setSnackMessage('Need login');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.get(Http.order, {
        params: {
          kind: kind === 'buy' ? 1 : 2,
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
      init(props.uuid, 'buy');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.uuid]);

  return (
    <Box>
      <Typography variant="h6">All order</Typography>

      <Box mt={2}>
        <ToggleButtonGroup
          fullWidth
          exclusive
          color="primary"
          value={alignment}
          onChange={async (e: any) => {
            setAlignment(e.target.value);
            await init(String(props.uuid), e.target.value);
          }}
        >
          <ToggleButton value={'buy'}>Buy</ToggleButton>
          <ToggleButton value={'sell'}>Sell</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {getIsLogin() && getUuid() === props.uuid ? (
        <Box mt={2}>
          {orders &&
            orders.length > 0 &&
            orders.map((item, index) => (
              <Box key={index} mb={4}>
                <Card>
                  <CardContent>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <img src={item.user_avatar_url} alt={'image'} loading="lazy" width={40} height={40} />
                        <Typography>{item.username}</Typography>
                      </Stack>
                      <Typography color="error">Goods to be received</Typography>
                    </Stack>
                    <div
                      onClick={() => {
                        window.location.href = item.order_status_url;
                      }}
                    >
                      <Stack direction={'row'} my={2} justifyContent={'space-between'}>
                        <Stack direction={'row'}>
                          <img src={item.items[0].image} alt={'image'} loading="lazy" width={100} height={100} />
                          <Box pl={2}>
                            <Typography>{item.items[0].title}</Typography>
                            <Typography>{item.items[0].option}</Typography>
                          </Box>
                        </Stack>
                        <Box textAlign={'right'}>
                          <Typography>{`${item.items[0].price} USD`}</Typography>
                          <Typography>{`x${item.items[0].quantity}`}</Typography>
                        </Box>
                      </Stack>
                    </div>
                    <Divider />
                    <Typography
                      textAlign={'right'}
                      py={1}
                    >{`${item.items.length} item in total. Real payment: ${item.total_price} USD`}</Typography>
                    <Divider />
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'right'} gap={1} mt={2}>
                      {item.financial_status === 1 ? (
                        <>
                          <Button variant={'outlined'} color={'inherit'} onClick={() => {}} size="small">
                            Apply for a refund
                          </Button>
                          <Button variant={'outlined'} color={'inherit'} onClick={() => {}} size="small">
                            check logistics
                          </Button>
                          <Button variant={'contained'} color={'error'} onClick={() => {}} size="small">
                            confirm the receipt of goods
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="small"
                          variant={'contained'}
                          color={'success'}
                          onClick={() => {
                            window.location.href = `/payment/${item.order_id}`;
                          }}
                        >
                          Go to pay
                        </Button>
                      )}

                      {item.confirmed === 1 && (
                        <>
                          <Button variant={'outlined'} color={'inherit'} onClick={() => {}} size="small">
                            Delete an order
                          </Button>
                          <Button variant={'outlined'} color={'inherit'} onClick={() => {}} size="small">
                            check logistics
                          </Button>
                          <Button variant={'outlined'} color={'inherit'} onClick={() => {}} size="small">
                            Buy again
                          </Button>
                          <Button variant={'contained'} color={'error'} onClick={() => {}} size="small">
                            Rate now
                          </Button>
                        </>
                      )}
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
