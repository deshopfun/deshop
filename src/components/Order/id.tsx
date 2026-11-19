import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CHAINIDS } from '@/packages/constants'
import { useEffect } from 'react'
import { OmitMiddleString } from '@/utils/strings'
import { useOrderById } from '@/hooks/queries/useOrder'
import {
  FindChainNamesByChainids,
  GetBlockchainAddressUrlByChainIds,
  GetBlockchainTxUrlByChainIds,
} from '@/utils/web3'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
import RemoteImage from '@/components/Image/RemoteImage'
import { useShallow } from 'zustand/react/shallow'
import type { LucideIcon } from 'lucide-react'
import { REFUNDED_STATUSES, VOIDED_STATUSES } from '@/utils/paymentStatus'

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

const txStatusMap: Record<string, { label: string; icon: LucideIcon; className: string }> = {
  pending: { label: 'Pending', icon: Loader, className: 'text-blue-500' },
  failure: { label: 'Failure', icon: XCircle, className: 'text-red-500' },
  success: { label: 'Success', icon: CheckCircle2, className: 'text-green-500' },
  error: { label: 'Error', icon: AlertCircle, className: 'text-red-400' },
}

const SectionTitle = ({ icon: Icon, title }: { icon: LucideIcon; title: string }) => (
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

  const orderQuery = useOrderById(id, router.isReady && !!id)
  const order = orderQuery.data
  const loading = orderQuery.isLoading || (orderQuery.isFetching && !order)
  const notFound = orderQuery.isError || (!loading && router.isReady && !!id && !order)

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

  useEffect(() => {
    if (orderQuery.isError) {
      setSnackSeverity('error')
      setSnackMessage(
        (orderQuery.error as Error)?.message || 'Network error. Please try again later.'
      )
      setSnackOpen(true)
    }
  }, [orderQuery.isError, orderQuery.error, setSnackSeverity, setSnackMessage, setSnackOpen])

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
            void router.push(`/payment/${order.order_id}`)
          }}
        >
          <CreditCard className="h-5 w-5" /> Go to Pay
        </Button>
      )
    }

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
              <RemoteImage
                src={GetAbosolutePathByRelative(item.image)}
                alt="product"
                width={64}
                height={64}
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

export default OrderDetails
