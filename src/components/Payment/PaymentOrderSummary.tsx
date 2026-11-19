import RemoteImage from '@/components/Image/RemoteImage'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { GetAbosolutePathByRelative } from '@/utils/image'
import type { OrderItemType, OrderType } from '@/utils/types'

type Props = {
  order: OrderType
  currencyCode: string
}

export default function PaymentOrderSummary({ order, currencyCode }: Props) {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarImage src={GetAbosolutePathByRelative(order.user_avatar_url, 'avatar')} />
          </Avatar>
          <div>
            <p className="font-medium">{order.username}</p>
          </div>
        </div>

        <Separator />

        {order.items?.length > 0 && (
          <div className="space-y-3">
            {order.items.map((item: OrderItemType, idx: number) => (
              <div key={item.product_id ?? idx} className="flex items-center gap-3">
                {item.image && (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 bg-muted">
                    <RemoteImage
                      src={GetAbosolutePathByRelative(item.image)}
                      alt={item.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.option && `${item.option} · `}Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm shrink-0">
                  {currencyCode}
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        )}

        <Separator />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              {currencyCode}
              {order.sub_total_price}
            </span>
          </div>
          {Number(order.total_tax) > 0 && (
            <div className="flex justify-between">
              <span>Tax</span>
              <span>
                {currencyCode}
                {order.total_tax}
              </span>
            </div>
          )}
          {Number(order.total_tip) > 0 && (
            <div className="flex justify-between">
              <span>Tip</span>
              <span>
                {currencyCode}
                {order.total_tip}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>
            {currencyCode}
            {order.total_price}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
