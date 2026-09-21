// import { useSnackPresistStore, useUserPresistStore } from '@/lib'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { CHAINIDS } from '@/packages/constants'
// import { useState } from 'react'
// import axios from '@/utils/http/axios'
// import { Http } from '@/utils/http/http'
// import { OmitMiddleString } from '@/utils/strings'
// import { OrderType } from '@/utils/types'
// import {
//   FindChainNamesByChainids,
//   GetBlockchainAddressUrlByChainIds,
//   GetBlockchainTxUrlByChainIds,
// } from '@/utils/web3'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import {
//   ShoppingBag,
//   User,
//   Mail,
//   Receipt,
//   Package,
//   Database,
//   Coins,
//   ArrowRight,
//   Clock,
//   ExternalLink,
//   CheckCircle2,
//   XCircle,
//   Loader,
//   AlertCircle,
//   CreditCard,
// } from 'lucide-react'
// import { cn } from '@/lib/utils'
// import { GetAbosolutePathByRelative } from '@/utils/image'
// import { useAbortableEffect } from '@/hooks/useAbortableEffect'
// import { useShallow } from 'zustand/react/shallow'

// const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
//   <div className="flex items-center justify-between gap-4 py-2 border-b border-dashed border-gray-100 last:border-0">
//     <span className="text-sm text-muted-foreground shrink-0">{label}</span>
//     <div className="text-sm font-semibold text-right">{children}</div>
//   </div>
// )

// const ChainLink = ({ href, label }: { href: string; label: string }) => (
//   <Link
//     href={href}
//     target="_blank"
//     className="flex items-center gap-1 text-sky-500 hover:underline font-mono text-xs"
//   >
//     {label}
//     <ExternalLink className="h-3 w-3" />
//   </Link>
// )

// const StatusBadge = ({
//   ok,
//   okText = 'Complete',
//   failText = 'Pending',
// }: {
//   ok: boolean
//   okText?: string
//   failText?: string
// }) => (
//   <span
//     className={cn(
//       'text-xs font-semibold px-2.5 py-1 rounded-full',
//       ok ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'
//     )}
//   >
//     {ok ? okText : failText}
//   </span>
// )

// const txStatusMap: Record<string, { label: string; icon: any; className: string }> = {
//   success: { label: 'Success', icon: CheckCircle2, className: 'text-green-500' },
//   failure: { label: 'Failure', icon: XCircle, className: 'text-red-500' },
//   pending: { label: 'Pending', icon: Loader, className: 'text-blue-500' },
//   error: { label: 'Error', icon: AlertCircle, className: 'text-red-400' },
// }

// const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
//   <div className="flex items-center gap-2 mt-2 mb-1">
//     <div className="h-7 w-7 rounded-lg bg-sky-50 flex items-center justify-center">
//       <Icon className="h-4 w-4 text-sky-500" />
//     </div>
//     <h3 className="font-semibold text-sm">{title}</h3>
//   </div>
// )

// const OrderDetails = () => {
//   const router = useRouter()
//   const id = typeof router.query.id === 'string' ? router.query.id : ''

//   const [order, setOrder] = useState<OrderType>()

//   const { uuid } = useUserPresistStore(
//     useShallow((state) => ({
//       uuid: state.uuid,
//     }))
//   )

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
//     useShallow((state) => ({
//       setSnackSeverity: state.setSnackSeverity,
//       setSnackMessage: state.setSnackMessage,
//       setSnackOpen: state.setSnackOpen,
//     }))
//   )

//   const init = async (orderId: any, signal?: AbortSignal) => {
//     if (!orderId) return

//     try {
//       const response: any = await axios.get(Http.order_by_id, {
//         params: { order_id: Number(orderId) },
//         signal,
//       })
//       setOrder(response.result ? response.data : undefined)
//     } catch (e) {
//       if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return

//       setSnackSeverity('error')
//       setSnackMessage('Network error. Please try again later.')
//       setSnackOpen(true)
//     }
//   }

//   useAbortableEffect(
//     (signal) => {
//       if (!router.isReady || !id) return
//       init(id, signal)
//     },
//     [router.isReady, id]
//   )

