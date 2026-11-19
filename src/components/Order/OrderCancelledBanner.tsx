import type { OrderType } from '@/utils/types'
import { Ban } from 'lucide-react'
import { VOIDED_STATUSES } from '@/utils/paymentStatus'

export default function OrderCancelledBanner({ order }: { order: OrderType }) {
  const isVoided = VOIDED_STATUSES.includes(order.financial_status)
  return (
    <div className="px-6 pt-5 pb-4 bg-gray-50 border-b flex items-center gap-3">
      <Ban className="h-5 w-5 text-gray-400 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-gray-700">
          {isVoided ? 'Order cancelled' : 'Order refunded'}
        </p>
        {order.cancel_reason && (
          <p className="text-xs text-muted-foreground mt-0.5">{order.cancel_reason}</p>
        )}
      </div>
    </div>
  )
}
