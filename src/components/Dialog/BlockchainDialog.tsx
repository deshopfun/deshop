// import Link from 'next/link';
// import { CHAINIDS } from 'packages/constants';
// import { OmitMiddleString } from 'utils/strings';
// import { TransactionType } from 'utils/types';
// import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3';

// type DialogType = {
//   currency: string;
//   transactions: TransactionType[];
//   openDialog: boolean;
//   handleCloseDialog: () => Promise<void>;
// };

// export default function BlockchainDialog(props: DialogType) {
//   return (
//     <Dialog
//       open={props.openDialog}
//       onClose={() => {
//         props.handleCloseDialog();
//       }}
//       fullWidth
//     >
//       <DialogTitle>Blockchain</DialogTitle>
//       <DialogContent>
//         {props.transactions && props.transactions.length > 0 ? (
//           props.transactions.map((item, index) => (
//             <Box key={index}>
//               {item.select === 1 && (
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'right'}>
//                   <Chip label={'Select'} color={'success'} size="small" />
//                 </Stack>
//               )}

//               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Typography>Chain</Typography>
//                 <Typography fontWeight={'bold'}>{FindChainNamesByChainids(item.blockchain.chain_id)}</Typography>
//               </Stack>
//               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Typography>Hash</Typography>
//                 <Link
//                   href={GetBlockchainTxUrlByChainIds(
//                     item.blockchain.chain_id as CHAINIDS,
//                     String(item.blockchain.hash),
//                   )}
//                   target="_blank"
//                 >
//                   {OmitMiddleString(String(item.blockchain.hash))}
//                 </Link>
//               </Stack>
//               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Typography>From address</Typography>
//                 <Link
//                   href={GetBlockchainAddressUrlByChainIds(
//                     item.blockchain.chain_id as CHAINIDS,
//                     String(item.blockchain.from_address),
//                   )}
//                   target="_blank"
//                 >
//                   {OmitMiddleString(String(item.blockchain.from_address))}
//                 </Link>
//               </Stack>
//               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Typography>To address</Typography>
//                 <Link
//                   href={GetBlockchainAddressUrlByChainIds(
//                     item.blockchain.chain_id as CHAINIDS,
//                     String(item.blockchain.to_address),
//                   )}
//                   target="_blank"
//                 >
//                   {OmitMiddleString(String(item.blockchain.to_address))}
//                 </Link>
//               </Stack>
//               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Typography>Token</Typography>
//                 <Typography fontWeight={'bold'}>{item.blockchain.token}</Typography>
//               </Stack>
//               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Typography>Crypto amount</Typography>
//                 <Typography fontWeight={'bold'}>{item.blockchain.crypto_amount}</Typography>
//               </Stack>
//               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Typography>Rate</Typography>
//                 {item.blockchain.rate && (
//                   <Typography
//                     fontWeight={'bold'}
//                   >{`1 ${item.blockchain.token} = ${item.blockchain.rate} ${item.currency}`}</Typography>
//                 )}
//               </Stack>
//               {item.blockchain.block_timestamp > 0 && (
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Block timestamp</Typography>
//                   <Typography fontWeight={'bold'}>
//                     {new Date(Number(item.blockchain.block_timestamp)).toLocaleString()}
//                   </Typography>
//                 </Stack>
//               )}

//               <Box py={2}>
//                 <Divider />
//               </Box>
//             </Box>
//           ))
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
import { TransactionType } from 'utils/types'
import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ExternalLink, Link2, ArrowRight, Coins, Clock, BarChart2, CheckCircle2, Database } from 'lucide-react'

type DialogType = {
  currency: string
  transactions: TransactionType[]
  openDialog: boolean
  handleCloseDialog: () => Promise<void>
}

// 信息行组件
const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-2 border-b border-dashed border-gray-100 last:border-0">
    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
    <div className="text-sm font-medium text-right">{children}</div>
  </div>
)

// 区块链链接组件
const ChainLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    target="_blank"
    className="flex items-center gap-1 text-sky-500 hover:text-sky-600 hover:underline font-mono text-xs transition-colors"
  >
    {label}
    <ExternalLink className="h-3 w-3 shrink-0" />
  </Link>
)

export default function BlockchainDialog({ currency, transactions, openDialog, handleCloseDialog }: DialogType) {
  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-w-lg rounded-2xl p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">

        {/* 顶部渐变区 */}
        <div className="bg-gradient-to-br from-blue-600 to-sky-400 px-6 py-6 flex flex-col items-center gap-2 text-white text-center shrink-0">
          <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
            <Database className="h-7 w-7 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Blockchain Records</DialogTitle>
          </DialogHeader>
          <p className="text-white/80 text-sm">
            {transactions?.length > 0
              ? `${transactions.length} transaction record${transactions.length !== 1 ? 's' : ''} found`
              : 'No transactions recorded yet'
            }
          </p>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {transactions && transactions.length > 0 ? (
            <div className="flex flex-col gap-4">
              {transactions.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border overflow-hidden"
                >
                  {/* 交易头部 */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b">
                    <div className="flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-sky-500" />
                      <span className="text-sm font-semibold">
                        {FindChainNamesByChainids(item.blockchain.chain_id)}
                      </span>
                    </div>
                    {item.select === 1 && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Selected
                      </div>
                    )}
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
                        <Coins className="h-3.5 w-3.5 text-amber-500" />
                        {item.blockchain.token}
                      </div>
                    </InfoRow>

                    <InfoRow label="Amount">
                      <div className="flex items-center gap-1">
                        <span className="font-bold">{item.blockchain.crypto_amount}</span>
                        <span className="text-muted-foreground">{item.blockchain.token}</span>
                      </div>
                    </InfoRow>

                    {item.blockchain.rate && (
                      <InfoRow label="Rate">
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <BarChart2 className="h-3.5 w-3.5" />
                          <span>1 {item.blockchain.token}</span>
                          <ArrowRight className="h-3 w-3" />
                          <span className="font-semibold text-gray-800">
                            {item.blockchain.rate} {currency}
                          </span>
                        </div>
                      </InfoRow>
                    )}

                    {item.blockchain.block_timestamp > 0 && (
                      <InfoRow label="Timestamp">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(Number(item.blockchain.block_timestamp)).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                      </InfoRow>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                <Database className="h-7 w-7 text-gray-300" />
              </div>
              <p className="font-medium text-sm">No blockchain records</p>
              <p className="text-xs text-muted-foreground">No payments have been recorded yet.</p>
            </div>
          )}
        </div>

        {/* 底部关闭 */}
        <DialogFooter className="px-6 py-4 border-t shrink-0">
          <Button
            variant="outline"
            className="w-full h-10"
            onClick={handleCloseDialog}
          >
            Close
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}