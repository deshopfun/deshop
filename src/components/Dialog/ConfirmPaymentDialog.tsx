// import Link from 'next/link';
// import { CHAINIDS } from 'packages/constants';
// import { OmitMiddleString } from 'utils/strings';
// import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3';
// import { useState } from 'react';
// import { useSnackPresistStore } from 'lib';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { TransactionType } from 'utils/types';

// type DialogType = {
//   orderId: number;
//   confirmNumber: string;
//   transactions: TransactionType[];
//   openDialog: boolean;
//   handleCloseDialog: () => Promise<void>;
// };

// export default function ConfirmPaymentDialog(props: DialogType) {
//   const [text, setText] = useState<string>('');
//   const [selectId, setSelectId] = useState<number>(0);

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

//       if (!selectId) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect tx select');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.put(Http.order_confirm_payment, {
//         order_id: props.orderId,
//         confirm_payment_id: Number(selectId),
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
//       <DialogTitle>Confirm payment</DialogTitle>
//       <DialogContent>
//         {props.transactions && props.transactions.length > 0 ? (
//           <Box>
//             {props.transactions.map((item, index) => (
//               <Box key={index}>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Select</Typography>
//                   <Radio
//                     size="small"
//                     checked={item.transaction_id === selectId ? true : false}
//                     onClick={() => {
//                       setSelectId(item.transaction_id);
//                     }}
//                   />
//                 </Stack>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Chain</Typography>
//                   <Typography fontWeight={'bold'}>{FindChainNamesByChainids(item.blockchain.chain_id)}</Typography>
//                 </Stack>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Hash</Typography>
//                   <Link
//                     href={GetBlockchainTxUrlByChainIds(
//                       item.blockchain.chain_id as CHAINIDS,
//                       String(item.blockchain.hash),
//                     )}
//                     target="_blank"
//                   >
//                     {OmitMiddleString(String(item.blockchain.hash))}
//                   </Link>
//                 </Stack>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>From address</Typography>
//                   <Link
//                     href={GetBlockchainAddressUrlByChainIds(
//                       item.blockchain.chain_id as CHAINIDS,
//                       String(item.blockchain.from_address),
//                     )}
//                     target="_blank"
//                   >
//                     {OmitMiddleString(String(item.blockchain.from_address))}
//                   </Link>
//                 </Stack>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>To address</Typography>
//                   <Link
//                     href={GetBlockchainAddressUrlByChainIds(
//                       item.blockchain.chain_id as CHAINIDS,
//                       String(item.blockchain.to_address),
//                     )}
//                     target="_blank"
//                   >
//                     {OmitMiddleString(String(item.blockchain.to_address))}
//                   </Link>
//                 </Stack>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Token</Typography>
//                   <Typography fontWeight={'bold'}>{item.blockchain.token}</Typography>
//                 </Stack>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Crypto amount</Typography>
//                   <Typography fontWeight={'bold'}>{item.blockchain.crypto_amount}</Typography>
//                 </Stack>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Rate</Typography>
//                   <Typography
//                     fontWeight={'bold'}
//                   >{`1 ${item.blockchain.token} = ${item.blockchain.rate} USD`}</Typography>
//                 </Stack>
//                 {item.blockchain.block_timestamp > 0 && (
//                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                     <Typography>Block timestamp</Typography>
//                     <Typography fontWeight={'bold'}>
//                       {new Date(Number(item.blockchain.block_timestamp)).toLocaleString()}
//                     </Typography>
//                   </Stack>
//                 )}

//                 <Box py={2}>
//                   <Divider />
//                 </Box>
//               </Box>
//             ))}
//             <Typography>
//               To confirm, type "<b>{props.confirmNumber}</b>" in the box below
//             </Typography>
//             <Box py={1}>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={text}
//                 onChange={(e) => {
//                   setText(e.target.value);
//                 }}
//               />
//             </Box>
//             <Button
//               color="success"
//               fullWidth
//               variant={'contained'}
//               onClick={() => {
//                 onClickConfirm();
//               }}
//             >
//               Confirm the payment
//             </Button>
//           </Box>
//         ) : (
//           <Card>
//             <CardContent>
//               <Box py={2} textAlign={'center'}>
//                 <Typography variant="h6">blockchain is empty</Typography>
//                 <Typography mt={2}>No records have been paid.</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         )}
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