//   if (!order)
//     return (
//       <div className="container mx-auto py-12 flex flex-col items-center gap-3 text-center">
//         <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
//           <ShoppingBag className="h-8 w-8 text-gray-300" />
//         </div>
//         <p className="font-semibold text-gray-700">Order Not Found</p>
//         <p className="text-sm text-muted-foreground">No information was found about this order.</p>
//       </div>
//     )

//   const tx = order.transactions?.[0]
//   const txStatus = txStatusMap[tx?.transaction_status]
//   const bc = tx?.blockchain

//   const priceRows = [
//     { label: 'Subtotal', value: order.sub_total_price },
//     { label: 'Tax', value: order.total_tax },
//     { label: 'Tip', value: order.total_tip },
//     { label: 'Discounts', value: order.total_discounts },
//   ].filter(({ value }) => Number(value) > 0)

//   return (
//     <div className="container mx-auto py-8 px-4 flex flex-col gap-4 max-w-2xl">
//       <Card className="border-0 shadow-sm">
//         <CardContent className="p-6 flex flex-col gap-3">
//           <SectionTitle icon={Receipt} title="Order Status" />
//           <InfoRow label="Payment">
//             <StatusBadge ok={order.payment_confirmed === 'true'} failText="Waiting for confirm" />
//           </InfoRow>
//           <InfoRow label="Order">
//             <StatusBadge ok={order.confirmed === 'true'} failText="Waiting for confirm" />
//           </InfoRow>
//         </CardContent>
//       </Card>

//       <Card className="border-0 shadow-sm">
//         <CardContent className="p-6 flex flex-col gap-2">
//           <SectionTitle icon={User} title="Buyer Info" />
//           <InfoRow label="Username">
//             <Link
//               href={`/profile/${order.customer_username}`}
//               className="text-sky-500 hover:underline font-semibold"
//             >
//               {order.customer_username}
//             </Link>
//           </InfoRow>
//           <InfoRow label="Email">
//             <span className="flex items-center gap-1">
//               <Mail className="h-3.5 w-3.5 text-muted-foreground" />
//               {order.customer_email}
//             </span>
//           </InfoRow>
//         </CardContent>
//       </Card>

//       <Card className="border-0 shadow-sm">
//         <CardContent className="p-6 flex flex-col gap-2">
//           <SectionTitle icon={Coins} title="Pricing" />
//           {priceRows.map(({ label, value }) => (
//             <InfoRow key={label} label={label}>
//               {value} {order.currency}
//             </InfoRow>
//           ))}
//           <div className="flex items-center justify-between pt-2 border-t mt-1">
//             <span className="font-bold text-sm">Total</span>
//             <span className="font-bold text-sky-600">
//               {order.total_price || 0} {order.currency}
//             </span>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="border-0 shadow-sm">
//         <CardContent className="p-6 flex flex-col gap-4">
//           <SectionTitle icon={Package} title="Order Items" />
//           {order.items?.map((item, i) => (
//             <Link
//               key={i}
//               href={`/products/${item.slug || item.product_id}`}
//               className="flex items-center gap-3 hover:opacity-80 transition-opacity"
//             >
//               <img
//                 src={GetAbosolutePathByRelative(item.image)}
//                 alt="product"
//                 className="h-16 w-16 object-cover rounded-xl border shrink-0"
//               />
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold line-clamp-1">{item.title}</p>
//                 <p className="text-xs text-muted-foreground mt-0.5">{item.option}</p>
//                 <p className="text-xs text-muted-foreground">×{item.quantity}</p>
//               </div>
//               <div className="text-right shrink-0">
//                 <p className="text-sm font-bold">{item.price || 0}</p>
//                 <p className="text-xs text-muted-foreground">{order.currency}</p>
//               </div>
//             </Link>
//           ))}
//         </CardContent>
//       </Card>

//       {order.payment_confirmed === 'true' && tx && (
//         <Card className="border-0 shadow-sm">
//           <CardContent className="p-6 flex flex-col gap-2">
//             <SectionTitle icon={CreditCard} title="Transaction" />
//             <InfoRow label="Amount">
//               {tx.amount} {tx.currency}
//             </InfoRow>
//             <InfoRow label="Gateway">{tx.gateway}</InfoRow>
//             <InfoRow label="Message">{tx.message}</InfoRow>
//             <InfoRow label="Status">
//               {txStatus && (
//                 <div className={cn('flex items-center gap-1', txStatus.className)}>
//                   <txStatus.icon className="h-4 w-4" />
//                   <span>{txStatus.label}</span>
//                 </div>
//               )}
//             </InfoRow>

