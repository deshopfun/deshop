// import { useSnackPresistStore } from 'lib';
// import Image from 'next/image';
// import { BLOCKCHAIN, BLOCKCHAINNAMES, CURRENCYS } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { OmitMiddleString } from 'utils/strings';
// import { BlockchainOrderType } from 'utils/types';
// import { GetBlockchainTxUrlByChainIds } from 'utils/web3';

// const Blockchain = () => {
//   const [blockchainOrder, setBlockchainOrder] = useState<BlockchainOrderType>();
//   const [selectBlockchain, setSelectBlockchain] = useState<BLOCKCHAIN>(BLOCKCHAINNAMES[0]);

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

//   const init = async (block: BLOCKCHAIN) => {
//     try {
//       if (!block) {
//         return;
//       }

//       const response: any = await axios.get(Http.blockchainOrder, {
//         params: {
//           chain_id: Number(block.chainId),
//         },
//       });

//       if (response.result) {
//         setBlockchainOrder(response.data);
//       } else {
//         setBlockchainOrder(undefined);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     init(BLOCKCHAINNAMES[0]);
//   }, []);

//   return (
//     <div className="container mx-auto">
//       <p className="text-lg">Blockchain</p>
//       <Grid container spacing={2} mt={4}>
//         <Grid size={{ xs: 12, md: 3 }}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" textAlign={'center'}>
//                 Select blockchain
//               </Typography>
//               <Stack gap={2} mt={2}>
//                 {BLOCKCHAINNAMES.map((item, index) => (
//                   <Box key={index}>
//                     <Button
//                       fullWidth
//                       variant={item.chainId === selectBlockchain.chainId ? 'contained' : 'outlined'}
//                       startIcon={<Image src={item.icon} alt="icon" width={25} height={25} />}
//                       onClick={async () => {
//                         setSelectBlockchain(item);
//                         await init(item);
//                       }}
//                     >
//                       {item.name}
//                     </Button>
//                   </Box>
//                 ))}
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid size={{ xs: 12, md: 9 }}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" textAlign={'center'} mb={2}>
//                 Latest orders
//               </Typography>

//               {blockchainOrder?.orders && blockchainOrder.orders.length > 0 ? (
//                 <>
//                   {blockchainOrder.orders.map((item, index) => (
//                     <Box key={index} mb={1}>
//                       <Card>
//                         <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
//                           <Stack direction={'row'} alignItems={'center'} gap={2}>
//                             {item.customer_avatar_url ? (
//                               <Avatar sx={{ width: 50, height: 50 }} alt="Avatar" src={item.customer_avatar_url} />
//                             ) : (
//                               <Avatar sx={{ width: 50, height: 50 }} alt="Avatar" src={'/images/default_avatar.png'} />
//                             )}
//                             <Typography>{item.customer_username}</Typography>
//                             <Typography fontWeight={'bold'}>{item.transactions[0].blockchain.token}</Typography>
//                             <Typography fontWeight={'bold'}>
//                               {CURRENCYS.find((c) => c.name === item.currency)?.code}
//                               {item.total_price}
//                             </Typography>
//                             <Typography
//                               fontWeight={'bold'}
//                             >{`1 ${item.transactions[0].blockchain.token} = ${item.transactions[0].blockchain.rate} ${item.currency}`}</Typography>
//                             <Link
//                               href={GetBlockchainTxUrlByChainIds(
//                                 selectBlockchain.chainId,
//                                 String(item.transactions[0].blockchain.hash),
//                               )}
//                               target="_blank"
//                             >
//                               {OmitMiddleString(String(item.transactions[0].blockchain.hash))}
//                             </Link>
//                           </Stack>
//                           <Stack direction={'row'} alignItems={'center'} gap={1}>
//                             {item.transactions[0].transaction_status === 1 && (
//                               <Typography fontWeight={'bold'} color="success">
//                                 Success
//                               </Typography>
//                             )}
//                             {item.transactions[0].transaction_status === 2 && (
//                               <Typography fontWeight={'bold'} color="error">
//                                 Failure
//                               </Typography>
//                             )}
//                             {item.transactions[0].transaction_status === 3 && (
//                               <Typography fontWeight={'bold'} color="info">
//                                 Pending
//                               </Typography>
//                             )}
//                             {item.transactions[0].transaction_status === 4 && (
//                               <Typography fontWeight={'bold'} color="error">
//                                 Error
//                               </Typography>
//                             )}
//                             <IconButton
//                               onClick={() => {
//                                 window.location.href = `${item.order_status_url}`;
//                               }}
//                             >
//                               {/* <ChevronRight /> */}
//                             </IconButton>
//                           </Stack>
//                         </Stack>
//                       </Card>
//                     </Box>
//                   ))}
//                 </>
//               ) : (
//                 <Card>
//                   <CardContent>
//                     <Typography>Not found</Typography>
//                   </CardContent>
//                 </Card>
//               )}

