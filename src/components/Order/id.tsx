import { Alert, AlertTitle, Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { useSnackPresistStore } from 'lib';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CHAINIDS } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { OmitMiddleString } from 'utils/strings';
import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3';

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
  currency: string;
  confirmed: number;
  payment_confirmed: number;
  shipping_confirmed: number;
  financial_status: number;
  processed_at: number;
  items: OrderItemType[];
  wallets: WalletType[];
  transaction: TransactionType;
};

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState<OrderType>();

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async (orderId: any) => {
    try {
      if (!orderId) {
        return;
      }

      const response: any = await axios.get(Http.order_by_id, {
        params: {
          order_id: Number(orderId),
        },
      });

      if (response.result) {
        setOrder(response.data);
      } else {
        setOrder(undefined);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      init(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Container>
      {order ? (
        <>
          <Box mt={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order status</Typography>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Payment status</Typography>
                  <Typography fontWeight={'bold'} color={order?.payment_confirmed === 1 ? 'success' : 'error'}>
                    {order?.payment_confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Shipping status</Typography>
                  <Typography fontWeight={'bold'} color={order?.shipping_confirmed === 1 ? 'success' : 'error'}>
                    {order?.shipping_confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Order status</Typography>
                  <Typography fontWeight={'bold'} color={order?.confirmed === 1 ? 'success' : 'error'}>
                    {order?.confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
                  </Typography>
                </Stack>

                <Typography variant="h6" mt={2}>
                  Base info
                </Typography>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Customer username</Typography>
                  <Link href={`/profile/${order?.customer_username}`}>
                    <Typography>{order?.customer_username}</Typography>
                  </Link>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Customer email</Typography>
                  <Typography fontWeight={'bold'}>{order?.customer_email}</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Total discounts</Typography>
                  <Typography fontWeight={'bold'}>
                    {order?.total_discounts || 0} {order?.currency}
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Total tax</Typography>
                  <Typography fontWeight={'bold'}>
                    {order?.total_tax || 0} {order?.currency}
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Total tip received</Typography>
                  <Typography fontWeight={'bold'}>
                    {order?.total_tip_received || 0} {order?.currency}
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Total price</Typography>
                  <Typography fontWeight={'bold'}>
                    {order?.total_price || 0} {order?.currency}
                  </Typography>
                </Stack>

                <Typography variant="h6" mt={2}>
                  Order items
                </Typography>
                {order?.items &&
                  order.items.length > 0 &&
                  order.items.map((item, index) => (
                    <Box key={index}>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>Image</Typography>
                        <Link href={`/products/${item.product_id}`}>
                          <img src={item.image} alt="image" width={50} height={50} />
                        </Link>
                      </Stack>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>Title</Typography>
                        <Link href={`/products/${item.product_id}`}>
                          <Typography fontWeight={'bold'}>{item?.title}</Typography>
                        </Link>
                      </Stack>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>Option</Typography>
                        <Typography fontWeight={'bold'}>{item?.option}</Typography>
                      </Stack>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>Quantity</Typography>
                        <Typography fontWeight={'bold'}>{item?.quantity}</Typography>
                      </Stack>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>Price</Typography>
                        <Typography fontWeight={'bold'}>
                          {item?.price || 0} {order?.currency}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}

                {order?.payment_confirmed === 1 && (
                  <Box>
                    <Typography variant="h6" mt={2}>
                      Transaction
                    </Typography>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>Amount</Typography>
                      <Typography fontWeight={'bold'}>
                        {order?.transaction.amount} {order?.transaction.currency}
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>Gateway</Typography>
                      <Typography fontWeight={'bold'}>{order?.transaction.gateway}</Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>Message</Typography>
                      <Typography fontWeight={'bold'}>{order?.transaction.message}</Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>Transaction status</Typography>
                      {order?.transaction.transaction_status === 1 && (
                        <Typography fontWeight={'bold'} color="success">
                          Success
                        </Typography>
                      )}
                      {order?.transaction.transaction_status === 2 && (
                        <Typography fontWeight={'bold'} color="error">
                          Failure
                        </Typography>
                      )}
                      {order?.transaction.transaction_status === 3 && (
                        <Typography fontWeight={'bold'} color="info">
                          Pending
                        </Typography>
                      )}
                      {order?.transaction.transaction_status === 4 && (
                        <Typography fontWeight={'bold'} color="error">
                          Error
                        </Typography>
                      )}
                    </Stack>

                    <Typography mt={2} fontWeight={'bold'}>
                      Blockchain
                    </Typography>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>Chain</Typography>
                      <Typography fontWeight={'bold'}>
                        {FindChainNamesByChainids(order?.transaction.blockchain.chain_id)}
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>Hash</Typography>
                      <Link
                        href={GetBlockchainTxUrlByChainIds(
                          order?.transaction.blockchain.chain_id as CHAINIDS,
                          String(order?.transaction.blockchain.hash),
                        )}
                        target="_blank"
                      >
                        {OmitMiddleString(String(order?.transaction.blockchain.hash))}
                      </Link>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>From address</Typography>
                      <Link
                        href={GetBlockchainAddressUrlByChainIds(
                          order?.transaction.blockchain.chain_id as CHAINIDS,
                          String(order?.transaction.blockchain.from_address),
                        )}
                        target="_blank"
                      >
                        {OmitMiddleString(String(order?.transaction.blockchain.from_address))}
                      </Link>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>To address</Typography>
                      <Link
                        href={GetBlockchainAddressUrlByChainIds(
                          order?.transaction.blockchain.chain_id as CHAINIDS,
                          String(order?.transaction.blockchain.to_address),
                        )}
                        target="_blank"
                      >
                        {OmitMiddleString(String(order?.transaction.blockchain.to_address))}
                      </Link>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>Token</Typography>
                      <Typography fontWeight={'bold'}>{order?.transaction.blockchain.token}</Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>Crypto amount</Typography>
                      <Typography fontWeight={'bold'}>{order?.transaction.blockchain.crypto_amount}</Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography>Rate</Typography>
                      <Typography
                        fontWeight={'bold'}
                      >{`1 ${order?.transaction.blockchain.token} = ${order?.transaction.blockchain.rate} ${order?.currency}`}</Typography>
                    </Stack>
                    {order?.transaction.blockchain.block_timestamp > 0 && (
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>Block timestamp</Typography>
                        <Typography fontWeight={'bold'}>
                          {new Date(Number(order?.transaction.blockchain.block_timestamp)).toLocaleString()}
                        </Typography>
                      </Stack>
                    )}
                  </Box>
                )}

                <Box mt={4}>
                  {order?.payment_confirmed !== 1 ? (
                    <Button
                      variant={'contained'}
                      color="success"
                      fullWidth
                      onClick={() => {
                        window.location.href = `/payment/${order?.order_id}`;
                      }}
                    >
                      Go to pay
                    </Button>
                  ) : order?.shipping_confirmed !== 1 ? (
                    <Button variant={'contained'} color="inherit" fullWidth onClick={() => {}}>
                      Waiting for shipping
                    </Button>
                  ) : order?.confirmed !== 1 ? (
                    <Button variant={'contained'} color="inherit" fullWidth onClick={() => {}}>
                      Waiting for order confirm
                    </Button>
                  ) : (
                    <></>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </>
      ) : (
        <Card>
          <CardContent>
            <Box py={2} textAlign={'center'}>
              <Typography variant="h6">order is empty</Typography>
              <Typography mt={2}>No information was found about the order.</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default OrderDetails;
