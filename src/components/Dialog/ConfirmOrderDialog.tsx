// import { useState } from 'react';
// import { useSnackPresistStore } from 'lib';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';

// type DialogType = {
//   orderId: number;
//   confirmNumber: string;
//   openDialog: boolean;
//   handleCloseDialog: () => Promise<void>;
// };

// export default function ConfirmOrderDialog(props: DialogType) {
//   const [text, setText] = useState<string>('');

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

//   const onClickConfirm = async () => {
//     try {
//       if (!props.orderId) {
//         return;
//       }

//       if (!text || text === '' || text !== props.confirmNumber) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect text input');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.put(Http.order_confirm, {
//         order_id: props.orderId,
//         confirm_number: text,
//       });

//       if (response.result) {
//         await props.handleCloseDialog();

//         setSnackSeverity('success');
//         setSnackMessage('Confirm successfully');
//         setSnackOpen(true);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage('Confirm Failed');
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   return (
//     <Dialog
//       open={props.openDialog}
//       onClose={() => {
//         props.handleCloseDialog();
//       }}
//       fullWidth
//     >
//       <DialogTitle>Confirm order</DialogTitle>
//       <DialogContent>
//         <Typography>
//           To confirm, type "<b>{props.confirmNumber}</b>" in the box below
//         </Typography>
//         <Box py={1}>
//           <TextField
//             hiddenLabel
//             size="small"
//             fullWidth
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//             }}
//           />
//         </Box>
//         <Button
//           color="success"
//           fullWidth
//           variant={'contained'}
//           onClick={() => {
//             onClickConfirm();
//           }}
//         >
//           Confirm the order
//         </Button>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           variant={'contained'}
//           onClick={() => {
//             props.handleCloseDialog();
//           }}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import { useState } from 'react'
import { useSnackPresistStore } from '@/lib'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PackageCheck, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type DialogType = {
  orderId: number
  confirmNumber: string
  openDialog: boolean
  handleCloseDialog: () => Promise<void>
}

export default function ConfirmOrderDialog({ orderId, confirmNumber, openDialog, handleCloseDialog }: DialogType) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const showError = (msg: string) => { setSnackSeverity('error'); setSnackMessage(msg); setSnackOpen(true) }
  const showSuccess = (msg: string) => { setSnackSeverity('success'); setSnackMessage(msg); setSnackOpen(true) }

  const isMatch = text === confirmNumber
  const hasInput = text.length > 0

  const handleClose = () => {
    setText('')
    handleCloseDialog()
  }

  const onClickConfirm = async () => {
    if (!orderId) return
    if (!text || text !== confirmNumber) return showError('Incorrect confirmation text')
    setLoading(true)
    try {
      const response: any = await axios.put(Http.order_confirm, {
        order_id: orderId,
        confirm_number: text,
      })
      if (response.result) {
        await handleCloseDialog()
        showSuccess('Order confirmed successfully')
      } else {
        showError('Confirmation failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl p-0 gap-0 overflow-hidden">

        {/* 顶部渐变区 */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-400 px-6 py-6 flex flex-col items-center gap-2 text-white text-center">
          <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
            <PackageCheck className="h-7 w-7 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Confirm Order</DialogTitle>
          </DialogHeader>
          <p className="text-white/80 text-sm">
            This action is irreversible. Please confirm carefully.
          </p>
        </div>

        {/* 表单内容 */}
        <div className="px-6 py-5 flex flex-col gap-4">

          {/* 警告提示 */}
          <div className="flex items-start gap-2 px-4 py-3 bg-amber-50 rounded-xl text-amber-700">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p className="text-sm">
              To confirm, type <span className="font-bold font-mono bg-amber-100 px-1.5 py-0.5 rounded">{confirmNumber}</span> in the box below.
            </p>
          </div>

          {/* 输入框 */}
          <div className="flex flex-col gap-1.5">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Type "${confirmNumber}" to confirm`}
              className={cn(
                "font-mono transition-colors",
                hasInput && (isMatch
                  ? "border-green-400 focus-visible:ring-green-300"
                  : "border-red-300 focus-visible:ring-red-200"
                )
              )}
              onKeyDown={(e) => { if (e.key === 'Enter' && isMatch) onClickConfirm() }}
              autoFocus
            />
            {hasInput && (
              <p className={cn(
                "text-xs",
                isMatch ? "text-green-500" : "text-red-400"
              )}>
                {isMatch ? '✓ Confirmation text matches' : '✗ Text does not match'}
              </p>
            )}
          </div>

        </div>

        <DialogFooter className="px-6 pb-6 flex flex-col gap-2">
            <Button
            variant="ghost"
            className="w-full h-10 text-muted-foreground"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className={cn(
              "w-full h-11 font-semibold gap-2 transition-all",
              isMatch
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
            onClick={onClickConfirm}
            disabled={!isMatch || loading}
          >
            {loading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <><PackageCheck className="h-4 w-4" /> Confirm Order</>
            }
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}