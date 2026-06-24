// import BindAddressDialog from 'components/Dialog/BindAddressDialog';
// import { useSnackPresistStore } from 'lib';
// import Image from 'next/image';
// import { BLOCKCHAINNAMES, CHAINIDS, COINS } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import { OmitMiddleString } from 'utils/strings';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { WalletType } from 'utils/types';

// const ManageWallet = () => {
//   const [username, setUsername] = useState<string>('');
//   const [wallets, setWallets] = useState<WalletType[]>([]);
//   const [selectChain, setSelectChain] = useState<CHAINIDS>(CHAINIDS.BITCOIN);
//   const [selectAddress, setSelectAddress] = useState<string>();
//   const [openEditAddressDialog, setOpenEditAddressDialog] = useState<boolean>(false);

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

//   const init = async () => {
//     try {
//       const response: any = await axios.get(Http.wallet);

//       if (response.result) {
//         setWallets(response.data);
//       } else {
//         setWallets([]);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     init();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const onChangeCoin = async (chain: CHAINIDS, coin: COINS) => {
//     try {
//       let disableCoinArray = wallets
//         .find((item) => item.chain_id === chain)
//         ?.disable_coin.split(',')
//         .filter((item) => item !== '');
//       let newDisableCoin = '';
//       if (disableCoinArray?.includes(coin)) {
//         newDisableCoin = disableCoinArray.filter((item) => item !== coin).join(',');
//       } else {
//         disableCoinArray?.push(coin);
//         newDisableCoin = String(disableCoinArray?.join(','));
//       }

//       const response: any = await axios.put(Http.wallet, {
//         handle: 2,
//         chain_id: chain,
//         disable_coin: newDisableCoin,
//       });

//       if (response.result) {
//         await init();

