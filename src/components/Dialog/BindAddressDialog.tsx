// import { useSnackPresistStore } from 'lib';
// import { CHAINIDS } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { FindChainNamesByChainids } from 'utils/web3';

// type DialogType = {
//   chain: CHAINIDS;
//   address?: string;
//   openDialog: boolean;
//   handleCloseDialog: () => Promise<void>;
// };

// export default function BindAddressDialog(props: DialogType) {
//   const [address, setAddress] = useState<string>();

//   const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

//   useEffect(() => {
//     setAddress(props.address || '');
//   }, [props.address]);

//   const onClickEditProfile = async () => {
//     try {
//       const response: any = await axios.put(Http.wallet, {
//         handle: 1,
//         chain_id: props.chain,
//         address: address,
//       });

//       if (response.result) {
//         await props.handleCloseDialog();

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

//   return (
//     <Dialog
//       open={props.openDialog}
//       onClose={() => {
//         setAddress('');
//         props.handleCloseDialog();
//       }}
//       fullWidth
//     >
//       <DialogTitle>Bind Address</DialogTitle>
//       <DialogContent>
//         <Stack direction={'row'} alignItems={'center'} gap={1}>
//           <Typography>Chain:</Typography>
//           <Typography fontWeight={'bold'}>{FindChainNamesByChainids(props.chain)}</Typography>
//         </Stack>
//         <Box mt={2}>
//           <Typography mb={1}>Address</Typography>
//           <TextField
//             hiddenLabel
//             size="small"
//             fullWidth
//             value={address}
//             onChange={(e) => {
//               setAddress(e.target.value);
//             }}
//           />
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           variant={'contained'}
//           onClick={() => {
//             setAddress('');
//             props.handleCloseDialog();
//           }}
//         >
//           Close
//         </Button>
//         <Button color="success" variant={'contained'} onClick={onClickEditProfile}>
//           Save Changes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import { useSnackPresistStore } from '@/lib'
import { CHAINIDS } from '@/packages/constants'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { FindChainNamesByChainids } from '@/utils/web3'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link2, Loader2, Wallet } from 'lucide-react'

type DialogType = {
  chain: CHAINIDS
  address?: string
  openDialog: boolean
  handleCloseDialog: () => Promise<void>
}

export default function BindAddressDialog({ chain, address: propsAddress, openDialog, handleCloseDialog }: DialogType) {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)

  const showError = (msg: string) => { setSnackSeverity('error'); setSnackMessage(msg); setSnackOpen(true) }
  const showSuccess = (msg: string) => { setSnackSeverity('success'); setSnackMessage(msg); setSnackOpen(true) }

  useEffect(() => { setAddress(propsAddress || '') }, [propsAddress])

  const handleClose = () => {
    setAddress('')
    handleCloseDialog()
  }

  const onClickSave = async () => {
    // if (!address.trim()) return showError('Please enter a valid address')
    setLoading(true)
    try {
      const response: any = await axios.put(Http.wallet, {
        handle: 1,
        chain_id: chain,
        address,
      })
      if (response.result) {
        await handleCloseDialog()
        showSuccess('Address bound successfully')
      } else {
        showError(response.message)
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const chainName = FindChainNamesByChainids(chain)

  return (
    <Dialog open={openDialog} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl p-0 gap-0 overflow-hidden">

        {/* 顶部渐变区 */}
        <div className="bg-gradient-to-br from-blue-600 to-sky-400 px-6 py-6 flex flex-col items-center gap-2 text-white text-center">
          <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
            <Wallet className="h-7 w-7 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Bind Address</DialogTitle>
          </DialogHeader>
          <p className="text-white/80 text-sm">
            Link your wallet address to receive payments on {chainName}
          </p>
        </div>

        {/* 表单内容 */}
        <div className="px-6 py-5 flex flex-col gap-4">

          {/* 链名称 */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-sky-50 rounded-xl">
            <Link2 className="h-4 w-4 text-sky-500 shrink-0" />
            <span className="text-sm text-sky-700">
              Network: <span className="font-semibold">{chainName}</span>
            </span>
          </div>

          {/* 地址输入 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="address">
              Wallet Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`Enter your ${chainName} address`}
              className="font-mono text-sm"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Make sure this address is correct. Payments will be sent directly to it.
            </p>
          </div>

        </div>

        <DialogFooter className="px-6 pb-6 flex flex-col gap-2">
          <Button
            variant="ghost"
            className="h-10 text-muted-foreground"
            onClick={handleClose}
          >
            Cancel
          </Button>
           <Button
            className="h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
            onClick={onClickSave}
            disabled={loading}
          >
            {loading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <><Link2 className="h-4 w-4" /> Save Address</>
            }
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}