//             {bc && (
//               <>
//                 <div className="flex items-center gap-2 mt-3 mb-1">
//                   <Database className="h-4 w-4 text-sky-500" />
//                   <span className="text-sm font-semibold">Blockchain</span>
//                 </div>
//                 <InfoRow label="Chain">{FindChainNamesByChainids(bc.chain_id)}</InfoRow>
//                 <InfoRow label="Hash">
//                   <ChainLink
//                     href={GetBlockchainTxUrlByChainIds(bc.chain_id as CHAINIDS, String(bc.hash))}
//                     label={OmitMiddleString(String(bc.hash))}
//                   />
//                 </InfoRow>
//                 <InfoRow label="From">
//                   <ChainLink
//                     href={GetBlockchainAddressUrlByChainIds(
//                       bc.chain_id as CHAINIDS,
//                       String(bc.from_address)
//                     )}
//                     label={OmitMiddleString(String(bc.from_address))}
//                   />
//                 </InfoRow>
//                 <InfoRow label="To">
//                   <ChainLink
//                     href={GetBlockchainAddressUrlByChainIds(
//                       bc.chain_id as CHAINIDS,
//                       String(bc.to_address)
//                     )}
//                     label={OmitMiddleString(String(bc.to_address))}
//                   />
//                 </InfoRow>
//                 <InfoRow label="Token">
//                   <span className="flex items-center gap-1">
//                     <Coins className="h-3.5 w-3.5 text-amber-500" />
//                     {bc.token}
//                   </span>
//                 </InfoRow>
//                 <InfoRow label="Amount">
//                   {bc.crypto_amount} {bc.token}
//                 </InfoRow>
//                 {bc.rate && (
//                   <InfoRow label="Rate">
//                     <div className="flex items-center gap-1 text-muted-foreground text-xs">
//                       <span>1 {bc.token}</span>
//                       <ArrowRight className="h-3 w-3" />
//                       <span className="font-semibold text-gray-800">
//                         {bc.rate} {order.currency}
//                       </span>
//                     </div>
//                   </InfoRow>
//                 )}
//                 {bc.block_timestamp > 0 && (
//                   <InfoRow label="Timestamp">
//                     <span className="flex items-center gap-1 text-muted-foreground">
//                       <Clock className="h-3.5 w-3.5" />
//                       {new Date(Number(bc.block_timestamp)).toLocaleString('en-US', {
//                         month: 'short',
//                         day: 'numeric',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                       })}
//                     </span>
//                   </InfoRow>
//                 )}
//               </>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       {order.payment_confirmed !== 'true' && uuid !== order.user_uuid ? (
//         <Button
//           className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
//           onClick={() => {
//             window.location.href = `/payment/${order.order_id}`
//           }}
//         >
//           <CreditCard className="h-5 w-5" /> Go to Pay
//         </Button>
//       ) : order.confirmed !== 'true' ? (
//         <Button variant="outline" className="h-12 font-medium" disabled>
//           <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
//           Waiting for Order Confirm
//         </Button>
//       ) : null}
//     </div>
//   )
// }

// export default OrderDetails

import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CHAINIDS } from '@/packages/constants'
import { useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { OmitMiddleString } from '@/utils/strings'
import { OrderType } from '@/utils/types'
import {
  FindChainNamesByChainids,
  GetBlockchainAddressUrlByChainIds,
  GetBlockchainTxUrlByChainIds,
} from '@/utils/web3'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ShoppingBag,
  User,
  Mail,
  Receipt,
  Package,
  Database,
  Coins,
  ArrowRight,
  Clock,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Loader,
  AlertCircle,
  CreditCard,
  Wallet,
  Ban,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { useAbortableEffect } from '@/hooks/useAbortableEffect'
import { useShallow } from 'zustand/react/shallow'

const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-2 border-b border-dashed border-gray-100 last:border-0">
    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
    <div className="text-sm font-semibold text-right">{children}</div>
  </div>
)

const ChainLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    target="_blank"
    className="flex items-center gap-1 text-sky-500 hover:underline font-mono text-xs"
  >
    {label}
    <ExternalLink className="h-3 w-3" />
  </Link>
)

