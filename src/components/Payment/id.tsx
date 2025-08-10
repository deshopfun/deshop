import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, ContentCopy, ExpandMore } from '@mui/icons-material';
import { BLOCKCHAIN, BLOCKCHAINNAMES, CHAINIDS, COIN, COINS } from 'packages/constants';
import Image from 'next/image';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useRouter } from 'next/router';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { FindChainNamesByChainids, FindTokenByChainIdsAndSymbol } from 'utils/web3';
import { GetImgSrcByChain, GetImgSrcByCrypto } from 'utils/qrcode';
import WalletConnectButton from 'components/Button/WalletConnectButton';

const steps = [
  'Payment section',
  'Waiting for payment',
  'Blockchain network confirmation',
  'Order status change',
  'Email confirmation',
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
  financial_status: number;
  processed_at: number;
  items: OrderItemType[];
  wallets: WalletType[];
  transaction: TransactionType;
};

const PaymentDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<OrderType>();
  const [blockchains, setBlockchains] = useState<BLOCKCHAIN[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const handleStep = (step: number) => () => {
    switch (step) {
      case 0:
        setPage(1);
        break;
      case 1:
        setPage(2);
        break;
    }
    setActiveStep(step);
  };

  const handleChangeBlockchain = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const init = async (orderId: any) => {
    try {
      const response: any = await axios.get(Http.order_by_id, {
        params: {
          order_id: Number(orderId),
        },
      });

      if (response.result) {
        const newBlockchain: BLOCKCHAIN[] = BLOCKCHAINNAMES.reduce((acc: BLOCKCHAIN[], chain) => {
          const wallet = response.data.wallets.find((w: WalletType) => w.chain_id === chain.chainId);
          if (wallet?.address) {
            const coins = chain.coins.filter((coin) => !wallet.disable_coin?.includes(coin.name));
            if (coins.length > 0) {
              acc.push({ ...chain, coins });
            }
          }
          return acc;
        }, []);

        setBlockchains(newBlockchain);
        setOrder(response.data);

        if (response.data.transaction.transaction_id) {
          setActiveStep(1);
          setPage(2);
        }
      } else {
        setBlockchains([]);
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

  const onClickBlockchain = async (chainId: number, coin: string) => {
    try {
      if (!order) {
        return;
      }

      const response: any = await axios.post(Http.transaction, {
        order_id: order.order_id,
        chain_id: chainId,
        coin: coin,
      });

      if (response.result) {
        await init(id);
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
      {page === 1 && (
        <Box>
          <Typography variant="h4" textAlign={'center'}>
            Choose YourPayment Method
          </Typography>
          <Grid container spacing={2} mt={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Card>
                <Typography textAlign={'center'} variant="h6" py={2}>
                  Choose Your Chain And Coin
                </Typography>
              </Card>

              <Box mt={2}>
                {blockchains &&
                  blockchains.length > 0 &&
                  blockchains.map((item, index) => (
                    <Accordion
                      expanded={expanded === item.name}
                      onChange={handleChangeBlockchain(item.name)}
                      key={index}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1bh-content">
                        <Typography sx={{ width: '20%', flexShrink: 0 }} fontWeight={'bold'}>
                          {item.name.toUpperCase()}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{item.desc}</Typography>
                      </AccordionSummary>
                      {item.coins &&
                        item.coins.length > 0 &&
                        item.coins.map((coinItem: COIN, coinIndex) => (
                          <AccordionDetails key={coinIndex}>
                            <Button
                              fullWidth
                              variant={'outlined'}
                              onClick={() => {
                                onClickBlockchain(coinItem.chainId, coinItem.name);
                              }}
                            >
                              <Image src={coinItem.icon} alt="icon" width={50} height={50} />
                              <Typography ml={2}>{coinItem.name}</Typography>
                            </Button>
                          </AccordionDetails>
                        ))}
                    </Accordion>
                  ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <Box p={3}>
                  <Stack direction={'row'} gap={1} alignItems={'center'} pb={1}>
                    {order?.user_avatar_url ? (
                      <img src={order.user_avatar_url} alt={'image'} loading="lazy" width={80} height={80} />
                    ) : (
                      <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={80} height={80} />
                    )}
                    {order?.username ? (
                      <Link underline={'none'} color={'textPrimary'} href={`/profile/${order.username}`}>
                        {order.username}
                      </Link>
                    ) : (
                      <></>
                    )}
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                    <Typography fontWeight={'bold'}>Total Discounts(USD)</Typography>
                    <Typography>{order?.total_discounts || 0}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                    <Typography fontWeight={'bold'}>Total Tax(USD)</Typography>
                    <Typography>{order?.total_tax || 0}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                    <Typography fontWeight={'bold'}>Total Tip Received(USD)</Typography>
                    <Typography>{order?.total_tip_received || 0}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={1}>
                    <Typography fontWeight={'bold'}>Total(USD)</Typography>
                    <Typography>{order?.total_price || 0}</Typography>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {page === 2 && (
        <Box>
          <Typography variant="h4" textAlign={'center'}>
            Payment Page
          </Typography>
          <Grid container spacing={2} mt={4}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Card>
                <Box p={3}>
                  <Stack direction={'row'} gap={1} alignItems={'center'} pb={1}>
                    {order?.user_avatar_url ? (
                      <img src={order.user_avatar_url} alt={'image'} loading="lazy" width={80} height={80} />
                    ) : (
                      <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={80} height={80} />
                    )}
                    {order?.username ? (
                      <Link underline={'none'} color={'textPrimary'} href={`/profile/${order.username}`}>
                        {order.username}
                      </Link>
                    ) : (
                      <></>
                    )}
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                    <Typography fontWeight={'bold'}>Total Discounts(USD)</Typography>
                    <Typography>{order?.total_discounts || 0}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                    <Typography fontWeight={'bold'}>Total Tax(USD)</Typography>
                    <Typography>{order?.total_tax || 0}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                    <Typography fontWeight={'bold'}>Total Tip Received(USD)</Typography>
                    <Typography>{order?.total_tip_received || 0}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={1}>
                    <Typography fontWeight={'bold'}>Total(USD)</Typography>
                    <Typography>{order?.total_price || 0}</Typography>
                  </Stack>
                </Box>
              </Card>

              <Box mt={2}>
                <Card>
                  <Box p={1}>
                    <LinearProgress
                      color={'success'}
                      variant="determinate"
                      value={20}
                      style={{
                        borderRadius: 5,
                        height: 10,
                      }}
                    />
                    <Typography textAlign={'center'} py={1} fontWeight={'bold'}>
                      Transaction recheck in 2:24
                    </Typography>
                  </Box>
                </Card>
              </Box>

              <Box mt={2}>
                <Card>
                  <Box p={2}>
                    <Divider />
                    <Box pt={2}>
                      <Typography>
                        Paste/Write your Chain transaction id(Txid) to manual payment confirmation
                      </Typography>
                      <Link href="#">Paste Chain Txid</Link>
                    </Box>
                    <Box py={2}>
                      <Typography>
                        However, If your money still does not appear to have been received, please contact us. With
                        your,
                      </Typography>
                      <Typography>1, Transaction hash/link</Typography>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography>2, order id:</Typography>
                        <Typography fontWeight={'bold'}>{order?.order_id}</Typography>
                      </Stack>
                      <Typography>
                        at <Link href="#">Contact telegram</Link>
                      </Typography>
                    </Box>
                    <Divider />
                    <Box mt={2}>
                      <Typography>Once your payment status will change, we will send you an email</Typography>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography>Your email:</Typography>
                        <Typography fontWeight={'bold'}>{order?.customer_email}</Typography>
                      </Stack>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Card>
                <Box p={2}>
                  <Card>
                    <Stack direction={'row'} alignItems={'center'} p={1}>
                      {order?.transaction.blockchain.chain_id && (
                        <img
                          src={GetImgSrcByChain(order?.transaction.blockchain.chain_id)}
                          alt={'image'}
                          loading="lazy"
                          width={40}
                          height={40}
                        />
                      )}

                      <Box pl={2}>
                        <Typography fontWeight={'bold'}>
                          {FindChainNamesByChainids(order?.transaction.blockchain.chain_id || 0)}
                        </Typography>
                        <Typography>{order?.transaction.blockchain.token}</Typography>
                      </Box>
                    </Stack>
                  </Card>

                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2} px={4}>
                    {order?.transaction.blockchain.token && (
                      <img
                        src={GetImgSrcByCrypto(order?.transaction.blockchain.token as COINS)}
                        alt={'image'}
                        loading="lazy"
                        width={100}
                        height={100}
                      />
                    )}
                    <Paper style={{ padding: 14 }}>
                      <QRCodeSVG
                        value={`${FindChainNamesByChainids(order?.transaction.blockchain.chain_id || 0)}:${
                          order?.transaction.blockchain.address
                        }?amount=${order?.transaction.blockchain.crypto_amount}`}
                        width={160}
                        height={160}
                        imageSettings={{
                          src: GetImgSrcByCrypto(order?.transaction.blockchain.token as COINS),
                          width: 30,
                          height: 30,
                          excavate: false,
                        }}
                      />

                      <Typography textAlign={'center'} pt={1}>
                        Scan to pay
                      </Typography>
                    </Paper>
                  </Stack>

                  <Box mt={4} textAlign={'center'}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
                      <Typography>Send</Typography>
                      <Typography variant="h5">
                        {order?.transaction.blockchain.crypto_amount} {order?.transaction.blockchain.token}
                      </Typography>
                      <Typography>by single transaction</Typography>
                    </Stack>
                    <Typography py={1}>Transaction to address:</Typography>
                  </Box>
                  <Divider />
                  <Box pt={1} pb={1}>
                    <FormControl size="small" hiddenLabel fullWidth>
                      <OutlinedInput
                        disabled
                        value={order?.transaction.blockchain.address}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={async () => {
                                await navigator.clipboard.writeText(order?.transaction.blockchain.address || '');

                                setSnackMessage('Copy successfully');
                                setSnackSeverity('success');
                                setSnackOpen(true);
                              }}
                            >
                              <ContentCopy />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} pb={1}>
                    <Button
                      variant={'contained'}
                      startIcon={<ContentCopy />}
                      fullWidth
                      onClick={async () => {
                        await navigator.clipboard.writeText(String(order?.transaction.blockchain.address));

                        setSnackMessage('Successfully copy');
                        setSnackSeverity('success');
                        setSnackOpen(true);
                      }}
                    >
                      Copy Address
                    </Button>
                    <WalletConnectButton
                      color={'success'}
                      chainIds={order?.transaction.blockchain.chain_id as CHAINIDS}
                      address={String(order?.transaction.blockchain.address)}
                      contractAddress={
                        FindTokenByChainIdsAndSymbol(
                          order?.transaction.blockchain.chain_id as CHAINIDS,
                          order?.transaction.blockchain.token as COINS,
                        )?.contractAddress
                      }
                      decimals={
                        FindTokenByChainIdsAndSymbol(
                          order?.transaction.blockchain.chain_id as CHAINIDS,
                          order?.transaction.blockchain.token as COINS,
                        )?.decimals
                      }
                      value={String(order?.transaction.blockchain.crypto_amount)}
                      buttonSize={'medium'}
                      buttonVariant={'contained'}
                      fullWidth={true}
                    />
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={2}>
                    <Typography>Order Descriptions</Typography>
                    <Typography>{`OrderId-${order?.order_id}`}</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>Price</Typography>
                    <Typography>{`${order?.total_price} ${order?.transaction.currency}`}</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>Fee</Typography>
                    <Typography>0.00 {`${order?.transaction.blockchain.token}`}</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>{`1 ${order?.transaction.blockchain.token}:`}</Typography>
                    <Typography>{`${order?.transaction.blockchain.rate} ${order?.transaction.currency}`}</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>Page Expires in:</Typography>
                    <Typography>0h 14m 24s</Typography>
                  </Stack>

                  <Box mt={2}>
                    <Button
                      fullWidth
                      variant={'contained'}
                      color={'info'}
                      onClick={() => {
                        setPage(1);
                      }}
                    >
                      Back
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {page === 3 && (
        <Box>
          <Typography variant="h4" textAlign={'center'}>
            Payment Completed
          </Typography>

          <Box mt={4}>
            <Card>
              <Box display={'flex'} p={4} justifyContent={'center'}>
                <Box width={400} textAlign={'center'}>
                  <CheckCircle color={'success'} fontSize={'large'} />
                  <Typography variant="h6">Thank you</Typography>

                  <Box mt={2}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} pb={1}>
                      <Typography>Order Status</Typography>
                      <Chip label={'Settled'} color={'success'} />
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} pb={1}>
                      <Typography>Hash</Typography>
                      <Link href="#">0x00000</Link>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} pb={1}>
                      <Typography>From Address</Typography>
                      <Link href="#">0x00000</Link>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                      <Typography>To Address</Typography>
                      <Link href="#">0x00000</Link>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      )}

      <Box mt={10}>
        <Card>
          <Box p={1}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
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

      <Box my={4}>
        <Card>
          <Box p={2}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6">FAQ</Typography>
                <Typography>
                  Q: I made a payment and tried to contact the store owner/merchant, but they haven't responded. What
                  should I do?
                </Typography>
                <Typography>A: Please reach out to our telegram support for assistance.</Typography>
                <Typography mt={1}>@Deshop</Typography>
                <Typography>Fait to crypto exchange rate(Live)</Typography>
                <Typography>Deshop privacy policy</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6">QUESTIONS ABOUT YOUR PRODUCT</Typography>
                <Typography>
                  Deshop is a decentralized cryptocurrency exchange, if you have any question regarding your
                  products/goods/services please contact here.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack direction={'row'} alignItems={'center'} gap={2}>
                  <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={80} height={80} />
                  <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={80} height={80} />
                </Stack>
                <Typography mt={1}>Serial Number: 123123123123123</Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default PaymentDetails;