//         setSnackSeverity('success');
//         setSnackMessage('Update successfully');
//         setSnackOpen(true);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage(response.message);
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   const handleCloseDialog = async () => {
//     await init();
//     setOpenEditAddressDialog(false);
//   };

//   return (
//     <Box>
//       <Typography variant="h6">Setup wallet</Typography>

//       <Box mt={2}>
//         {BLOCKCHAINNAMES &&
//           BLOCKCHAINNAMES.map((item, index) => (
//             <Box key={index} pb={2}>
//               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Stack direction={'row'} alignItems={'center'} gap={2}>
//                   <Typography variant="h6">{item.name}</Typography>
//                   {wallets && wallets.find((walletItem) => walletItem.chain_id === item.chainId)?.address && (
//                     <Chip
//                       label={OmitMiddleString(
//                         String(wallets.find((walletItem) => walletItem.chain_id === item.chainId)?.address),
//                       )}
//                       color="primary"
//                     />
//                   )}
//                 </Stack>
//                 <Button
//                   variant={'contained'}
//                   color={'success'}
//                   onClick={() => {
//                     setSelectChain(item.chainId);
//                     setSelectAddress(
//                       wallets ? wallets.find((walletItem) => walletItem.chain_id === item.chainId)?.address : '',
//                     );
//                     setOpenEditAddressDialog(true);
//                   }}
//                 >
//                   Bind Address
//                 </Button>
//               </Stack>
//               {item.coins &&
//                 item.coins.map((coinItem, coinIndex) => (
//                   <Stack
//                     direction={'row'}
//                     alignItems={'center'}
//                     justifyContent={'space-between'}
//                     key={coinIndex}
//                     py={2}
//                   >
//                     <Stack direction={'row'} alignItems={'center'} gap={1}>
//                       <Image src={coinItem.icon} alt={'image'} width={50} height={50} />
//                       <Typography>{coinItem.name}</Typography>
//                     </Stack>
//                     <Switch
//                       checked={
//                         wallets &&
//                         wallets
//                           .find((walletItem) => walletItem.chain_id === item.chainId)
//                           ?.disable_coin.split(',')
//                           .includes(coinItem.name)
//                           ? false
//                           : true
//                       }
//                       onChange={() => {
//                         onChangeCoin(item.chainId, coinItem.name);
//                       }}
//                     />
//                   </Stack>
//                 ))}
//               <Divider />
//             </Box>
//           ))}

//         <BindAddressDialog
//           chain={selectChain}
//           address={selectAddress}
//           openDialog={openEditAddressDialog}
//           handleCloseDialog={handleCloseDialog}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default ManageWallet;

import BindAddressDialog from 'components/Dialog/BindAddressDialog'
import { useSnackPresistStore } from 'lib'
import Image from 'next/image'
import { BLOCKCHAINNAMES, CHAINIDS, COINS } from 'packages/constants'
import { useEffect, useState } from 'react'
import { OmitMiddleString } from 'utils/strings'
import axios from 'utils/http/axios'
import { Http } from 'utils/http/http'
import { WalletType } from 'utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Wallet, Link2, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const ManageWallet = () => {
  const [wallets, setWallets] = useState<WalletType[]>([])
  const [selectChain, setSelectChain] = useState<CHAINIDS>(CHAINIDS.BITCOIN)
  const [selectAddress, setSelectAddress] = useState<string>()
  const [openEditAddressDialog, setOpenEditAddressDialog] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const showError = (msg: string) => { setSnackSeverity('error'); setSnackMessage(msg); setSnackOpen(true) }
  const showSuccess = (msg: string) => { setSnackSeverity('success'); setSnackMessage(msg); setSnackOpen(true) }

  const init = async () => {
    try {
      const response: any = await axios.get(Http.wallet)
      setWallets(response.result ? response.data : [])
    } catch { showError('Network error. Please try again later.') }
  }

  useEffect(() => { init() }, [])

  const getWallet = (chainId: CHAINIDS) =>
    wallets?.find((w) => w.chain_id === chainId)

  const isCoinEnabled = (chainId: CHAINIDS, coinName: string) => {
    const wallet = getWallet(chainId)
    if (!wallet) return true
    return !wallet.disable_coin.split(',').filter(Boolean).includes(coinName)
  }

  const onChangeCoin = async (chain: CHAINIDS, coin: COINS) => {
    try {
      const wallet = getWallet(chain)
      const disableArray = wallet?.disable_coin.split(',').filter(Boolean) ?? []
      const newDisableCoin = disableArray.includes(coin)
        ? disableArray.filter((c) => c !== coin).join(',')
        : [...disableArray, coin].join(',')

      const response: any = await axios.put(Http.wallet, {
        handle: 2, chain_id: chain, disable_coin: newDisableCoin,
      })
      if (response.result) { await init(); showSuccess('Updated successfully') }
      else showError(response.message)
    } catch { showError('Network error. Please try again later.') }
  }

  const handleCloseDialog = async () => {
    await init()
    setOpenEditAddressDialog(false)
  }

  return (
    <div className="flex flex-col gap-4">

      {/* 标题 */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
          <Wallet className="h-4 w-4 text-sky-500" />
        </div>
        <div>
          <h3 className="font-semibold">Wallet Setup</h3>
          <p className="text-xs text-muted-foreground">Bind your addresses and manage accepted coins</p>
        </div>
      </div>

      {/* 区块链列表 */}
      {BLOCKCHAINNAMES.map((item, index) => {
        const wallet = getWallet(item.chainId)
        const hasAddress = !!wallet?.address

        return (
          <Card key={index} className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-0">

              {/* 链头部 */}
              <div className={cn(
                "px-5 py-4 flex items-center justify-between border-b",
                hasAddress ? "bg-green-50" : "bg-gray-50"
              )}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-9 w-9 rounded-xl flex items-center justify-center",
                    hasAddress ? "bg-green-100" : "bg-gray-100"
                  )}>
                    {hasAddress
                      ? <CheckCircle2 className="h-5 w-5 text-green-500" />
                      : <Wallet className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    {hasAddress ? (
                      <p className="text-xs text-green-600 font-mono mt-0.5">
                        {OmitMiddleString(String(wallet.address))}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-0.5">No address bound</p>
                    )}
                  </div>
                </div>

                <Button
                  size="sm"
                  className={cn(
                    "h-8 gap-1.5 text-xs",
                    hasAddress
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-sky-500 hover:bg-sky-600 text-white"
                  )}
                  onClick={() => {
                    setSelectChain(item.chainId)
                    setSelectAddress(wallet?.address ?? '')
                    setOpenEditAddressDialog(true)
                  }}
                >
                  <Link2 className="h-3.5 w-3.5" />
                  {hasAddress ? 'Edit Address' : 'Bind Address'}
                </Button>
              </div>

              {/* 代币列表 */}
              <div className="divide-y">
                {item.coins.map((coinItem, ci) => {
                  const enabled = isCoinEnabled(item.chainId, coinItem.name)
                  return (
                    <div
                      key={ci}
                      className={cn(
                        "flex items-center justify-between px-5 py-3 transition-colors",
                        !enabled && "opacity-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full overflow-hidden border bg-white flex items-center justify-center shrink-0">
                          <Image src={coinItem.icon} alt={coinItem.name} width={36} height={36} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{coinItem.name}</p>
                          <p className={cn(
                            "text-xs mt-0.5",
                            enabled ? "text-green-500" : "text-muted-foreground"
                          )}>
                            {enabled ? 'Accepted' : 'Disabled'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={enabled}
                        onCheckedChange={() => onChangeCoin(item.chainId, coinItem.name)}
                      />
                    </div>
                  )
                })}
              </div>

            </CardContent>
          </Card>
        )
      })}

      <BindAddressDialog
        chain={selectChain}
        address={selectAddress}
        openDialog={openEditAddressDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  )
}

export default ManageWallet