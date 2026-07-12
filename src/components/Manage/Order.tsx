import BlockchainDialog from '@/components/Dialog/BlockchainDialog'
import ConfirmOrderDialog from '@/components/Dialog/ConfirmOrderDialog'
import ConfirmPaymentDialog from '@/components/Dialog/ConfirmPaymentDialog'
import OrderDetailsDialog from '@/components/Dialog/OrderDetailsDialog'
import OrderRatingDialog from '@/components/Dialog/OrderRatingDialog'
import PostOrderRateDialog from '@/components/Dialog/PostOrderRateDialog'
import { useSnackPresistStore } from '@/lib'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { OrderStatusText } from '@/utils/strings'
import { OrderType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  ShoppingBag,
  Store,
  PackageCheck,
  ChevronRight,
  Link2,
  CreditCard,
  FileText,
  Star,
  RotateCcw,
  Trash2,
  ShoppingCart,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = ['Waiting for payment', 'Waiting for order confirm', 'Order complete']

const OrderStepper = ({ activeStep }: { activeStep: number }) => (
  <div className="flex items-center w-full">
    {steps.map((label, i) => (
      <div key={i} className="flex items-center flex-1 last:flex-none">
        <div className="flex flex-col items-center gap-1">
          <div
            className={cn(
              'h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
              i < activeStep
                ? 'bg-sky-500 text-white'
                : i === activeStep
                  ? 'bg-sky-500 text-white ring-4 ring-sky-100'
                  : 'bg-gray-100 text-gray-400'
            )}
          >
            {i < activeStep ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
          </div>
          <span
            className={cn(
              'text-xs text-center max-w-20 leading-tight',
              i <= activeStep ? 'text-sky-600 font-medium' : 'text-gray-400'
            )}
          >
            {label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div
            className={cn(
              'flex-1 h-0.5 mx-2 mb-5 transition-colors',
              i < activeStep ? 'bg-sky-500' : 'bg-gray-200'
            )}
          />
        )}
      </div>
    ))}
  </div>
)

const ManageOrder = () => {
  const [alignment, setAlignment] = useState<'buy' | 'sell'>('buy')
  const [orders, setOrders] = useState<OrderType[]>([])
  const [currentOrder, setCurrentOrder] = useState<OrderType>()

  const [openBlockchainDialog, setOpenBlockchainDialog] = useState(false)
  const [openConfirmPaymentDialog, setOpenConfirmPaymentDialog] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState(false)
  const [openPostOrderRateDialog, setPostOpenOrderRateDialog] = useState(false)
  const [openOrderRatingDialog, setOpenOrderRatingDialog] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const init = async (kind: string) => {
    try {
      const response: any = await axios.get(Http.order, {
        params: { kind: kind === 'buy' ? 1 : 2 },
      })
      setOrders(response.result ? response.data : [])
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const refreshAndClose = (closeFn: (v: boolean) => void) => async () => {
    await init(alignment)
    closeFn(false)
  }

  useEffect(() => {
    init('buy')
  }, [])

  const getActiveStep = (item: OrderType) =>
    item.payment_confirmed === 1 ? (item.confirmed === 1 ? 2 : 1) : 0

  const openDialog = (order: OrderType, fn: (v: boolean) => void) => {
    setCurrentOrder(order)
    fn(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
            <PackageCheck className="h-4 w-4 text-sky-500" />
          </div>
          <div>
            <h3 className="font-semibold">All Orders</h3>
            <p className="text-xs text-muted-foreground">
              {orders?.length} order{orders?.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          {(['buy', 'sell'] as const).map((type) => (
            <button
              key={type}
              onClick={async () => {
                setAlignment(type)
                await init(type)
              }}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors',
                alignment === type
                  ? 'bg-sky-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              )}
            >
              {type === 'buy' ? <ShoppingBag className="h-4 w-4" /> : <Store className="h-4 w-4" />}
              {type === 'buy' ? 'Buying' : 'Selling'}
            </button>
          ))}
        </div>
      </div>

      {orders?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((item, index) => (
            <Card key={index} className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="px-6 pt-5 pb-4 bg-gray-50 border-b">
                  <OrderStepper activeStep={getActiveStep(item)} />
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <button
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      onClick={() => {
                        window.location.href = `/profile/${item.username}`
                      }}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.user_avatar_url || '/images/default_avatar.png'} />
                        <AvatarFallback>{item.username?.[0]?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{item.username}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                    <span className="text-sm font-bold text-red-500">
                      {OrderStatusText(
                        alignment,
                        item.payment_confirmed === 1,
                        item.confirmed === 1
                      )}
                    </span>
                  </div>

                  <div
                    className="flex flex-col gap-3 cursor-pointer"
                    onClick={() => {
                      window.location.href = item.order_status_url
                    }}
                  >
                    {item.items.map((productItem, pi) => (
                      <div key={pi} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={productItem.image}
                            alt="product"
                            className="h-16 w-16 object-cover rounded-xl border shrink-0"
                            loading="lazy"
                          />
                          <div>
                            <p className="text-sm font-semibold line-clamp-1">
                              {productItem.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {productItem.option}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold">
                            {productItem.price} {item.currency}
                          </p>
                          <p className="text-xs text-muted-foreground">×{productItem.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-3 flex flex-col gap-1">
                    {[
                      { label: 'Subtotal', value: item.sub_total_price },
                      { label: 'Tax', value: item.total_tax },
                      { label: 'Tip', value: item.total_tip },
                      { label: 'Discounts', value: item.total_discounts },
                    ]
                      .filter(({ value }) => Number(value) > 0)
                      .map(({ label, value }) => (
                        <div
                          key={label}
                          className="flex justify-between text-sm text-muted-foreground"
                        >
                          <span>{label}</span>
                          <span>
                            {value} {item.currency}
                          </span>
                        </div>
                      ))}
                    <div className="flex justify-between text-sm font-bold mt-1 pt-1 border-t">
                      <span>Total</span>
                      <span>
                        {item.total_price || 0} {item.currency}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">
                      {item.items.length} item{item.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-t pt-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                        <CreditCard className="h-3.5 w-3.5" /> Payment
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs gap-1.5 justify-start"
                        onClick={() => openDialog(item, setOpenBlockchainDialog)}
                      >
                        <Link2 className="h-3.5 w-3.5" /> Check blockchain
                      </Button>
                      {alignment === 'buy' && item.payment_confirmed === 2 && (
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-red-500 hover:bg-red-600 text-white gap-1.5 justify-start"
                          onClick={() => {
                            window.location.href = `/payment/${item.order_id}`
                          }}
                        >
                          <CreditCard className="h-3.5 w-3.5" /> Go to pay
                        </Button>
                      )}
                      {alignment === 'sell' && item.payment_confirmed === 2 && (
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-green-500 hover:bg-green-600 text-white gap-1.5 justify-start"
                          onClick={() => openDialog(item, setOpenConfirmPaymentDialog)}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Confirm payment
                        </Button>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" /> Actions
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs gap-1.5 justify-start"
                        onClick={() => openDialog(item, setOpenOrderDetailsDialog)}
                      >
                        <FileText className="h-3.5 w-3.5" /> Order details
                      </Button>

                      {alignment === 'buy' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs gap-1.5 justify-start"
                            onClick={() => showError('Not supported yet')}
                          >
                            <ShoppingCart className="h-3.5 w-3.5" /> Buy again
                          </Button>

                          {item.payment_confirmed === 1 && item.confirmed !== 1 && (
                            <Button
                              size="sm"
                              className="h-8 text-xs bg-sky-500 hover:bg-sky-600 text-white gap-1.5 justify-start"
                              onClick={() => openDialog(item, setOpenConfirmDialog)}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" /> Confirm order
                            </Button>
                          )}

                          {item.confirmed === 1 && (
                            <>
                              {item.ratings?.length > 0 ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs gap-1.5 justify-start"
                                  onClick={() => openDialog(item, setOpenOrderRatingDialog)}
                                >
                                  <Star className="h-3.5 w-3.5" /> View rating
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  className="h-8 text-xs bg-amber-500 hover:bg-amber-600 text-white gap-1.5 justify-start"
                                  onClick={() => openDialog(item, setPostOpenOrderRateDialog)}
                                >
                                  <Star className="h-3.5 w-3.5" /> Rate now
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs gap-1.5 justify-start"
                                onClick={() => showError('Not supported yet')}
                              >
                                <RotateCcw className="h-3.5 w-3.5" /> Request refund
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs text-red-500 hover:text-red-600 gap-1.5 justify-start"
                                onClick={() => showError('Not supported yet')}
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Delete order
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <PackageCheck className="h-8 w-8 text-gray-300" />
          </div>
          <div>
            <p className="font-semibold text-gray-700">No orders yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              {alignment === 'buy'
                ? 'Orders you place will appear here.'
                : 'Orders from your products will appear here.'}
            </p>
          </div>
        </div>
      )}

      {currentOrder && (
        <>
          <BlockchainDialog
            currency={currentOrder.currency}
            transactions={currentOrder.transactions}
            openDialog={openBlockchainDialog}
            handleCloseDialog={refreshAndClose(setOpenBlockchainDialog)}
          />
          <ConfirmPaymentDialog
            orderId={currentOrder.order_id}
            confirmNumber={currentOrder.payment_confirmed_number}
            transactions={currentOrder.transactions}
            openDialog={openConfirmPaymentDialog}
            handleCloseDialog={refreshAndClose(setOpenConfirmPaymentDialog)}
          />
          <ConfirmOrderDialog
            orderId={currentOrder.order_id}
            confirmNumber={currentOrder.confirmed_number}
            openDialog={openConfirmDialog}
            handleCloseDialog={refreshAndClose(setOpenConfirmDialog)}
          />
          <OrderDetailsDialog
            order={currentOrder}
            openDialog={openOrderDetailsDialog}
            handleCloseDialog={refreshAndClose(setOpenOrderDetailsDialog)}
          />
          <PostOrderRateDialog
            orderId={currentOrder.order_id}
            orderItems={currentOrder.items}
            openDialog={openPostOrderRateDialog}
            handleCloseDialog={refreshAndClose(setPostOpenOrderRateDialog)}
          />
          <OrderRatingDialog
            ratings={currentOrder.ratings}
            openDialog={openOrderRatingDialog}
            handleCloseDialog={refreshAndClose(setOpenOrderRatingDialog)}
          />
        </>
      )}
    </div>
  )
}

export default ManageOrder
