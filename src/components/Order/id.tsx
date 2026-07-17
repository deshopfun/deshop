import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CHAINIDS } from '@/packages/constants'
import { useEffect, useState } from 'react'
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
import { Badge } from '@/components/ui/badge'
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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GetAbosolutePathByRelative } from '@/utils/image'

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

const StatusBadge = ({
  ok,
  okText = 'Complete',
  failText = 'Pending',
}: {
  ok: boolean
  okText?: string
  failText?: string
}) => (
  <span
    className={cn(
      'text-xs font-semibold px-2.5 py-1 rounded-full',
      ok ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'
    )}
  >
    {ok ? okText : failText}
  </span>
)

const txStatusMap: Record<number, { label: string; icon: any; className: string }> = {
  1: { label: 'Success', icon: CheckCircle2, className: 'text-green-500' },
  2: { label: 'Failure', icon: XCircle, className: 'text-red-500' },
  3: { label: 'Pending', icon: Loader, className: 'text-blue-500' },
  4: { label: 'Error', icon: AlertCircle, className: 'text-red-400' },
}

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
      const response: any = await axios.get(Http.order_by_id, {
        params: { order_id: Number(orderId) },
      })
      setOrder(response.result ? response.data : undefined)
    } catch {
      setSnackSeverity('error')
      setSnackMessage('Network error. Please try again later.')
      setSnackOpen(true)
    }
  }

  useEffect(() => {
    if (id) init(id)
  }, [id])

  if (!order)
    return (
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
    { label: 'Subtotal', value: order.sub_total_price },
    { label: 'Tax', value: order.total_tax },
    { label: 'Tip', value: order.total_tip },
    { label: 'Discounts', value: order.total_discounts },
  ].filter(({ value }) => Number(value) > 0)

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col gap-4 max-w-2xl">
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

      {order.payment_confirmed === 1 && tx && (
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

      {order.payment_confirmed !== 1 && getUuid() !== order.user_uuid ? (
        <Button
          className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
          onClick={() => {
            window.location.href = `/payment/${order.order_id}`
          }}
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
