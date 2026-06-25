// import { useSnackPresistStore, useUserPresistStore } from 'lib';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { CHAINIDS } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { OmitMiddleString } from 'utils/strings';
// import { OrderType } from 'utils/types';
// import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3';

// const OrderDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [order, setOrder] = useState<OrderType>();

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
//   const { getUuid } = useUserPresistStore((state) => state);

//   const init = async (orderId: any) => {
//     try {
//       if (!orderId) {
//         return;
//       }

//       const response: any = await axios.get(Http.order_by_id, {
//         params: {
//           order_id: Number(orderId),
//         },
//       });

//       if (response.result) {
//         setOrder(response.data);
//       } else {
//         setOrder(undefined);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       init(id);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   return (
//     <Container>
//       {order ? (
//         <>
//           <Box mt={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Order status</Typography>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Payment status</Typography>
//                   <Typography fontWeight={'bold'} color={order?.payment_confirmed === 1 ? 'success' : 'error'}>
//                     {order?.payment_confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
//                   </Typography>
//                 </Stack>
//                 {/* <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Shipping status</Typography>
//                   <Typography fontWeight={'bold'} color={order?.shipping_confirmed === 1 ? 'success' : 'error'}>
//                     {order?.shipping_confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
//                   </Typography>
//                 </Stack> */}
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Order status</Typography>
//                   <Typography fontWeight={'bold'} color={order?.confirmed === 1 ? 'success' : 'error'}>
//                     {order?.confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
//                   </Typography>
//                 </Stack>

//                 <Typography variant="h6" mt={2}>
//                   Base info
//                 </Typography>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Buyer username</Typography>
//                   <Link href={`/profile/${order?.customer_username}`}>
//                     <Typography>{order?.customer_username}</Typography>
//                   </Link>
//                 </Stack>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Buyer email</Typography>
//                   <Typography fontWeight={'bold'}>{order?.customer_email}</Typography>
//                 </Stack>
//                 {Number(order?.sub_total_price) > 0 && (
//                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                     <Typography>Subtotal</Typography>
//                     <Typography fontWeight={'bold'}>
//                       {order?.sub_total_price} {order?.currency}
//                     </Typography>
//                   </Stack>
//                 )}
//                 {/* {Number(order?.total_shipping) > 0 && (
//                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                     <Typography>Shipping</Typography>
//                     <Typography fontWeight={'bold'}>
//                       {order?.total_shipping} {order?.currency}
//                     </Typography>
//                   </Stack>
//                 )} */}
//                 {Number(order?.total_tax) > 0 && (
//                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                     <Typography>Tax</Typography>
//                     <Typography fontWeight={'bold'}>
//                       {order?.total_tax} {order?.currency}
//                     </Typography>
//                   </Stack>
//                 )}
//                 {Number(order?.total_tip) > 0 && (
//                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                     <Typography>Tip</Typography>
//                     <Typography fontWeight={'bold'}>
//                       {order?.total_tip} {order?.currency}
//                     </Typography>
//                   </Stack>
//                 )}
//                 {Number(order?.total_discounts) > 0 && (
//                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                     <Typography>Discounts</Typography>
//                     <Typography fontWeight={'bold'}>
//                       {order?.total_discounts} {order?.currency}
//                     </Typography>
//                   </Stack>
//                 )}
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography>Total</Typography>
//                   <Typography fontWeight={'bold'}>
//                     {order?.total_price || 0} {order?.currency}
//                   </Typography>
//                 </Stack>

//                 <Typography variant="h6" mt={2}>
//                   Order items
//                 </Typography>
//                 {order?.items &&
//                   order.items.length > 0 &&
//                   order.items.map((item, index) => (
//                     <Box key={index}>
//                       <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                         <Typography>Image</Typography>
//                         <Link href={`/products/${item.product_id}`}>
//                           <img src={item.image} alt="image" width={50} height={50} />
//                         </Link>
//                       </Stack>
//                       <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                         <Typography>Title</Typography>
//                         <Link href={`/products/${item.product_id}`}>
//                           <Typography fontWeight={'bold'}>{item?.title}</Typography>
//                         </Link>
//                       </Stack>
//                       <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                         <Typography>Option</Typography>
//                         <Typography fontWeight={'bold'}>{item?.option}</Typography>
//                       </Stack>
//                       <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                         <Typography>Quantity</Typography>
//                         <Typography fontWeight={'bold'}>{item?.quantity}</Typography>
//                       </Stack>
//                       <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                         <Typography>Price</Typography>
//                         <Typography fontWeight={'bold'}>
//                           {item?.price || 0} {order?.currency}
//                         </Typography>
//                       </Stack>
//                     </Box>
//                   ))}