//               <Box py={2}>
//                 <Divider />
//               </Box>

//               <Typography variant="h6" textAlign={'center'} mb={2}>
//                 Blockchain details
//               </Typography>
//               <Stack gap={2}>
//                 <Box>
//                   <Typography fontWeight={'bold'}>Name</Typography>
//                   <Typography mt={1}>{selectBlockchain.name}</Typography>
//                 </Box>
//                 <Box>
//                   <Typography fontWeight={'bold'}>About</Typography>
//                   <Typography mt={1}>{selectBlockchain.desc}</Typography>
//                 </Box>
//                 <Box>
//                   <Typography fontWeight={'bold'}>Support coins</Typography>
//                   <Stack direction={'row'} gap={2} alignItems={'center'} mt={1}>
//                     {selectBlockchain.coins.map((item, index) => (
//                       <Image src={item.icon} alt="icon" width={25} height={25} key={index} />
//                     ))}
//                   </Stack>
//                 </Box>
//                 <Box>
//                   <Typography fontWeight={'bold'} mb={1}>
//                     Website
//                   </Typography>
//                   <Link href={selectBlockchain.websiteUrl || '#'} target="_blank" color={'textPrimary'}>
//                     {selectBlockchain.websiteUrl}
//                   </Link>
//                 </Box>
//                 <Box>
//                   <Typography fontWeight={'bold'} mb={1}>
//                     Explorer
//                   </Typography>
//                   <Link href={selectBlockchain.explorerUrl || '#'} target="_blank" color={'textPrimary'}>
//                     {selectBlockchain.explorerUrl}
//                   </Link>
//                 </Box>
//                 <Box>
//                   <Typography fontWeight={'bold'}>Rpc</Typography>
//                   {selectBlockchain.rpc && selectBlockchain.rpc.length > 0 ? (
//                     <Stack gap={1} mt={1}>
//                       {selectBlockchain.rpc.map((item, index) => (
//                         <Typography key={index}>{item}</Typography>
//                       ))}
//                     </Stack>
//                   ) : (
//                     <Typography mt={1}>None</Typography>
//                   )}
//                 </Box>
//                 <Box>
//                   <Typography fontWeight={'bold'} mb={1}>
//                     Server Latest Block
//                   </Typography>
//                   <Typography>{blockchainOrder?.latest_block || 0}</Typography>
//                 </Box>
//                 <Box>
//                   <Typography fontWeight={'bold'} mb={1}>
//                     Server Cache Block
//                   </Typography>
//                   <Typography>{blockchainOrder?.cache_block || 0}</Typography>
//                 </Box>
//                 <Box>
//                   <Typography fontWeight={'bold'} mb={1}>
//                     Server Sweep Block
//                   </Typography>
//                   <Typography>{blockchainOrder?.sweep_block || 0}</Typography>
//                 </Box>
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Blockchain;

import { useSnackPresistStore } from '@/lib'
import Image from 'next/image'
import { BLOCKCHAIN, BLOCKCHAINNAMES, CURRENCYS } from '@/packages/constants'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { OmitMiddleString } from '@/utils/strings'
import { BlockchainOrderType } from '@/utils/types'
import { GetBlockchainTxUrlByChainIds } from '@/utils/web3'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, ChevronRight, Wallet } from 'lucide-react'