import Link from 'next/link'
import { CHAINIDS } from 'packages/constants'
import { OmitMiddleString } from 'utils/strings'
import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3'
import { useState } from 'react'
import { useSnackPresistStore } from 'lib'
import axios from 'utils/http/axios'
import { Http } from 'utils/http/http'
import { TransactionType } from 'utils/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CreditCard, ExternalLink, Loader2, AlertCircle, Coins, ArrowRight, Clock, CheckCircle2, Database } from 'lucide-react'
import { cn } from '@/lib/utils'

type DialogType = {
  orderId: number
  confirmNumber: string
  transactions: TransactionType[]
  openDialog: boolean
  handleCloseDialog: () => Promise<void>
}

// 信息行组件
const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-1.5 border-b border-dashed border-gray-100 last:border-0">
    <span className="text-xs text-muted-foreground shrink-0">{label}</span>
    <div className="text-xs font-medium text-right">{children}</div>
  </div>
)

// 链接组件
const ChainLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} target="_blank"
    className="flex items-center gap-1 text-sky-500 hover:text-sky-600 hover:underline font-mono transition-colors">
    {label}
    <ExternalLink className="h-3 w-3 shrink-0" />
  </Link>
)

export default function ConfirmPaymentDialog({ orderId, confirmNumber, transactions, openDialog, handleCloseDialog }: DialogType) {
  const [text, setText] = useState('')
  const [selectId, setSelectId] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const showError = (msg: string) => { setSnackSeverity('error'); setSnackMessage(msg); setSnackOpen(true) }
  const showSuccess = (msg: string) => { setSnackSeverity('success'); setSnackMessage(msg); setSnackOpen(true) }

  const isMatch = text === confirmNumber
  const hasInput = text.length > 0
  const canConfirm = isMatch && selectId > 0

  const handleClose = () => {
    setText('')
    setSelectId(0)
    handleCloseDialog()
  }

  const onClickConfirm = async () => {
    if (!orderId) return
    if (!text || text !== confirmNumber) return showError('Incorrect confirmation text')
    if (!selectId) return showError('Please select a transaction')
    setLoading(true)
    try {
      const response: any = await axios.put(Http.order_confirm_payment, {
        order_id: orderId,
        confirm_payment_id: Number(selectId),
        confirm_number: text,
      })
      if (response.result) {
        await handleCloseDialog()
        showSuccess('Payment confirmed successfully')
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
      <DialogContent className="max-w-lg rounded-2xl p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">

        {/* 顶部渐变区 */}
        <div className="bg-gradient-to-br from-blue-600 to-sky-400 px-6 py-6 flex flex-col items-center gap-2 text-white text-center shrink-0">
          <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
            <CreditCard className="h-7 w-7 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Confirm Payment</DialogTitle>
          </DialogHeader>
          <p className="text-white/80 text-sm">
            Select the correct transaction and confirm the payment
          </p>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {transactions && transactions.length > 0 ? (
            <>
              {/* 交易列表 */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Select Transaction
                </p>
                {transactions.map((item, index) => {
                  const isSelected = item.transaction_id === selectId
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectId(item.transaction_id)}
                      className={cn(
                        "w-full text-left rounded-xl border-2 overflow-hidden transition-all duration-200",
                        isSelected
                          ? "border-sky-400 shadow-md shadow-sky-100"
                          : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      {/* 交易头部 */}
                      <div className={cn(
                        "flex items-center justify-between px-4 py-2.5 border-b transition-colors",
                        isSelected ? "bg-sky-50 border-sky-100" : "bg-gray-50 border-gray-100"
                      )}>
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-sky-500" />
                          <span className="text-sm font-semibold">
                            {FindChainNamesByChainids(item.blockchain.chain_id)}
                          </span>
                        </div>
                        <div className={cn(
                          "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          isSelected
                            ? "border-sky-500 bg-sky-500"
                            : "border-gray-300"
                        )}>
                          {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                        </div>
                      </div>

                      {/* 交易详情 */}
                      <div className="px-4 py-2">
                        <InfoRow label="Tx Hash">
                          <ChainLink
                            href={GetBlockchainTxUrlByChainIds(item.blockchain.chain_id as CHAINIDS, String(item.blockchain.hash))}
                            label={OmitMiddleString(String(item.blockchain.hash))}
                          />
                        </InfoRow>
                        <InfoRow label="From">
                          <ChainLink
                            href={GetBlockchainAddressUrlByChainIds(item.blockchain.chain_id as CHAINIDS, String(item.blockchain.from_address))}
                            label={OmitMiddleString(String(item.blockchain.from_address))}
                          />
                        </InfoRow>
                        <InfoRow label="To">
                          <ChainLink
                            href={GetBlockchainAddressUrlByChainIds(item.blockchain.chain_id as CHAINIDS, String(item.blockchain.to_address))}
                            label={OmitMiddleString(String(item.blockchain.to_address))}
                          />
                        </InfoRow>
                        <InfoRow label="Token">
                          <div className="flex items-center gap-1">
                            <Coins className="h-3 w-3 text-amber-500" />
                            {item.blockchain.token}
                          </div>
                        </InfoRow>
                        <InfoRow label="Amount">
                          <span className="font-bold">{item.blockchain.crypto_amount} {item.blockchain.token}</span>
                        </InfoRow>
                        {item.blockchain.rate && (
                          <InfoRow label="Rate">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <span>1 {item.blockchain.token}</span>
                              <ArrowRight className="h-3 w-3" />
                              <span className="font-semibold text-gray-800">{item.blockchain.rate} USD</span>
                            </div>
                          </InfoRow>
                        )}
                        {item.blockchain.block_timestamp > 0 && (
                          <InfoRow label="Timestamp">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(Number(item.blockchain.block_timestamp)).toLocaleString('en-US', {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                              })}
                            </div>
                          </InfoRow>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* 确认码输入 */}
              <div className="flex flex-col gap-3 border-t pt-4">
                <div className="flex items-start gap-2 px-4 py-3 bg-amber-50 rounded-xl text-amber-700">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    To confirm, type <span className="font-bold font-mono bg-amber-100 px-1.5 py-0.5 rounded">{confirmNumber}</span> below.
                  </p>
                </div>

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
                  onKeyDown={(e) => { if (e.key === 'Enter' && canConfirm) onClickConfirm() }}
                />
                {hasInput && (
                  <p className={cn("text-xs", isMatch ? "text-green-500" : "text-red-400")}>
                    {isMatch ? '✓ Confirmation text matches' : '✗ Text does not match'}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                <Database className="h-7 w-7 text-gray-300" />
              </div>
              <p className="font-medium text-sm">No transactions found</p>
              <p className="text-xs text-muted-foreground">No payment records have been recorded yet.</p>
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        <DialogFooter className="px-6 py-4 border-t shrink-0 flex flex-col gap-2">
          <Button variant="ghost" className="w-full h-10 text-muted-foreground" onClick={handleClose}>
            Cancel
          </Button>
          
          {transactions?.length > 0 && (
            <Button
              className={cn(
                "w-full h-11 font-semibold gap-2 transition-all",
                canConfirm
                  ? "bg-sky-500 hover:bg-sky-600 text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
              onClick={onClickConfirm}
              disabled={!canConfirm || loading}
            >
              {loading
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : <><CreditCard className="h-4 w-4" /> Confirm Payment</>
              }
            </Button>
          )}
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}