//                 {order?.payment_confirmed === 1 && (
//                   <Box>
//                     <Typography variant="h6" mt={2}>
//                       Transaction
//                     </Typography>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>Amount</Typography>
//                       <Typography fontWeight={'bold'}>
//                         {order?.transactions[0].amount} {order?.transactions[0].currency}
//                       </Typography>
//                     </Stack>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>Gateway</Typography>
//                       <Typography fontWeight={'bold'}>{order?.transactions[0].gateway}</Typography>
//                     </Stack>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>Message</Typography>
//                       <Typography fontWeight={'bold'}>{order?.transactions[0].message}</Typography>
//                     </Stack>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>Transaction status</Typography>
//                       {order?.transactions[0].transaction_status === 1 && (
//                         <Typography fontWeight={'bold'} color="success">
//                           Success
//                         </Typography>
//                       )}
//                       {order?.transactions[0].transaction_status === 2 && (
//                         <Typography fontWeight={'bold'} color="error">
//                           Failure
//                         </Typography>
//                       )}
//                       {order?.transactions[0].transaction_status === 3 && (
//                         <Typography fontWeight={'bold'} color="info">
//                           Pending
//                         </Typography>
//                       )}
//                       {order?.transactions[0].transaction_status === 4 && (
//                         <Typography fontWeight={'bold'} color="error">
//                           Error
//                         </Typography>
//                       )}
//                     </Stack>

//                     <Typography mt={2} fontWeight={'bold'}>
//                       Blockchain
//                     </Typography>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>Chain</Typography>
//                       <Typography fontWeight={'bold'}>
//                         {FindChainNamesByChainids(order?.transactions[0].blockchain.chain_id)}
//                       </Typography>
//                     </Stack>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>Hash</Typography>
//                       <Link
//                         href={GetBlockchainTxUrlByChainIds(
//                           order?.transactions[0].blockchain.chain_id as CHAINIDS,
//                           String(order?.transactions[0].blockchain.hash),
//                         )}
//                         target="_blank"
//                       >
//                         {OmitMiddleString(String(order?.transactions[0].blockchain.hash))}
//                       </Link>
//                     </Stack>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>From address</Typography>
//                       <Link
//                         href={GetBlockchainAddressUrlByChainIds(
//                           order?.transactions[0].blockchain.chain_id as CHAINIDS,
//                           String(order?.transactions[0].blockchain.from_address),
//                         )}
//                         target="_blank"
//                       >
//                         {OmitMiddleString(String(order?.transactions[0].blockchain.from_address))}
//                       </Link>
//                     </Stack>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>To address</Typography>
//                       <Link
//                         href={GetBlockchainAddressUrlByChainIds(
//                           order?.transactions[0].blockchain.chain_id as CHAINIDS,
//                           String(order?.transactions[0].blockchain.to_address),
//                         )}
//                         target="_blank"
//                       >
//                         {OmitMiddleString(String(order?.transactions[0].blockchain.to_address))}
//                       </Link>
//                     </Stack>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>Token</Typography>
//                       <Typography fontWeight={'bold'}>{order?.transactions[0].blockchain.token}</Typography>
//                     </Stack>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>Crypto amount</Typography>
//                       <Typography fontWeight={'bold'}>{order?.transactions[0].blockchain.crypto_amount}</Typography>
//                     </Stack>
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                       <Typography>Rate</Typography>
//                       <Typography
//                         fontWeight={'bold'}
//                       >{`1 ${order?.transactions[0].blockchain.token} = ${order?.transactions[0].blockchain.rate} ${order?.currency}`}</Typography>
//                     </Stack>
//                     {order?.transactions[0].blockchain.block_timestamp > 0 && (
//                       <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                         <Typography>Block timestamp</Typography>
//                         <Typography fontWeight={'bold'}>
//                           {new Date(Number(order?.transactions[0].blockchain.block_timestamp)).toLocaleString()}
//                         </Typography>
//                       </Stack>
//                     )}
//                   </Box>
//                 )}