const Blockchain = () => {
  const [blockchainOrder, setBlockchainOrder] = useState<BlockchainOrderType>()
  const [selectBlockchain, setSelectBlockchain] = useState<BLOCKCHAIN>(BLOCKCHAINNAMES[0])

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const init = async (block: BLOCKCHAIN) => {
    try {
      if (!block) return

      const response: any = await axios.get(Http.blockchainOrder, {
        params: { chain_id: Number(block.chainId) },
      })

      if (response.result) {
        setBlockchainOrder(response.data)
      } else {
        setBlockchainOrder(undefined)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    }
  }

  useEffect(() => {
    init(BLOCKCHAINNAMES[0])
  }, [])

  const handleSelectBlockchain = async (item: BLOCKCHAIN) => {
    setSelectBlockchain(item)
    await init(item)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Wallet className="w-8 h-8" />
        <h1 className="text-3xl font-bold tracking-tight">Blockchain</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar - Blockchain Selector */}
        <div className="lg:col-span-3">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-center">Select Blockchain</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {BLOCKCHAINNAMES.map((item) => (
                <Button
                  key={item.chainId}
                  variant={item.chainId === selectBlockchain.chainId ? 'default' : 'outline'}
                  className="w-full justify-start h-auto py-3"
                  onClick={() => handleSelectBlockchain(item)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Latest Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {blockchainOrder?.orders && blockchainOrder.orders.length > 0 ? (
                <div className="space-y-4">
                  {blockchainOrder.orders.map((item, index) => {
                    const tx = item.transactions[0]
                    const currencySymbol =
                      CURRENCYS.find((c) => c.name === item.currency)?.code || '$'

                    return (
                      <Card key={index} className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={item.customer_avatar_url} />
                              <AvatarFallback>👤</AvatarFallback>
                            </Avatar>

                            <div>
                              <p className="font-semibold">{item.customer_username}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{tx.blockchain.token}</span>
                                <span>•</span>
                                <span>
                                  {currencySymbol}
                                  {item.total_price}
                                </span>
                              </div>
                            </div>

                            <div className="hidden sm:block text-sm">
                              <p className="font-mono text-xs">
                                1 {tx.blockchain.token} = {tx.blockchain.rate} {item.currency}
                              </p>
                              <a
                                href={GetBlockchainTxUrlByChainIds(
                                  selectBlockchain.chainId,
                                  String(tx.blockchain.hash)
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                              >
                                {OmitMiddleString(String(tx.blockchain.hash))}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <Badge
                              variant={
                                tx.transaction_status === 1
                                  ? 'default'
                                  : tx.transaction_status === 2 || tx.transaction_status === 4
                                    ? 'destructive'
                                    : 'secondary'
                              }
                            >
                              {tx.transaction_status === 1 && 'Success'}
                              {tx.transaction_status === 2 && 'Failure'}
                              {tx.transaction_status === 3 && 'Pending'}
                              {tx.transaction_status === 4 && 'Error'}
                            </Badge>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => window.open(item.order_status_url, '_blank')}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-16 text-center">
                    <p className="text-muted-foreground">No orders found</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Blockchain Details */}
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="font-semibold mb-1">Name</p>
                <p>{selectBlockchain.name}</p>
              </div>

              <div>
                <p className="font-semibold mb-1">About</p>
                <p className="text-muted-foreground">{selectBlockchain.desc}</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Support Coins</p>
                <div className="flex flex-wrap gap-3">
                  {selectBlockchain.coins.map((coin, index) => (
                    <Image
                      key={index}
                      src={coin.icon}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold mb-1">Website</p>
                <a
                  href={selectBlockchain.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {selectBlockchain.websiteUrl}
                </a>
              </div>

              <div>
                <p className="font-semibold mb-1">Explorer</p>
                <a
                  href={selectBlockchain.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {selectBlockchain.explorerUrl}
                </a>
              </div>

              <div>
                <p className="font-semibold mb-2">RPC Endpoints</p>
                {selectBlockchain.rpc && selectBlockchain.rpc.length > 0 ? (
                  <div className="space-y-1 text-sm font-mono bg-muted p-3 rounded-md">
                    {selectBlockchain.rpc.map((rpc, index) => (
                      <p key={index}>{rpc}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">None</p>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Latest Block</p>
                  <p className="text-2xl font-semibold">{blockchainOrder?.latest_block || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cache Block</p>
                  <p className="text-2xl font-semibold">{blockchainOrder?.cache_block || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sweep Block</p>
                  <p className="text-2xl font-semibold">{blockchainOrder?.sweep_block || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Blockchain
