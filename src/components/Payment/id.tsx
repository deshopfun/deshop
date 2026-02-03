import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
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
  OutlinedInput,
  Paper,
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
import { OrderType, WalletType } from 'utils/types';

const steps = [
  'Payment section',
  'Waiting for payment',
  // 'Blockchain confirmation/Order status change/Email confirmation',
  'Transaction confirmation',
  'Transaction complete',
];

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
  const { getUuid } = useUserPresistStore((state) => state);

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
          const wallet = response.data.wallets
            ? response.data.wallets.find((w: WalletType) => w.chain_id === chain.chainId)
            : null;
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
          switch (response.data.transactions[0].transaction_status) {
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
      {order && getUuid() !== order?.user_uuid ? (
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
                      {Number(order?.sub_total_price) > 0 && (
                        <>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                            <Typography fontWeight={'bold'}>Subtotal({order?.currency})</Typography>
                            <Typography>{order?.sub_total_price}</Typography>
                          </Stack>
                          <Divider />
                        </>
                      )}
                      {/* {Number(order?.total_shipping) > 0 && (
                        <>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                            <Typography fontWeight={'bold'}>Total Shipping({order?.currency})</Typography>
                            <Typography>{order?.total_shipping}</Typography>
                          </Stack>
                          <Divider />
                        </>
                      )} */}
                      {Number(order?.total_tax) > 0 && (
                        <>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                            <Typography fontWeight={'bold'}>Total Tax({order?.currency})</Typography>
                            <Typography>{order?.total_tax}</Typography>
                          </Stack>
                          <Divider />
                        </>
                      )}
                      {Number(order?.total_tip) > 0 && (
                        <>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                            <Typography fontWeight={'bold'}>Total Tip({order?.currency})</Typography>
                            <Typography>{order?.total_tip}</Typography>
                          </Stack>
                          <Divider />
                        </>
                      )}
                      {Number(order?.total_discounts) > 0 && (
                        <>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                            <Typography fontWeight={'bold'}>Total Discounts({order?.currency})</Typography>
                            <Typography>{order?.total_discounts}</Typography>
                          </Stack>
                          <Divider />
                        </>
                      )}
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={1}>
                        <Typography fontWeight={'bold'}>Total({order?.currency})</Typography>
                        <Typography>{order?.total_price || 0}</Typography>
                      </Stack>
                    </Box>
                  </Card>
                  {order?.transactions[0].transaction_id > 0 && (
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
              {order.transactions && order.detect_transaction === 1 && (
                <Box mt={4}>
                  <Alert severity={'success'}>
                    <AlertTitle>Payment successfully</AlertTitle>
                    <Typography>{`Detected that some transactions have been successful, please wait for confirmation from the seller.`}</Typography>
                  </Alert>
                </Box>
              )}
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
                      {Number(order?.sub_total_price) > 0 && (
                        <>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                            <Typography fontWeight={'bold'}>Subtotal({order?.currency})</Typography>
                            <Typography>{order?.sub_total_price}</Typography>
                          </Stack>
                          <Divider />
                        </>
                      )}
                      {/* {Number(order?.total_shipping) > 0 && (
                        <>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                            <Typography fontWeight={'bold'}>Total Shipping({order?.currency})</Typography>
                            <Typography>{order?.total_shipping}</Typography>
                          </Stack>
                          <Divider />
                        </>
                      )} */}
                      {Number(order?.total_tax) > 0 && (
                        <>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                            <Typography fontWeight={'bold'}>Total Tax({order?.currency})</Typography>
                            <Typography>{order?.total_tax}</Typography>
                          </Stack>
                          <Divider />
                        </>
                      )}
                      {Number(order?.total_tip) > 0 && (
                        <>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                            <Typography fontWeight={'bold'}>Total Tip({order?.currency})</Typography>
                            <Typography>{order?.total_tip}</Typography>
                          </Stack>
                          <Divider />
                        </>
                      )}
                      {Number(order?.total_discounts) > 0 && (
                        <>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                            <Typography fontWeight={'bold'}>Total Discounts({order?.currency})</Typography>
                            <Typography>{order?.total_discounts}</Typography>
                          </Stack>
                          <Divider />
                        </>
                      )}
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={1}>
                        <Typography fontWeight={'bold'}>Total({order?.currency})</Typography>
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
                          <Typography>1 Transaction hash/link</Typography>
                          <Stack direction={'row'} alignItems={'center'} gap={1}>
                            <Typography>2 Order id:</Typography>
                            <Typography fontWeight={'bold'}>{order?.order_id}</Typography>
                          </Stack>
                          <Typography>
                            at{' '}
                            <Link href="https://t.me/deshopfunsupport" target="_blank">
                              Contact telegram
                            </Link>
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
                          {order?.transactions[0].blockchain.chain_id && (
                            <img
                              src={GetImgSrcByChain(order?.transactions[0].blockchain.chain_id)}
                              alt={'image'}
                              loading="lazy"
                              width={40}
                              height={40}
                            />
                          )}

                          <Box pl={2}>
                            <Typography fontWeight={'bold'}>
                              {FindChainNamesByChainids(order?.transactions[0].blockchain.chain_id || 0)}
                            </Typography>
                            <Typography>{order?.transactions[0].blockchain.token}</Typography>
                          </Box>
                        </Stack>
                      </Card>

                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2} px={4}>
                        {order?.transactions[0].blockchain.token && (
                          <img
                            src={GetImgSrcByCrypto(order?.transactions[0].blockchain.token as COINS)}
                            alt={'image'}
                            loading="lazy"
                            width={100}
                            height={100}
                          />
                        )}
                        <Paper style={{ padding: 14 }}>
                          <QRCodeSVG
                            value={`${FindChainNamesByChainids(order?.transactions[0].blockchain.chain_id || 0)}:${
                              order?.transactions[0].blockchain.address
                            }?amount=${order?.transactions[0].blockchain.crypto_amount}`}
                            width={180}
                            height={180}
                            imageSettings={{
                              src: GetImgSrcByCrypto(order?.transactions[0].blockchain.token as COINS),
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
                            {order?.transactions[0].blockchain.crypto_amount} {order?.transactions[0].blockchain.token}
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
                            value={order?.transactions[0].blockchain.address}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={async () => {
                                    await navigator.clipboard.writeText(
                                      order?.transactions[0].blockchain.address || '',
                                    );

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
                            await navigator.clipboard.writeText(String(order?.transactions[0].blockchain.address));

                            setSnackMessage('Successfully copy');
                            setSnackSeverity('success');
                            setSnackOpen(true);
                          }}
                        >
                          Copy Address
                        </Button>
                        <WalletConnectButton
                          color={'success'}
                          chainIds={order?.transactions[0].blockchain.chain_id as CHAINIDS}
                          address={String(order?.transactions[0].blockchain.address)}
                          contractAddress={
                            FindTokenByChainIdsAndSymbol(
                              order?.transactions[0].blockchain.chain_id as CHAINIDS,
                              order?.transactions[0].blockchain.token as COINS,
                            )?.contractAddress
                          }
                          decimals={
                            FindTokenByChainIdsAndSymbol(
                              order?.transactions[0].blockchain.chain_id as CHAINIDS,
                              order?.transactions[0].blockchain.token as COINS,
                            )?.decimals
                          }
                          value={String(order?.transactions[0].blockchain.crypto_amount)}
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
                        <Typography>{`${order?.total_price} ${order?.transactions[0].currency}`}</Typography>
                      </Stack>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>Fee</Typography>
                        <Typography>0 {`${order?.transactions[0].blockchain.token}`}</Typography>
                      </Stack>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>{`1 ${order?.transactions[0].blockchain.token}:`}</Typography>
                        <Typography>{`${order?.transactions[0].blockchain.rate} ${order?.transactions[0].currency}`}</Typography>
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
                      {order?.transactions[0].transaction_status === 1 && (
                        <>
                          <CheckCircle color={'success'} fontSize={'large'} />
                          <Typography variant="h6">Thank you</Typography>
                        </>
                      )}

                      {order?.transactions[0].transaction_status === 2 && (
                        <>
                          <CheckCircle color={'warning'} fontSize={'large'} />
                          <Typography variant="h6">Something wrong</Typography>
                        </>
                      )}

                      {order?.transactions[0].transaction_status === 4 && (
                        <>
                          <CheckCircle color={'error'} fontSize={'large'} />
                          <Typography variant="h6">Something wrong</Typography>
                        </>
                      )}
                      <Box mt={2}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                          <Typography>Order status</Typography>
                          {order?.transactions[0].transaction_status === 1 && (
                            <>
                              <Chip label={'Settled'} color={'success'} />
                            </>
                          )}
                          {order?.transactions[0].transaction_status === 2 && (
                            <>
                              <Chip label={'Failure'} color={'warning'} />
                            </>
                          )}
                          {order?.transactions[0].transaction_status === 4 && (
                            <>
                              <Chip label={'Error'} color={'error'} />
                            </>
                          )}
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                          <Typography>Blockchain</Typography>
                          <Typography fontWeight={'bold'}>
                            {FindChainNamesByChainids(order?.transactions[0].blockchain.chain_id as CHAINIDS)}
                          </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                          <Typography>Hash</Typography>
                          <Link
                            href={GetBlockchainTxUrlByChainIds(
                              order?.transactions[0].blockchain.chain_id as CHAINIDS,
                              String(order?.transactions[0].blockchain.hash),
                            )}
                            target="_blank"
                          >
                            {OmitMiddleString(String(order?.transactions[0].blockchain.hash))}
                          </Link>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                          <Typography>From address</Typography>
                          <Link
                            href={GetBlockchainAddressUrlByChainIds(
                              order?.transactions[0].blockchain.chain_id as CHAINIDS,
                              String(order?.transactions[0].blockchain.from_address),
                            )}
                            target="_blank"
                          >
                            {OmitMiddleString(String(order?.transactions[0].blockchain.from_address))}
                          </Link>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                          <Typography>To address</Typography>
                          <Link
                            href={GetBlockchainAddressUrlByChainIds(
                              order?.transactions[0].blockchain.chain_id as CHAINIDS,
                              String(order?.transactions[0].blockchain.to_address),
                            )}
                            target="_blank"
                          >
                            {OmitMiddleString(String(order?.transactions[0].blockchain.to_address))}
                          </Link>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                          <Typography>Token</Typography>
                          <Typography fontWeight={'bold'}>{order?.transactions[0].blockchain.token}</Typography>
                        </Stack>
                        {order?.transactions[0].blockchain.block_timestamp > 0 && (
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                            <Typography>Block timestamp</Typography>
                            <Typography fontWeight={'bold'}>
                              {new Date(Number(order?.transactions[0].blockchain.block_timestamp)).toLocaleString()}
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
                      Q: I made a payment and tried to contact the seller, but they haven't responded. What should I do?
                    </Typography>
                    <Typography>A: Please reach out to our telegram support for assistance.</Typography>
                    <Stack gap={1}>
                      <Link color={'textPrimary'} href="https://t.me/deshopfunsupport" target="_blank">
                        @Deshop
                      </Link>
                      <Link color={'textPrimary'} href="#">
                        Fait to crypto exchange rate(Live)
                      </Link>
                      <Link color={'textPrimary'} href="/docs/privacy-policy">
                        Deshop privacy policy
                      </Link>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h6">QUESTIONS ABOUT YOUR PRODUCT</Typography>
                    <Typography>
                      Deshop is a decentralized digital exchange platform, if you have any question regarding your
                      products/orders/payments/services please
                    </Typography>
                    <Link color={'textPrimary'} href="https://t.me/deshopfunsupport" target="_blank">
                      contact me
                    </Link>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack direction={'row'} alignItems={'center'} gap={2}>
                      <img
                        src={'/images/ssl_secure_connection.png'}
                        alt={'image'}
                        loading="lazy"
                        width={100}
                        height={50}
                      />
                      <img
                        src={'/images/ssl_secure_connection.png'}
                        alt={'image'}
                        loading="lazy"
                        width={100}
                        height={50}
                      />
                    </Stack>
                    {/* <Typography mt={1}>Serial Number: 123123123123123</Typography> */}
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
