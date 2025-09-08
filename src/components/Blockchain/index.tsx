import { ChevronRight } from '@mui/icons-material';
import {
  Box,
  Link,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import { useSnackPresistStore } from 'lib';
import Image from 'next/image';
import { BLOCKCHAIN, BLOCKCHAINNAMES, CURRENCYS } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { OmitMiddleString } from 'utils/strings';
import { BlockchainOrderType } from 'utils/types';
import { GetBlockchainTxUrlByChainIds } from 'utils/web3';

const Blockchain = () => {
  const [blockchainOrder, setBlockchainOrder] = useState<BlockchainOrderType>();
  const [selectBlockchain, setSelectBlockchain] = useState<BLOCKCHAIN>(BLOCKCHAINNAMES[0]);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async (block: BLOCKCHAIN) => {
    try {
      if (!block) {
        return;
      }

      const response: any = await axios.get(Http.blockchainOrder, {
        params: {
          chain_id: Number(block.chainId),
        },
      });

      if (response.result) {
        setBlockchainOrder(response.data);
      } else {
        setBlockchainOrder(undefined);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    init(BLOCKCHAINNAMES[0]);
  }, []);

  return (
    <Container>
      <Typography variant="h6">Blockchain</Typography>
      <Grid container spacing={2} mt={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" textAlign={'center'}>
                Select blockchain
              </Typography>
              <Stack gap={2} mt={2}>
                {BLOCKCHAINNAMES.map((item, index) => (
                  <Box key={index}>
                    <Button
                      fullWidth
                      variant={item.chainId === selectBlockchain.chainId ? 'contained' : 'outlined'}
                      startIcon={<Image src={item.icon} alt="icon" width={25} height={25} />}
                      onClick={async () => {
                        setSelectBlockchain(item);
                        await init(item);
                      }}
                    >
                      {item.name}
                    </Button>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" textAlign={'center'} mb={2}>
                Latest orders
              </Typography>

              {blockchainOrder?.orders && blockchainOrder.orders.length > 0 ? (
                <>
                  {blockchainOrder.orders.map((item, index) => (
                    <Box key={index} mb={1}>
                      <Card>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
                          <Stack direction={'row'} alignItems={'center'} gap={2}>
                            {item.customer_avatar_url ? (
                              <Avatar sx={{ width: 50, height: 50 }} alt="Avatar" src={item.customer_avatar_url} />
                            ) : (
                              <Avatar sx={{ width: 50, height: 50 }} alt="Avatar" src={'/images/default_avatar.png'} />
                            )}
                            <Typography>{item.customer_username}</Typography>
                            <Typography fontWeight={'bold'}>{item.transactions[0].blockchain.token}</Typography>
                            <Typography fontWeight={'bold'}>
                              {CURRENCYS.find((c) => c.name === item.currency)?.code}
                              {item.total_price}
                            </Typography>
                            <Typography
                              fontWeight={'bold'}
                            >{`1 ${item.transactions[0].blockchain.token} = ${item.transactions[0].blockchain.rate} ${item.currency}`}</Typography>
                            <Link
                              href={GetBlockchainTxUrlByChainIds(
                                selectBlockchain.chainId,
                                String(item.transactions[0].blockchain.hash),
                              )}
                              target="_blank"
                            >
                              {OmitMiddleString(String(item.transactions[0].blockchain.hash))}
                            </Link>
                          </Stack>
                          <Stack direction={'row'} alignItems={'center'} gap={1}>
                            {item.transactions[0].transaction_status === 1 && (
                              <Typography fontWeight={'bold'} color="success">
                                Success
                              </Typography>
                            )}
                            {item.transactions[0].transaction_status === 2 && (
                              <Typography fontWeight={'bold'} color="error">
                                Failure
                              </Typography>
                            )}
                            {item.transactions[0].transaction_status === 3 && (
                              <Typography fontWeight={'bold'} color="info">
                                Pending
                              </Typography>
                            )}
                            {item.transactions[0].transaction_status === 4 && (
                              <Typography fontWeight={'bold'} color="error">
                                Error
                              </Typography>
                            )}
                            <IconButton
                              onClick={() => {
                                window.location.href = `${item.order_status_url}`;
                              }}
                            >
                              <ChevronRight />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Card>
                    </Box>
                  ))}
                </>
              ) : (
                <Card>
                  <CardContent>
                    <Typography>Not found</Typography>
                  </CardContent>
                </Card>
              )}

              <Box py={2}>
                <Divider />
              </Box>

              <Typography variant="h6" textAlign={'center'} mb={2}>
                Blockchain details
              </Typography>
              <Stack gap={2}>
                <Box>
                  <Typography fontWeight={'bold'}>Name</Typography>
                  <Typography mt={1}>{selectBlockchain.name}</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={'bold'}>About</Typography>
                  <Typography mt={1}>{selectBlockchain.desc}</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={'bold'}>Support coins</Typography>
                  <Stack direction={'row'} gap={2} alignItems={'center'} mt={1}>
                    {selectBlockchain.coins.map((item, index) => (
                      <Image src={item.icon} alt="icon" width={25} height={25} key={index} />
                    ))}
                  </Stack>
                </Box>
                <Box>
                  <Typography fontWeight={'bold'} mb={1}>
                    Website
                  </Typography>
                  <Link href={selectBlockchain.websiteUrl || '#'} target="_blank" color={'textPrimary'}>
                    {selectBlockchain.websiteUrl}
                  </Link>
                </Box>
                <Box>
                  <Typography fontWeight={'bold'} mb={1}>
                    Explorer
                  </Typography>
                  <Link href={selectBlockchain.explorerUrl || '#'} target="_blank" color={'textPrimary'}>
                    {selectBlockchain.explorerUrl}
                  </Link>
                </Box>
                <Box>
                  <Typography fontWeight={'bold'}>Rpc</Typography>
                  {selectBlockchain.rpc && selectBlockchain.rpc.length > 0 ? (
                    <Stack gap={1} mt={1}>
                      {selectBlockchain.rpc.map((item, index) => (
                        <Typography key={index}>{item}</Typography>
                      ))}
                    </Stack>
                  ) : (
                    <Typography mt={1}>None</Typography>
                  )}
                </Box>
                <Box>
                  <Typography fontWeight={'bold'} mb={1}>
                    Server Latest Block
                  </Typography>
                  <Typography>{blockchainOrder?.latest_block || 0}</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={'bold'} mb={1}>
                    Server Cache Block
                  </Typography>
                  <Typography>{blockchainOrder?.cache_block || 0}</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={'bold'} mb={1}>
                    Server Sweep Block
                  </Typography>
                  <Typography>{blockchainOrder?.sweep_block || 0}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Blockchain;
