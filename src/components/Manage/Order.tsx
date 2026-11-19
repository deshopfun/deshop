import { useRouter } from 'next/router'
import { navigateTo } from '@/utils/navigate'
import BlockchainDialog from '@/components/Dialog/BlockchainDialog'
import ConfirmOrderDialog from '@/components/Dialog/ConfirmOrderDialog'
import ConfirmPaymentDialog from '@/components/Dialog/ConfirmPaymentDialog'
import ConfirmShippingDialog from '@/components/Dialog/ConfirmShippingDialog'
import OrderDetailsDialog from '@/components/Dialog/OrderDetailsDialog'
import OrderRatingDialog from '@/components/Dialog/OrderRatingDialog'
import PostOrderRateDialog from '@/components/Dialog/PostOrderRateDialog'
import { useSnackPresistStore } from '@/lib'
import { useEffect, useState } from 'react'
import { OrderStatusText } from '@/utils/strings'
import { OrderType, TransactionType } from '@/utils/types'
import { manageKeys, useManageOrders } from '@/hooks/queries/useManage'
import { useQueryClient } from '@tanstack/react-query'
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
  Package,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GetAbosolutePathByRelative } from '@/utils/image'
import RemoteImage from '@/components/Image/RemoteImage'
import { useShallow } from 'zustand/react/shallow'
import OrderStepper from './OrderStepper'
import { REFUNDED_STATUSES, VOIDED_STATUSES } from '@/utils/paymentStatus'
import OrderCancelledBanner from '@/components/Order/OrderCancelledBanner'