type StepState = 'done' | 'active' | 'pending'

const StatusBadge = ({ state, doneText = 'Complete' }: { state: StepState; doneText?: string }) => {
  if (state === 'done') {
    return (
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
        {doneText}
      </span>
    )
  }
  if (state === 'active') {
    return (
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">
        Action needed
      </span>
    )
  }
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
      Waiting
    </span>
  )
}

const txStatusMap: Record<string, { label: string; icon: any; className: string }> = {
  pending: { label: 'Pending', icon: Loader, className: 'text-blue-500' },
  failure: { label: 'Failure', icon: XCircle, className: 'text-red-500' },
  success: { label: 'Success', icon: CheckCircle2, className: 'text-green-500' },
  error: { label: 'Error', icon: AlertCircle, className: 'text-red-400' },
}

// 需要和后端 constant.FinancialStatusToString 的取值保持一致，按你实际枚举字符串调整
const VOIDED_STATUSES = ['voided']
const REFUNDED_STATUSES = ['refunded', 'partially_refunded']

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
  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const [order, setOrder] = useState<OrderType>()
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [confirmInput, setConfirmInput] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { uuid } = useUserPresistStore(
    useShallow((state) => ({
      uuid: state.uuid,
    }))
  )

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const init = async (orderId: any, signal?: AbortSignal) => {
    if (!orderId) return
    setLoading(true)
    try {
      const response: any = await axios.get(Http.order_by_id, {
        params: { order_id: Number(orderId) },
        signal,
      })
      if (response.result) {
        setOrder(response.data)
        setNotFound(false)
      } else {
        setNotFound(true)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return
      setNotFound(true)
      setSnackSeverity('error')
      setSnackMessage('Network error. Please try again later.')
      setSnackOpen(true)
    } finally {
      setLoading(false)
    }
  }

  useAbortableEffect(
    (signal) => {
      if (!router.isReady || !id) return
      init(id, signal)
    },
    [router.isReady, id]
  )

  // 三段确认后每次成功都需要重新拉取订单，保证状态和输入框都同步刷新
  const refresh = () => init(id)

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex flex-col items-center gap-3 text-center">
        <Loader className="h-8 w-8 text-gray-300 animate-spin" />
        <p className="text-sm text-muted-foreground">Loading order...</p>
      </div>
    )
  }

  if (notFound || !order)
    return (
      <div className="container mx-auto py-12 flex flex-col items-center gap-3 text-center">
        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingBag className="h-8 w-8 text-gray-300" />
        </div>
        <p className="font-semibold text-gray-700">Order Not Found</p>
        <p className="text-sm text-muted-foreground">No information was found about this order.</p>
      </div>
    )

  const isSeller = uuid === order.user_uuid
  const isBuyer = uuid === order.customer_uuid

  const isVoided = VOIDED_STATUSES.includes(order.financial_status)
  const isRefunded = REFUNDED_STATUSES.includes(order.financial_status)
  const isClosed = isVoided || isRefunded

  const paymentDone = order.payment_confirmed === 'true'
  const shippingDone = order.shipping_confirmed === 'true'
  const orderDone = order.confirmed === 'true'

  const paymentState: StepState = paymentDone ? 'done' : isSeller ? 'active' : 'pending'
  const shippingState: StepState = shippingDone
    ? 'done'
    : !paymentDone
      ? 'pending'
      : isBuyer
        ? 'active'
        : 'pending'
  const confirmState: StepState = orderDone
    ? 'done'
    : !shippingDone
      ? 'pending'
      : isSeller
        ? 'active'
        : 'pending'

  const tx =
    order.transactions?.find((item) => item.select === 'true') ??
    order.transactions?.find((item) => item.transaction_model === 'default')
  const txStatus = txStatusMap[tx?.transaction_status || 'pending']
  const bc = tx?.blockchain

  const priceRows = [
    { label: 'Subtotal', value: order.sub_total_price },
    { label: 'Tax', value: order.total_tax },
    { label: 'Tip', value: order.total_tip },
    { label: 'Discounts', value: order.total_discounts },
  ].filter(({ value }) => Number(value) > 0)

  // 统一处理三步确认的提交，接口地址需要你按实际后端路由确认
  const handleConfirmStep = async (
    endpoint: string,
    payload: Record<string, any>,
    successMessage: string
  ) => {
    if (submitting) return
    setSubmitting(true)
    try {
      const response: any = await axios.put(endpoint, payload)
      if (response.result) {
        setSnackSeverity('success')
        setSnackMessage(successMessage)
        setSnackOpen(true)
        setConfirmInput('')
        refresh()
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message || 'Confirmation failed, please check the code.')
        setSnackOpen(true)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Network error. Please try again later.')
      setSnackOpen(true)
    } finally {
      setSubmitting(false)
    }
  }

  // 决定当前该展示的操作区（三步之外，还要处理已取消/已退款/买家支付跳转这三种终止态）
  const renderActionArea = () => {
    if (isClosed) {
      return (
        <Card className="border-0 shadow-sm bg-gray-50">
          <CardContent className="p-6 flex items-center gap-3">
            <Ban className="h-5 w-5 text-gray-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {isVoided ? 'This order has been cancelled' : 'This order has been refunded'}
              </p>
              {order.cancel_reason && (
                <p className="text-xs text-muted-foreground mt-1">{order.cancel_reason}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )
    }

    // 买家去支付：还未付款，且当前用户是买家
    if (!paymentDone && isBuyer) {
      return (
        <Button
          className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
          onClick={() => {
            window.location.href = `/payment/${order.order_id}`
          }}
        >
          <CreditCard className="h-5 w-5" /> Go to Pay
        </Button>
      )
    }

    // 卖家确认收款：还未付款确认，且当前用户是卖家，需要输入 PaymentConfirmationNumber
    // if (!paymentDone && isSeller) {
    //   return (
    //     <ConfirmActionCard
    //       icon={CreditCard}
    //       title="Confirm you received payment"
    //       value={confirmInput}
    //       onChange={setConfirmInput}
    //       submitting={submitting}
    //       onSubmit={() =>
    //         handleConfirmStep(
    //           Http.order_confirm, // TODO: 确认实际接口地址
    //           {
    //             order_id: order.order_id,
    //             confirm_number: confirmInput,
    //             confirm_payment_id: tx?.transaction_id,
    //           },
    //           'Payment confirmed.'
    //         )
    //       }
    //     />
    //   )
    // }

    // // 买家确认收货：已付款但还未确认收货，且当前用户是买家
    // if (paymentDone && !shippingDone && isBuyer) {
    //   return (
    //     <ConfirmActionCard
    //       icon={Package}
    //       title="Confirm you received the goods"
    //       value={confirmInput}
    //       onChange={setConfirmInput}
    //       submitting={submitting}
    //       onSubmit={() =>
    //         handleConfirmStep(
    //           Http.order_confirm_shipping, // TODO: 确认实际接口地址
    //           { order_id: order.order_id, confirm_number: confirmInput },
    //           'Shipping confirmed.'
    //         )
    //       }
    //     />
    //   )
    // }

    // // 卖家最终确认完成：已确认收货但还未最终完成，且当前用户是卖家
    // if (shippingDone && !orderDone && isSeller) {
    //   return (
    //     <ConfirmActionCard
    //       icon={CheckCircle2}
    //       title="Confirm to complete this order"
    //       value={confirmInput}
    //       onChange={setConfirmInput}
    //       submitting={submitting}
    //       onSubmit={() =>
    //         handleConfirmStep(
    //           Http.order_confirm, // TODO: 确认实际接口地址
    //           { order_id: order.order_id, confirm_number: confirmInput },
    //           'Order completed.'
    //         )
    //       }
    //     />
    //   )
    // }

    // 剩下的情况：轮到对方操作，本方只需等待
    if (!orderDone) {
      return (
        <Button variant="outline" className="h-12 font-medium" disabled>
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          {!paymentDone
            ? 'Waiting for seller to confirm payment'
            : !shippingDone
              ? 'Waiting for buyer to confirm receipt'
              : 'Waiting for seller to complete the order'}
        </Button>
      )
    }

    return null
  }

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col gap-4 max-w-2xl">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-3">
          <SectionTitle icon={Receipt} title="Order Status" />
          <InfoRow label="Payment confirmed by seller">
            <StatusBadge state={paymentState} />
          </InfoRow>
          <InfoRow label="Receipt confirmed by buyer">
            <StatusBadge state={shippingState} />
          </InfoRow>
          <InfoRow label="Order completed by seller">
            <StatusBadge state={confirmState} />
          </InfoRow>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-2">
          <SectionTitle icon={User} title="Buyer Info" />
          <InfoRow label="Username">
            <Link
              href={`/profile/${order.customer_username}`}
              className="text-sky-500 hover:underline font-semibold"
            >
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

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-2">
          <SectionTitle icon={User} title="Seller Info" />
          <InfoRow label="Username">
            <Link
              href={`/profile/${order.username}`}
              className="text-sky-500 hover:underline font-semibold"
            >
              {order.username}
            </Link>
          </InfoRow>
          <InfoRow label="Email">
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              {order.user_email}
            </span>
          </InfoRow>
        </CardContent>
      </Card>

      {order.wallets?.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 flex flex-col gap-2">
            <SectionTitle icon={Wallet} title="Seller Wallet" />
            {order.wallets
              .filter((w) => w.address)
              .map((w, i) => (
                <InfoRow key={i} label={w.chain_name}>
                  <span className="font-mono text-xs">{OmitMiddleString(w.address)}</span>
                </InfoRow>
              ))}
          </CardContent>
        </Card>
      )}

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
            <span className="font-bold text-sky-600">
              {order.total_price || 0} {order.currency}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <SectionTitle icon={Package} title="Order Items" />
          {order.items?.map((item, i) => (
            <Link
              key={i}
              href={`/products/${item.slug || item.product_id}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src={GetAbosolutePathByRelative(item.image)}
                alt="product"
                className="h-16 w-16 object-cover rounded-xl border shrink-0"
              />
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

      {paymentDone && tx && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 flex flex-col gap-2">
            <SectionTitle icon={CreditCard} title="Transaction" />
            <InfoRow label="Amount">
              {tx.amount} {tx.currency}
            </InfoRow>
            <InfoRow label="Gateway">{tx.gateway}</InfoRow>
            <InfoRow label="Message">{tx.message}</InfoRow>
            <InfoRow label="Status">
              {txStatus && (
                <div className={cn('flex items-center gap-1', txStatus.className)}>
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
                  <ChainLink
                    href={GetBlockchainTxUrlByChainIds(bc.chain_id as CHAINIDS, String(bc.hash))}
                    label={OmitMiddleString(String(bc.hash))}
                  />
                </InfoRow>
                <InfoRow label="From">
                  <ChainLink
                    href={GetBlockchainAddressUrlByChainIds(
                      bc.chain_id as CHAINIDS,
                      String(bc.from_address)
                    )}
                    label={OmitMiddleString(String(bc.from_address))}
                  />
                </InfoRow>
                <InfoRow label="To">
                  <ChainLink
                    href={GetBlockchainAddressUrlByChainIds(
                      bc.chain_id as CHAINIDS,
                      String(bc.to_address)
                    )}
                    label={OmitMiddleString(String(bc.to_address))}
                  />
                </InfoRow>
                <InfoRow label="Token">
                  <span className="flex items-center gap-1">
                    <Coins className="h-3.5 w-3.5 text-amber-500" />
                    {bc.token}
                  </span>
                </InfoRow>
                <InfoRow label="Amount">
                  {bc.crypto_amount} {bc.token}
                </InfoRow>
                {bc.rate && (
                  <InfoRow label="Rate">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <span>1 {bc.token}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="font-semibold text-gray-800">
                        {bc.rate} {order.currency}
                      </span>
                    </div>
                  </InfoRow>
                )}
                {bc.block_timestamp > 0 && (
                  <InfoRow label="Timestamp">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(Number(bc.block_timestamp)).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </InfoRow>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {renderActionArea()}
    </div>
  )
}

// 三步确认共用的操作卡片：展示要输入的确认码
const ConfirmActionCard = ({
  icon: Icon,
  title,
  value,
  onChange,
  onSubmit,
  submitting,
}: {
  icon: any
  title: string
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  submitting: boolean
}) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-6 flex flex-col gap-3">
      <SectionTitle icon={Icon} title={title} />
      <Input
        placeholder="Enter confirmation code"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        className="h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold"
        disabled={submitting || !value}
        onClick={onSubmit}
      >
        {submitting ? 'Confirming...' : 'Confirm'}
      </Button>
    </CardContent>
  </Card>
)

export default OrderDetails