//                 <Box mt={4}>
//                   {order?.payment_confirmed !== 1 && getUuid() !== order?.user_uuid ? (
//                     <Button
//                       variant={'contained'}
//                       color="success"
//                       fullWidth
//                       onClick={() => {
//                         window.location.href = `/payment/${order?.order_id}`;
//                       }}
//                     >
//                       Go to pay
//                     </Button>
//                   ) : // ) : order?.shipping_confirmed !== 1 ? (
//                   //   <Button variant={'contained'} color="inherit" fullWidth onClick={() => {}}>
//                   //     Waiting for shipping
//                   //   </Button>
//                   order?.confirmed !== 1 ? (
//                     <Button variant={'contained'} color="inherit" fullWidth onClick={() => {}} disabled>
//                       Waiting for order confirm
//                     </Button>
//                   ) : (
//                     <></>
//                   )}
//                 </Box>
//               </CardContent>
//             </Card>
//           </Box>
//         </>
//       ) : (
//         <Card>
//           <CardContent>
//             <Box py={2} textAlign={'center'}>
//               <Typography variant="h6">order is empty</Typography>
//               <Typography mt={2}>No information was found about the order.</Typography>
//             </Box>
//           </CardContent>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default OrderDetails;

import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CHAINIDS } from '@/packages/constants'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { OmitMiddleString } from '@/utils/strings'
import { OrderType } from '@/utils/types'
import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from '@/utils/web3'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ShoppingBag, User, Mail, Receipt, Package,
  Database, Coins, ArrowRight, Clock, ExternalLink,
  CheckCircle2, XCircle, Loader, AlertCircle, CreditCard
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 信息行
const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-2 border-b border-dashed border-gray-100 last:border-0">
    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
    <div className="text-sm font-semibold text-right">{children}</div>
  </div>
)

// 链接
const ChainLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} target="_blank"
    className="flex items-center gap-1 text-sky-500 hover:underline font-mono text-xs">
    {label}<ExternalLink className="h-3 w-3" />
  </Link>
)

// 状态 Badge
const StatusBadge = ({ ok, okText = 'Complete', failText = 'Pending' }: { ok: boolean; okText?: string; failText?: string }) => (
  <span className={cn(
    "text-xs font-semibold px-2.5 py-1 rounded-full",
    ok ? "bg-green-100 text-green-700" : "bg-red-50 text-red-500"
  )}>
    {ok ? okText : failText}
  </span>
)

// 交易状态
const txStatusMap: Record<number, { label: string; icon: any; className: string }> = {
  1: { label: 'Success', icon: CheckCircle2, className: 'text-green-500' },
  2: { label: 'Failure', icon: XCircle,     className: 'text-red-500' },
  3: { label: 'Pending', icon: Loader,       className: 'text-blue-500' },
  4: { label: 'Error',   icon: AlertCircle,  className: 'text-red-400' },
}

// 区块 section 标题
const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-2 mt-2 mb-1">
    <div className="h-7 w-7 rounded-lg bg-sky-50 flex items-center justify-center">
      <Icon className="h-4 w-4 text-sky-500" />
    </div>
    <h3 className="font-semibold text-sm">{title}</h3>
  </div>
)

const OrderDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState<OrderType>()

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)
  const { getUuid } = useUserPresistStore((state) => state)

  const init = async (orderId: any) => {
    if (!orderId) return
    try {
      const response: any = await axios.get(Http.order_by_id, { params: { order_id: Number(orderId) } })
      setOrder(response.result ? response.data : undefined)
    } catch {
      setSnackSeverity('error')
      setSnackMessage('Network error. Please try again later.')
      setSnackOpen(true)
    }
  }

  useEffect(() => { if (id) init(id) }, [id])

  if (!order) return (
    <div className="container mx-auto py-12 flex flex-col items-center gap-3 text-center">
      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
        <ShoppingBag className="h-8 w-8 text-gray-300" />
      </div>
      <p className="font-semibold text-gray-700">Order Not Found</p>
      <p className="text-sm text-muted-foreground">No information was found about this order.</p>
    </div>
  )

  const tx = order.transactions?.[0]
  const txStatus = txStatusMap[tx?.transaction_status]
  const bc = tx?.blockchain

  const priceRows = [
    { label: 'Subtotal',  value: order.sub_total_price },
    { label: 'Tax',       value: order.total_tax },
    { label: 'Tip',       value: order.total_tip },
    { label: 'Discounts', value: order.total_discounts },
  ].filter(({ value }) => Number(value) > 0)

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col gap-4 max-w-2xl">

      {/* 订单状态 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-3">
          <SectionTitle icon={Receipt} title="Order Status" />
          <InfoRow label="Payment">
            <StatusBadge ok={order.payment_confirmed === 1} failText="Waiting for confirm" />
          </InfoRow>
          <InfoRow label="Order">
            <StatusBadge ok={order.confirmed === 1} failText="Waiting for confirm" />
          </InfoRow>
        </CardContent>
      </Card>

      {/* 买家信息 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-2">
          <SectionTitle icon={User} title="Buyer Info" />
          <InfoRow label="Username">
            <Link href={`/profile/${order.customer_username}`}
              className="text-sky-500 hover:underline font-semibold">
              {order.customer_username}
            </Link>
          </InfoRow>
          <InfoRow label="Email">
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              {order.customer_email}
            </span>
          </InfoRow>
        </CardContent>
      </Card>

      {/* 价格汇总 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-2">
          <SectionTitle icon={Coins} title="Pricing" />
          {priceRows.map(({ label, value }) => (
            <InfoRow key={label} label={label}>
              {value} {order.currency}
            </InfoRow>
          ))}
          <div className="flex items-center justify-between pt-2 border-t mt-1">
            <span className="font-bold text-sm">Total</span>
            <span className="font-bold text-sky-600">{order.total_price || 0} {order.currency}</span>
          </div>
        </CardContent>
      </Card>

      {/* 订单商品 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <SectionTitle icon={Package} title="Order Items" />
          {order.items?.map((item, i) => (
            <Link key={i} href={`/products/${item.product_id}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={item.image} alt="product"
                className="h-16 w-16 object-cover rounded-xl border shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold line-clamp-1">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.option}</p>
                <p className="text-xs text-muted-foreground">×{item.quantity}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold">{item.price || 0}</p>
                <p className="text-xs text-muted-foreground">{order.currency}</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* 交易信息 */}
      {order.payment_confirmed === 1 && tx && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 flex flex-col gap-2">
            <SectionTitle icon={CreditCard} title="Transaction" />
            <InfoRow label="Amount">{tx.amount} {tx.currency}</InfoRow>
            <InfoRow label="Gateway">{tx.gateway}</InfoRow>
            <InfoRow label="Message">{tx.message}</InfoRow>
            <InfoRow label="Status">
              {txStatus && (
                <div className={cn("flex items-center gap-1", txStatus.className)}>
                  <txStatus.icon className="h-4 w-4" />
                  <span>{txStatus.label}</span>
                </div>
              )}
            </InfoRow>

            {bc && (
              <>
                <div className="flex items-center gap-2 mt-3 mb-1">
                  <Database className="h-4 w-4 text-sky-500" />
                  <span className="text-sm font-semibold">Blockchain</span>
                </div>
                <InfoRow label="Chain">{FindChainNamesByChainids(bc.chain_id)}</InfoRow>
                <InfoRow label="Hash">
                  <ChainLink href={GetBlockchainTxUrlByChainIds(bc.chain_id as CHAINIDS, String(bc.hash))}
                    label={OmitMiddleString(String(bc.hash))} />
                </InfoRow>
                <InfoRow label="From">
                  <ChainLink href={GetBlockchainAddressUrlByChainIds(bc.chain_id as CHAINIDS, String(bc.from_address))}
                    label={OmitMiddleString(String(bc.from_address))} />
                </InfoRow>
                <InfoRow label="To">
                  <ChainLink href={GetBlockchainAddressUrlByChainIds(bc.chain_id as CHAINIDS, String(bc.to_address))}
                    label={OmitMiddleString(String(bc.to_address))} />
                </InfoRow>
                <InfoRow label="Token">
                  <span className="flex items-center gap-1">
                    <Coins className="h-3.5 w-3.5 text-amber-500" />
                    {bc.token}
                  </span>
                </InfoRow>
                <InfoRow label="Amount">{bc.crypto_amount} {bc.token}</InfoRow>
                {bc.rate && (
                  <InfoRow label="Rate">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <span>1 {bc.token}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="font-semibold text-gray-800">{bc.rate} {order.currency}</span>
                    </div>
                  </InfoRow>
                )}
                {bc.block_timestamp > 0 && (
                  <InfoRow label="Timestamp">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(Number(bc.block_timestamp)).toLocaleString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </InfoRow>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* 操作按钮 */}
      {order.payment_confirmed !== 1 && getUuid() !== order.user_uuid ? (
        <Button
          className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
          onClick={() => { window.location.href = `/payment/${order.order_id}` }}
        >
          <CreditCard className="h-5 w-5" /> Go to Pay
        </Button>
      ) : order.confirmed !== 1 ? (
        <Button variant="outline" className="h-12 font-medium" disabled>
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          Waiting for Order Confirm
        </Button>
      ) : null}

    </div>
  )
}

export default OrderDetails