const ManageOrder = () => {
  const router = useRouter()
  const [alignment, setAlignment] = useState<'buy' | 'sell'>('buy')
  const [currentOrder, setCurrentOrder] = useState<OrderType>()
  const queryClient = useQueryClient()
  const ordersQuery = useManageOrders(alignment)
  const orders = ordersQuery.data ?? []

  const [openBlockchainDialog, setOpenBlockchainDialog] = useState(false)
  const [openConfirmPaymentDialog, setOpenConfirmPaymentDialog] = useState(false)
  const [openConfirmShippingDialog, setOpenConfirmShippingDialog] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState(false)
  const [openPostOrderRateDialog, setPostOpenOrderRateDialog] = useState(false)
  const [openOrderRatingDialog, setOpenOrderRatingDialog] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  useEffect(() => {
    if (ordersQuery.isError) {
      showError(
        (ordersQuery.error as Error)?.message || 'Network error. Please try again later.'
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersQuery.isError, ordersQuery.error])

  const refreshAndClose = (closeFn: (v: boolean) => void) => async () => {
    await queryClient.invalidateQueries({ queryKey: manageKeys.orders(alignment) })
    closeFn(false)
  }

  const getActiveStep = (item: OrderType) => {
    if (item.payment_confirmed !== 'true') return 0
    if (item.shipping_confirmed !== 'true') return 1
    if (item.confirmed !== 'true') return 2
    return 3
  }

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
              onClick={() => setAlignment(type)}
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
          {orders.map((item, index) => {
            const isVoided = VOIDED_STATUSES.includes(item.financial_status)
            const isRefunded = REFUNDED_STATUSES.includes(item.financial_status)
            const isClosed = isVoided || isRefunded

            return (
              <Card key={index} className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  {isClosed ? (
                    <OrderCancelledBanner order={item} />
                  ) : (
                    <div className="px-6 pt-5 pb-4 bg-gray-50 border-b">
                      <OrderStepper activeStep={getActiveStep(item)} />
                    </div>
                  )}

                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <button
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        onClick={() => {
                          void router.push(`/profile/${item.username}`)
                        }}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={GetAbosolutePathByRelative(item.user_avatar_url, 'avatar')}
                          />
                          <AvatarFallback>{item.username?.[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{item.username}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                      <span className="text-sm font-bold text-red-500">
                        {OrderStatusText(
                          alignment,
                          item.financial_status,
                          item.payment_confirmed === 'true',
                          item.shipping_confirmed === 'true',
                          item.confirmed === 'true',
                          item.cancel_reason_type
                        )}
                      </span>
                    </div>

                    <div
                      className="flex flex-col gap-3 cursor-pointer"
                      onClick={() => navigateTo(router, item.order_status_url)}
                    >
                      {item.items.map((productItem, pi) => (
                        <div key={pi} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <RemoteImage
                              src={GetAbosolutePathByRelative(productItem.image)}
                              alt="product"
                              width={64}
                              height={64}
                              className="h-16 w-16 object-cover rounded-xl border shrink-0"
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

                    {!isClosed && (
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

                          {alignment === 'buy' && item.payment_confirmed === 'false' && (
                            <Button
                              size="sm"
                              className="h-8 text-xs bg-red-500 hover:bg-red-600 text-white gap-1.5 justify-start"
                              onClick={() => {
                                void router.push(`/payment/${item.order_id}`)
                              }}
                            >
                              <CreditCard className="h-3.5 w-3.5" /> Go to pay
                            </Button>
                          )}

                          {alignment === 'sell' && item.payment_confirmed === 'false' && (
                            <Button
                              size="sm"
                              className="h-8 text-xs bg-green-500 hover:bg-green-600 text-white gap-1.5 justify-start"
                              onClick={() => openDialog(item, setOpenConfirmPaymentDialog)}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" /> Confirm payment
                            </Button>
                          )}

                          {alignment === 'buy' &&
                            item.payment_confirmed === 'true' &&
                            item.shipping_confirmed !== 'true' && (
                              <Button
                                size="sm"
                                className="h-8 text-xs bg-sky-500 hover:bg-sky-600 text-white gap-1.5 justify-start"
                                onClick={() => openDialog(item, setOpenConfirmShippingDialog)}
                              >
                                <Package className="h-3.5 w-3.5" /> Confirm receipt
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
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs gap-1.5 justify-start"
                              onClick={() => showError('Not supported yet')}
                            >
                              <ShoppingCart className="h-3.5 w-3.5" /> Buy again
                            </Button>
                          )}

                          {/*
                            按此前约定的角色分工，Confirmed 是卖家的最终确认操作，
                            这里从 alignment === 'buy' 改成了 'sell'，
                            且加了 shipping_confirmed 前置条件，需要你确认这个改动方向是否正确
                          */}
                          {alignment === 'sell' &&
                            item.shipping_confirmed === 'true' &&
                            item.confirmed !== 'true' && (
                              <Button
                                size="sm"
                                className="h-8 text-xs bg-sky-500 hover:bg-sky-600 text-white gap-1.5 justify-start"
                                onClick={() => openDialog(item, setOpenConfirmDialog)}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" /> Complete order
                              </Button>
                            )}

                          {alignment === 'buy' && item.confirmed === 'true' && (
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
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
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
            transactions={currentOrder.transactions?.filter(
              (item: TransactionType) => item.transaction_model !== 'default'
            )}
            openDialog={openBlockchainDialog}
            handleCloseDialog={refreshAndClose(setOpenBlockchainDialog)}
          />
          <ConfirmPaymentDialog
            orderId={currentOrder.order_id}
            confirmNumber={currentOrder.payment_confirmed_number}
            transactions={currentOrder.transactions?.filter(
              (item: TransactionType) => item.transaction_model !== 'default'
            )}
            openDialog={openConfirmPaymentDialog}
            handleCloseDialog={refreshAndClose(setOpenConfirmPaymentDialog)}
          />
          <ConfirmShippingDialog
            orderId={currentOrder.order_id}
            confirmNumber={currentOrder.shipping_confirmed_number}
            openDialog={openConfirmShippingDialog}
            shipping={currentOrder.shipping}
            handleCloseDialog={refreshAndClose(setOpenConfirmShippingDialog)}
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
