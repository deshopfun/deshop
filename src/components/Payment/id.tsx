import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
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
  TextField,
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
import {
  FindChainNamesByChainids,
  FindTokenByChainIdsAndSymbol,
  GetBlockchainAddressUrlByChainIds,
  GetBlockchainTxUrlByChainIds,
} from 'utils/web3';
import { GetImgSrcByChain, GetImgSrcByCrypto } from 'utils/qrcode';
import WalletConnectButton from 'components/Button/WalletConnectButton';
import { OmitMiddleString } from 'utils/strings';

const steps = [
  'Payment section',
  'Waiting for payment',
  // 'Blockchain confirmation/Order status change/Email confirmation',
  'Transaction confirmation',
  'Transaction complete',
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
  const [pasteTxId, setPasteTxId] = useState<boolean>(false);
  const [txid, setTxid] = useState<string>('');

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const handleChangeBlockchain = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const init = async (orderId: any, order?: OrderType) => {
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

        if (!order) {
          switch (response.data.transaction.transaction_status) {
            case 1 || 2 || 4:
              setActiveStep(3);
              setPage(3);
              break;
            case 3:
              setActiveStep(1);
              setPage(2);
              break;
          }
        }

        setOrder(response.data);
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
      const activeInit = setInterval(async () => {
        await init(id, order as OrderType);
      }, 10 * 1000);

      return () => clearInterval(activeInit);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, order]);

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

  const onClickPasteTxId = async () => {
    try {
      if (!order || !txid || txid === '') {
        return;
      }

      const response: any = await axios.post(Http.transaction_paste_tx_id, {
        order_id: order.order_id,
        txid: txid,
      });

      if (response.result) {
        setSnackSeverity('success');
        setSnackMessage('Handle successfully');
        setSnackOpen(true);

        window.location.reload();
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
      {order ? (
        <>
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
                  {order?.transaction.transaction_id > 0 && (
                    <Box mt={2}>
                      <Button
                        variant={'contained'}
                        color={'info'}
                        fullWidth
                        onClick={() => {
                          setActiveStep(1);
                          setPage(2);
                        }}
                      >
                        Next
                      </Button>
                    </Box>
                  )}
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
                          {pasteTxId ? (
                            <Box>
                              <Typography mb={1} fontWeight={'bold'}>
                                Txid:
                              </Typography>
                              <TextField
                                hiddenLabel
                                size="small"
                                fullWidth
                                value={txid}
                                onChange={(e) => {
                                  setTxid(e.target.value);
                                }}
                                placeholder="txid from blockchain"
                              />
                              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} my={2}>
                                <Button
                                  size="small"
                                  onClick={() => {
                                    setTxid('');
                                    setPasteTxId(false);
                                  }}
                                  variant={'contained'}
                                  color={'error'}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="small"
                                  onClick={() => {
                                    onClickPasteTxId();
                                  }}
                                  variant={'contained'}
                                  color={'success'}
                                >
                                  Transaction Confirm
                                </Button>
                              </Stack>
                            </Box>
                          ) : (
                            <div
                              onClick={() => {
                                setPasteTxId(true);
                              }}
                            >
                              <Link>Paste Chain Txid</Link>
                            </div>
                          )}
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
                            width={180}
                            height={180}
                            imageSettings={{
                              src: GetImgSrcByCrypto(order?.transaction.blockchain.token as COINS),
                              width: 25,
                              height: 25,
                              excavate: true,
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
                        <Typography>0 {`${order?.transaction.blockchain.token}`}</Typography>
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
                            setActiveStep(0);
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
                    <Box width={500} textAlign={'center'}>
                      {order?.transaction.transaction_status === 1 && (
                        <>
                          <CheckCircle color={'success'} fontSize={'large'} />
                          <Typography variant="h6">Thank you</Typography>
                        </>
                      )}

                      {order?.transaction.transaction_status === 2 && (
                        <>
                          <CheckCircle color={'warning'} fontSize={'large'} />
                          <Typography variant="h6">Something wrong</Typography>
                        </>
                      )}

                      {order?.transaction.transaction_status === 4 && (
                        <>
                          <CheckCircle color={'error'} fontSize={'large'} />
                          <Typography variant="h6">Something wrong</Typography>
                        </>
                      )}
                      <Box mt={2}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                          <Typography>Order status</Typography>
                          {order?.transaction.transaction_status === 1 && (
                            <>
                              <Chip label={'Settled'} color={'success'} />
                            </>
                          )}
                          {order?.transaction.transaction_status === 2 && (
                            <>
                              <Chip label={'Failure'} color={'warning'} />
                            </>
                          )}
                          {order?.transaction.transaction_status === 4 && (
                            <>
                              <Chip label={'Error'} color={'error'} />
                            </>
                          )}
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                          <Typography>Blockchain</Typography>
                          <Typography fontWeight={'bold'}>
                            {FindChainNamesByChainids(order?.transaction.blockchain.chain_id as CHAINIDS)}
                          </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
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
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
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
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
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
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                          <Typography>Token</Typography>
                          <Typography fontWeight={'bold'}>{order?.transaction.blockchain.token}</Typography>
                        </Stack>
                        {order?.transaction.blockchain.block_timestamp > 0 && (
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                            <Typography>Block timestamp</Typography>
                            <Typography fontWeight={'bold'}>
                              {new Date(Number(order?.transaction.blockchain.block_timestamp)).toLocaleString()}
                            </Typography>
                          </Stack>
                        )}
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

          <Box my={4}>
            <Card>
              <Box p={2}>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h6">FAQ</Typography>
                    <Typography>
                      Q: I made a payment and tried to contact the store owner/merchant, but they haven't responded.
                      What should I do?
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
        </>
      ) : (
        <Card>
          <CardContent>
            <Box py={2} textAlign={'center'}>
              <Typography variant="h6">payment is empty</Typography>
              <Typography mt={2}>No information was found about the payment.</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default PaymentDetails;
