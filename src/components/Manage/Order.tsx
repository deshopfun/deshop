import { ChevronRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Step,
  StepButton,
  Stepper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import BlockchainDialog from 'components/Dialog/BlockchainDialog';
import ConfirmOrderDialog from 'components/Dialog/ConfirmOrderDialog';
import ConfirmPaymentDialog from 'components/Dialog/ConfirmPaymentDialog';
import ConfirmShippingDialog from 'components/Dialog/ConfirmShippingDialog';
import OrderDetailsDialog from 'components/Dialog/OrderDetailsDialog';
import ShippingDialog from 'components/Dialog/ShippingDialog';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { OrderStatusText } from 'utils/strings';

const steps = [
  'Waiting for payment',
  // 'Payment confirmation',
  'Waiting for shipping',
  'Waiting for order confirm',
  'Order complete',
];

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

type ShippingType = {
  address_one: string;
  address_two: string;
  city: string;
  company: string;
  country: string;
  country_code: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  province: string;
  province_code: string;
  shipping_type: number;
  zip: string;
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
  confirmed_number: string;
  payment_confirmed: number;
  payment_confirmed_number: string;
  shipping_confirmed: number;
  shipping_confirmed_number: string;
  financial_status: number;
  processed_at: number;
  items: OrderItemType[];
  wallets: WalletType[];
  transaction: TransactionType;
  shipping: ShippingType;
};

type Props = {
  uuid?: string;
};

const ManageOrder = (props: Props) => {
  const [openBlockchainDialog, setOpenBlockchainDialog] = useState<boolean>(false);
  const [openConfirmPaymentDialog, setOpenConfirmPaymentDialog] = useState<boolean>(false);
  const [openShippingDialog, setOpenShippingDialog] = useState<boolean>(false);
  const [openConfirmShippingDialog, setOpenConfirmShippingDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState<boolean>(false);
  const [openOrderRateDialog, setOpenOrderRateDialog] = useState<boolean>(false);
  const [alignment, setAlignment] = useState<'buy' | 'sell'>('buy');
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderType>();

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

  const handleBlockchainCloseDialog = async () => {
    props.uuid && (await init(props.uuid, alignment));
    setOpenBlockchainDialog(false);
  };

  const handleConfirmPaymentCloseDialog = async () => {
    props.uuid && (await init(props.uuid, alignment));
    setOpenConfirmPaymentDialog(false);
  };

  const handleShippingCloseDialog = async () => {
    props.uuid && (await init(props.uuid, alignment));
    setOpenShippingDialog(false);
  };

  const handleConfirmShippingCloseDialog = async () => {
    props.uuid && (await init(props.uuid, alignment));
    setOpenConfirmShippingDialog(false);
  };

  const handleConfirmCloseDialog = async () => {
    props.uuid && (await init(props.uuid, alignment));
    setOpenConfirmDialog(false);
  };

  const handleOrderDetailsCloseDialog = async () => {
    props.uuid && (await init(props.uuid, alignment));
    setOpenOrderDetailsDialog(false);
  };

  const handleOrderRateCloseDialog = async () => {
    props.uuid && (await init(props.uuid, alignment));
    setOpenOrderRateDialog(false);
  };

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
          {orders && orders.length > 0 ? (
            orders.map((item, index) => (
              <Box key={index} mb={4}>
                <Card>
                  <CardContent>
                    <Box>
                      <Card>
                        <Box p={1}>
                          <Stepper
                            nonLinear
                            activeStep={
                              item.payment_confirmed === 1
                                ? item.shipping_confirmed == 1
                                  ? item.confirmed == 1
                                    ? 3
                                    : 2
                                  : 1
                                : 0
                            }
                          >
                            {steps.map((label, index) => (
                              <Step key={label} completed={false}>
                                <StepButton color="inherit">
                                  <Typography fontWeight={'bold'} textAlign={'left'}>
                                    Step {index + 1}
                                  </Typography>
                                  <Typography fontSize={14}>{label}</Typography>
                                </StepButton>
                              </Step>
                            ))}
                          </Stepper>
                        </Box>
                      </Card>
                    </Box>

                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                      <Button
                        color={'inherit'}
                        onClick={() => {
                          window.location.href = `/profile/${item.username}`;
                        }}
                        endIcon={<ChevronRight />}
                      >
                        <Stack direction={'row'} alignItems={'center'} gap={1}>
                          {item.user_avatar_url ? (
                            <img src={item.user_avatar_url} alt={'image'} loading="lazy" width={40} height={40} />
                          ) : (
                            <img
                              src={'/images/default_avatar.png'}
                              alt={'image'}
                              loading="lazy"
                              width={40}
                              height={40}
                            />
                          )}
                          <Typography>{item.username}</Typography>
                        </Stack>
                      </Button>
                      <Typography fontWeight={'bold'} color={'error'}>
                        {OrderStatusText(
                          alignment,
                          item.payment_confirmed === 1 ? true : false,
                          item.shipping_confirmed === 1 ? true : false,
                          item.confirmed === 1 ? true : false,
                          item.shipping.shipping_type,
                        )}
                      </Typography>
                    </Stack>
                    <div
                      onClick={() => {
                        window.location.href = item.order_status_url;
                      }}
                    >
                      <Stack direction={'row'} my={4} justifyContent={'space-between'}>
                        <Stack direction={'row'}>
                          <img src={item.items[0].image} alt={'image'} loading="lazy" width={100} height={100} />
                          <Box pl={2}>
                            <Typography>{item.items[0].title}</Typography>
                            <Typography>{item.items[0].option}</Typography>
                          </Box>
                        </Stack>
                        <Box textAlign={'right'}>
                          <Typography>{`${item.items[0].price} ${item.currency}`}</Typography>
                          <Typography>{`x${item.items[0].quantity}`}</Typography>
                        </Box>
                      </Stack>
                    </div>
                    <Divider />
                    <Typography textAlign={'right'} py={1}>
                      {`${item.items.length} item in total. Real payment: `}
                      <b>{`${item.total_price} ${item.currency}`}</b>
                    </Typography>
                    <Divider />
                    <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'} mt={2} gap={2}>
                      <Card style={{ width: '100%' }}>
                        <CardContent>
                          <Typography variant="h6">Payment</Typography>
                          <Stack mt={2} gap={1}>
                            <Button
                              variant={'outlined'}
                              color={'inherit'}
                              onClick={() => {
                                setCurrentOrder(item);
                                setOpenBlockchainDialog(true);
                              }}
                              size="small"
                            >
                              Check blockchain
                            </Button>
                            {alignment === 'buy' && item.payment_confirmed === 2 && (
                              <Button
                                size="small"
                                variant={'contained'}
                                color={'error'}
                                onClick={() => {
                                  window.location.href = `/payment/${item.order_id}`;
                                }}
                              >
                                Go to pay
                              </Button>
                            )}
                            {alignment === 'sell' && item.payment_confirmed === 2 && (
                              <Button
                                variant={'contained'}
                                color={'success'}
                                onClick={() => {
                                  setCurrentOrder(item);
                                  setOpenConfirmPaymentDialog(true);
                                }}
                                size="small"
                              >
                                Confirm the payment
                              </Button>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                      <Card style={{ width: '100%' }}>
                        <CardContent>
                          <Typography variant="h6">Shipping</Typography>
                          <Stack mt={2} gap={1}>
                            <Button
                              variant={'outlined'}
                              color={'inherit'}
                              onClick={() => {
                                setCurrentOrder(item);
                                setOpenShippingDialog(true);
                              }}
                              size="small"
                            >
                              Check shipping
                            </Button>
                            {alignment === 'buy' && item.payment_confirmed === 1 && item.shipping_confirmed === 2 && (
                              <Button
                                variant={'contained'}
                                color={'success'}
                                onClick={() => {
                                  setCurrentOrder(item);
                                  setOpenConfirmShippingDialog(true);
                                }}
                                size="small"
                              >
                                Confirm the receipt of goods
                              </Button>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                      <Card style={{ width: '100%' }}>
                        <CardContent>
                          <Typography variant="h6">More</Typography>
                          <Stack mt={2} gap={1}>
                            <Button
                              variant={'outlined'}
                              color={'inherit'}
                              onClick={() => {
                                setCurrentOrder(item);
                                setOpenOrderDetailsDialog(true);
                              }}
                              size="small"
                            >
                              Check details
                            </Button>
                            {alignment === 'buy' && (
                              <>
                                <Button
                                  variant={'outlined'}
                                  color={'inherit'}
                                  onClick={() => {
                                    setSnackSeverity('error');
                                    setSnackMessage('Not support');
                                    setSnackOpen(true);
                                  }}
                                  size="small"
                                >
                                  Buy again
                                </Button>
                                {item.payment_confirmed === 1 &&
                                  item.shipping_confirmed === 1 &&
                                  item.confirmed !== 1 && (
                                    <Button
                                      variant={'contained'}
                                      color={'success'}
                                      onClick={() => {
                                        setCurrentOrder(item);
                                        setOpenConfirmDialog(true);
                                      }}
                                      size="small"
                                    >
                                      Confirm the order
                                    </Button>
                                  )}
                                {item.confirmed === 1 && (
                                  <>
                                    <Button
                                      variant={'contained'}
                                      color={'error'}
                                      onClick={() => {
                                        setCurrentOrder(item);
                                        setOpenOrderRateDialog(true);
                                      }}
                                      size="small"
                                    >
                                      Rate now
                                    </Button>
                                    <Button
                                      variant={'outlined'}
                                      color={'inherit'}
                                      onClick={() => {
                                        setSnackSeverity('error');
                                        setSnackMessage('Not support');
                                        setSnackOpen(true);
                                      }}
                                      size="small"
                                    >
                                      Apply for a refund
                                    </Button>
                                    <Button
                                      variant={'outlined'}
                                      color={'inherit'}
                                      onClick={() => {
                                        setSnackSeverity('error');
                                        setSnackMessage('Not support');
                                        setSnackOpen(true);
                                      }}
                                      size="small"
                                    >
                                      Delete an order
                                    </Button>
                                  </>
                                )}
                              </>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            <Card>
              <CardContent>
                <Box py={2} textAlign={'center'}>
                  <Typography variant="h6">Your order is empty</Typography>
                  <Typography mt={2}>When there is a new order, it will be displayed here.</Typography>
                </Box>
              </CardContent>
            </Card>
          )}

          {currentOrder && (
            <>
              <BlockchainDialog
                currency={currentOrder.currency}
                blockchain={currentOrder.transaction.blockchain}
                openDialog={openBlockchainDialog}
                handleCloseDialog={handleBlockchainCloseDialog}
              />
              <ConfirmPaymentDialog
                orderId={currentOrder.order_id}
                confirmNumber={currentOrder.payment_confirmed_number}
                blockchain={currentOrder.transaction.blockchain}
                openDialog={openConfirmPaymentDialog}
                handleCloseDialog={handleConfirmPaymentCloseDialog}
              />
              <ShippingDialog
                alignment={alignment}
                shippingConfirmed={currentOrder.shipping_confirmed}
                shipping={currentOrder.shipping}
                openDialog={openShippingDialog}
                handleCloseDialog={handleShippingCloseDialog}
              />
              <ConfirmShippingDialog
                orderId={currentOrder.order_id}
                confirmNumber={currentOrder.shipping_confirmed_number}
                shipping={currentOrder.shipping}
                openDialog={openConfirmShippingDialog}
                handleCloseDialog={handleConfirmShippingCloseDialog}
              />
              <ConfirmOrderDialog
                orderId={currentOrder.order_id}
                confirmNumber={currentOrder.confirmed_number}
                openDialog={openConfirmDialog}
                handleCloseDialog={handleConfirmCloseDialog}
              />
              <OrderDetailsDialog
                order={currentOrder}
                openDialog={openOrderDetailsDialog}
                handleCloseDialog={handleOrderDetailsCloseDialog}
              />
            </>
          )}
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
