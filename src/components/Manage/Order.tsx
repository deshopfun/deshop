// import BlockchainDialog from 'components/Dialog/BlockchainDialog';
// import ConfirmOrderDialog from 'components/Dialog/ConfirmOrderDialog';
// import ConfirmPaymentDialog from 'components/Dialog/ConfirmPaymentDialog';
// import ConfirmShippingDialog from 'components/Dialog/ConfirmShippingDialog';
// import OrderDetailsDialog from 'components/Dialog/OrderDetailsDialog';
// import OrderRatingDialog from 'components/Dialog/OrderRatingDialog';
// import PostOrderRateDialog from 'components/Dialog/PostOrderRateDialog';
// import ShippingDialog from 'components/Dialog/ShippingDialog';
// import { useSnackPresistStore } from 'lib';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { OrderStatusText } from 'utils/strings';
// import { OrderType } from 'utils/types';

// const steps = [
//   'Waiting for payment',
//   // 'Payment confirmation',
//   // 'Waiting for shipping',
//   'Waiting for order confirm',
//   'Order complete',
// ];

// const ManageOrder = () => {
//   const [openBlockchainDialog, setOpenBlockchainDialog] = useState<boolean>(false);
//   const [openConfirmPaymentDialog, setOpenConfirmPaymentDialog] = useState<boolean>(false);
//   // const [openShippingDialog, setOpenShippingDialog] = useState<boolean>(false);
//   // const [openConfirmShippingDialog, setOpenConfirmShippingDialog] = useState<boolean>(false);
//   const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
//   const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState<boolean>(false);
//   const [openPostOrderRateDialog, setPostOpenOrderRateDialog] = useState<boolean>(false);
//   const [openOrderRatingDialog, setOpenOrderRatingDialog] = useState<boolean>(false);
//   const [alignment, setAlignment] = useState<'buy' | 'sell'>('buy');
//   const [orders, setOrders] = useState<OrderType[]>([]);
//   const [currentOrder, setCurrentOrder] = useState<OrderType>();

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

//   const init = async (kind: string) => {
//     try {
//       const response: any = await axios.get(Http.order, {
//         params: {
//           kind: kind === 'buy' ? 1 : 2,
//         },
//       });

//       if (response.result) {
//         setOrders(response.data);
//       } else {
//         setOrders([]);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     init('buy');
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleBlockchainCloseDialog = async () => {
//     await init(alignment);
//     setOpenBlockchainDialog(false);
//   };

//   const handleConfirmPaymentCloseDialog = async () => {
//     await init(alignment);
//     setOpenConfirmPaymentDialog(false);
//   };

//   // const handleShippingCloseDialog = async () => {
//   //   await init(alignment);
//   //   setOpenShippingDialog(false);
//   // };

//   // const handleConfirmShippingCloseDialog = async () => {
//   //   await init(alignment);
//   //   setOpenConfirmShippingDialog(false);
//   // };

//   const handleConfirmCloseDialog = async () => {
//     await init(alignment);
//     setOpenConfirmDialog(false);
//   };

//   const handleOrderDetailsCloseDialog = async () => {
//     await init(alignment);
//     setOpenOrderDetailsDialog(false);
//   };

//   const handlePostOrderRateCloseDialog = async () => {
//     await init(alignment);
//     setPostOpenOrderRateDialog(false);
//   };

//   const handleOrderRatingCloseDialog = async () => {
//     await init(alignment);
//     setOpenOrderRatingDialog(false);
//   };

//   return (
//     <Box>
//       <Typography variant="h6">All orders</Typography>

//       <Box mt={2}>
//         <ToggleButtonGroup
//           fullWidth
//           exclusive
//           color="primary"
//           value={alignment}
//           onChange={async (e: any) => {
//             setAlignment(e.target.value);
//             await init(e.target.value);
//           }}
//         >
//           <ToggleButton value={'buy'}>Buy</ToggleButton>
//           <ToggleButton value={'sell'}>Sell</ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       <Box mt={2}>
//         {orders && orders.length > 0 ? (
//           orders.map((item, index) => (
//             <Box key={index} mb={4}>
//               <Card>
//                 <CardContent>
//                   <Box>
//                     <Card>
//                       <Box p={1}>
//                         <Stepper
//                           nonLinear
//                           activeStep={
//                             item.payment_confirmed === 1
//                               ? // ? item.shipping_confirmed == 1
//                                 item.confirmed == 1
//                                 ? 2
//                                 : 1
//                               : // : 1
//                                 0
//                           }
//                         >
//                           {steps.map((label, index) => (
//                             <Step key={label} completed={false}>
//                               <StepButton color="inherit">
//                                 <Typography fontWeight={'bold'} textAlign={'left'}>
//                                   Step {index + 1}
//                                 </Typography>
//                                 <Typography fontSize={14}>{label}</Typography>
//                               </StepButton>
//                             </Step>
//                           ))}
//                         </Stepper>
//                       </Box>
//                     </Card>
//                   </Box>

//                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
//                     <Button
//                       color={'inherit'}
//                       onClick={() => {
//                         window.location.href = `/profile/${item.username}`;
//                       }}
//                       endIcon={<ChevronRight />}
//                     >
//                       <Stack direction={'row'} alignItems={'center'} gap={1}>
//                         {item.user_avatar_url ? (
//                           <img src={item.user_avatar_url} alt={'image'} loading="lazy" width={40} height={40} />
//                         ) : (
//                           <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={40} height={40} />
//                         )}
//                         <Typography>{item.username}</Typography>
//                       </Stack>
//                     </Button>
//                     <Typography fontWeight={'bold'} color={'error'}>
//                       {OrderStatusText(
//                         alignment,
//                         item.payment_confirmed === 1 ? true : false,
//                         // item.shipping_confirmed === 1 ? true : false,
//                         item.confirmed === 1 ? true : false,
//                         // item.shipping.shipping_type,
//                       )}
//                     </Typography>
//                   </Stack>
//                   <div
//                     onClick={() => {
//                       window.location.href = item.order_status_url;
//                     }}
//                   >
//                     {item.items.map((productItem, productIndex) => (
//                       <Stack direction={'row'} my={4} justifyContent={'space-between'} key={productIndex}>
//                         <Stack direction={'row'}>
//                           <img src={productItem.image} alt={'image'} loading="lazy" width={100} height={100} />
//                           <Box pl={2}>
//                             <Typography fontWeight={'bold'}>{productItem.title}</Typography>
//                             <Typography>{productItem.option}</Typography>
//                           </Box>
//                         </Stack>
//                         <Box textAlign={'right'}>
//                           <Typography>{`${productItem.price} ${item.currency}`}</Typography>
//                           <Typography>{`x${productItem.quantity}`}</Typography>
//                         </Box>
//                       </Stack>
//                     ))}
//                   </div>
//                   <Divider />
//                   <Box py={1}>
//                     <Typography textAlign={'right'}>{`${item.items.length} item in total`}</Typography>
//                     {Number(item.sub_total_price) > 0 && (
//                       <Typography textAlign={'right'}>
//                         Subtotal: <b>{`${item.sub_total_price} ${item.currency}`}</b>
//                       </Typography>
//                     )}
//                     {/* {Number(item.total_shipping) > 0 && (
//                       <Typography textAlign={'right'}>
//                         Shipping: <b>{`${item.total_shipping} ${item.currency}`}</b>
//                       </Typography>
//                     )} */}
//                     {Number(item.total_tax) > 0 && (
//                       <Typography textAlign={'right'}>
//                         Tax: <b>{`${item.total_tax} ${item.currency}`}</b>
//                       </Typography>
//                     )}
//                     {Number(item.total_tip) > 0 && (
//                       <Typography textAlign={'right'}>
//                         Tip: <b>{`${item.total_tip} ${item.currency}`}</b>
//                       </Typography>
//                     )}
//                     {Number(item.total_discounts) > 0 && (
//                       <Typography textAlign={'right'}>
//                         Discounts: <b>{`${item.total_discounts} ${item.currency}`}</b>
//                       </Typography>
//                     )}
//                     <Typography textAlign={'right'}>
//                       Total: <b>{`${item.total_price || 0} ${item.currency}`}</b>
//                     </Typography>
//                   </Box>
//                   <Divider />
//                   <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'} mt={2} gap={2}>
//                     <Card style={{ width: '100%' }}>
//                       <CardContent>
//                         <Typography variant="h6">Payment</Typography>
//                         <Stack mt={2} gap={1}>
//                           <Button
//                             variant={'contained'}
//                             onClick={() => {
//                               setCurrentOrder(item);
//                               setOpenBlockchainDialog(true);
//                             }}
//                             size="small"
//                           >
//                             Check blockchain
//                           </Button>
//                           {alignment === 'buy' && item.payment_confirmed === 2 && (
//                             <Button
//                               size="small"
//                               variant={'contained'}
//                               color={'error'}
//                               onClick={() => {
//                                 window.location.href = `/payment/${item.order_id}`;
//                               }}
//                             >
//                               Go to pay
//                             </Button>
//                           )}
//                           {alignment === 'sell' && item.payment_confirmed === 2 && (
//                             <Button
//                               variant={'contained'}
//                               color={'success'}
//                               onClick={() => {
//                                 setCurrentOrder(item);
//                                 setOpenConfirmPaymentDialog(true);
//                               }}
//                               size="small"
//                             >
//                               Confirm the payment
//                             </Button>
//                           )}
//                         </Stack>
//                       </CardContent>
//                     </Card>
//                     {/* <Card style={{ width: '100%' }}>
//                       <CardContent>
//                         <Typography variant="h6">Shipping</Typography>
//                         <Stack mt={2} gap={1}>
//                           {Number(item.total_shipping) > 0 ? (
//                             <>
//                               <Button
//                                 variant={'contained'}
//                                 onClick={() => {
//                                   setCurrentOrder(item);
//                                   setOpenShippingDialog(true);
//                                 }}
//                                 size="small"
//                               >
//                                 Check shipping
//                               </Button>
//                               {alignment === 'buy' && item.payment_confirmed === 1 && item.shipping_confirmed === 2 && (
//                                 <Button
//                                   variant={'contained'}
//                                   color={'success'}
//                                   onClick={() => {
//                                     setCurrentOrder(item);
//                                     setOpenConfirmShippingDialog(true);
//                                   }}
//                                   size="small"
//                                 >
//                                   Confirm the receipt of goods
//                                 </Button>
//                               )}
//                             </>
//                           ) : (
//                             <Card>
//                               <CardContent>
//                                 <Typography textAlign={'center'}>No shipping required for order</Typography>
//                               </CardContent>
//                             </Card>
//                           )}
//                         </Stack>
//                       </CardContent>
//                     </Card> */}
//                     <Card style={{ width: '100%' }}>
//                       <CardContent>
//                         <Typography variant="h6">More</Typography>
//                         <Stack mt={2} gap={1}>
//                           <Button
//                             variant={'contained'}
//                             onClick={() => {
//                               setCurrentOrder(item);
//                               setOpenOrderDetailsDialog(true);
//                             }}
//                             size="small"
//                           >
//                             Check details
//                           </Button>
//                           {alignment === 'buy' && (
//                             <>
//                               <Button
//                                 variant={'outlined'}
//                                 color={'inherit'}
//                                 onClick={() => {
//                                   setSnackSeverity('error');
//                                   setSnackMessage('Not support');
//                                   setSnackOpen(true);
//                                 }}
//                                 size="small"
//                               >
//                                 Buy again
//                               </Button>
//                               {item.payment_confirmed === 1 &&
//                                 // item.shipping_confirmed === 1 &&
//                                 item.confirmed !== 1 && (
//                                   <Button
//                                     variant={'contained'}
//                                     color={'success'}
//                                     onClick={() => {
//                                       setCurrentOrder(item);
//                                       setOpenConfirmDialog(true);
//                                     }}
//                                     size="small"
//                                   >
//                                     Confirm the order
//                                   </Button>
//                                 )}
//                               {item.confirmed === 1 && (
//                                 <>
//                                   {item.ratings && item.ratings.length > 0 ? (
//                                     <Button
//                                       variant={'contained'}
//                                       onClick={() => {
//                                         setCurrentOrder(item);
//                                         setOpenOrderRatingDialog(true);
//                                       }}
//                                       size="small"
//                                     >
//                                       Check rating
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       variant={'contained'}
//                                       color={'error'}
//                                       onClick={() => {
//                                         setCurrentOrder(item);
//                                         setPostOpenOrderRateDialog(true);
//                                       }}
//                                       size="small"
//                                     >
//                                       Rating now
//                                     </Button>
//                                   )}

//                                   <Button
//                                     variant={'outlined'}
//                                     color={'inherit'}
//                                     onClick={() => {
//                                       setSnackSeverity('error');
//                                       setSnackMessage('Not support');
//                                       setSnackOpen(true);
//                                     }}
//                                     size="small"
//                                   >
//                                     Apply for a refund
//                                   </Button>
//                                   <Button
//                                     variant={'outlined'}
//                                     color={'inherit'}
//                                     onClick={() => {
//                                       setSnackSeverity('error');
//                                       setSnackMessage('Not support');
//                                       setSnackOpen(true);
//                                     }}
//                                     size="small"
//                                   >
//                                     Delete an order
//                                   </Button>
//                                 </>
//                               )}
//                             </>
//                           )}
//                         </Stack>
//                       </CardContent>
//                     </Card>
//                   </Stack>
//                 </CardContent>
//               </Card>
//             </Box>
//           ))
//         ) : (
//           <Card>
//             <CardContent>
//               <Box py={2} textAlign={'center'}>
//                 <Typography variant="h6">Your order is empty</Typography>
//                 <Typography mt={2}>When there is a new order, it will be displayed here.</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         )}

//         {currentOrder && (
//           <>
//             <BlockchainDialog
//               currency={currentOrder.currency}
//               transactions={currentOrder.transactions}
//               openDialog={openBlockchainDialog}
//               handleCloseDialog={handleBlockchainCloseDialog}
//             />
//             <ConfirmPaymentDialog
//               orderId={currentOrder.order_id}
//               confirmNumber={currentOrder.payment_confirmed_number}
//               transactions={currentOrder.transactions}
//               openDialog={openConfirmPaymentDialog}
//               handleCloseDialog={handleConfirmPaymentCloseDialog}
//             />
//             {/* <ShippingDialog
//               alignment={alignment}
//               shippingConfirmed={currentOrder.shipping_confirmed}
//               shipping={currentOrder.shipping}
//               openDialog={openShippingDialog}
//               handleCloseDialog={handleShippingCloseDialog}
//             />
//             <ConfirmShippingDialog
//               orderId={currentOrder.order_id}
//               confirmNumber={currentOrder.shipping_confirmed_number}
//               shipping={currentOrder.shipping}
//               openDialog={openConfirmShippingDialog}
//               handleCloseDialog={handleConfirmShippingCloseDialog}
//             /> */}
//             <ConfirmOrderDialog
//               orderId={currentOrder.order_id}
//               confirmNumber={currentOrder.confirmed_number}
//               openDialog={openConfirmDialog}
//               handleCloseDialog={handleConfirmCloseDialog}
//             />
//             <OrderDetailsDialog
//               order={currentOrder}
//               openDialog={openOrderDetailsDialog}
//               handleCloseDialog={handleOrderDetailsCloseDialog}
//             />
//             <PostOrderRateDialog
//               orderId={currentOrder.order_id}
//               orderItems={currentOrder.items}
//               openDialog={openPostOrderRateDialog}
//               handleCloseDialog={handlePostOrderRateCloseDialog}
//             />
//             <OrderRatingDialog
//               ratings={currentOrder.ratings}
//               openDialog={openOrderRatingDialog}
//               handleCloseDialog={handleOrderRatingCloseDialog}
//             />
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ManageOrder;

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
  ShoppingBag, Store, PackageCheck, ChevronRight,
  Link2, CreditCard, FileText, Star, RotateCcw, Trash2, ShoppingCart, CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = ['Waiting for payment', 'Waiting for order confirm', 'Order complete']

// 进度步骤条
const OrderStepper = ({ activeStep }: { activeStep: number }) => (
  <div className="flex items-center w-full">
    {steps.map((label, i) => (
      <div key={i} className="flex items-center flex-1 last:flex-none">
        <div className="flex flex-col items-center gap-1">
          <div className={cn(
            "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
            i < activeStep ? "bg-sky-500 text-white" :
            i === activeStep ? "bg-sky-500 text-white ring-4 ring-sky-100" :
            "bg-gray-100 text-gray-400"
          )}>
            {i < activeStep ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
          </div>
          <span className={cn(
            "text-xs text-center max-w-20 leading-tight",
            i <= activeStep ? "text-sky-600 font-medium" : "text-gray-400"
          )}>
            {label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={cn(
            "flex-1 h-0.5 mx-2 mb-5 transition-colors",
            i < activeStep ? "bg-sky-500" : "bg-gray-200"
          )} />
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

  const showError = (msg: string) => { setSnackSeverity('error'); setSnackMessage(msg); setSnackOpen(true) }

  const init = async (kind: string) => {
    try {
      const response: any = await axios.get(Http.order, { params: { kind: kind === 'buy' ? 1 : 2 } })
      setOrders(response.result ? response.data : [])
    } catch { showError('Network error. Please try again later.') }
  }

  const refreshAndClose = (closeFn: (v: boolean) => void) => async () => {
    await init(alignment)
    closeFn(false)
  }

  useEffect(() => { init('buy') }, [])

  const getActiveStep = (item: OrderType) =>
    item.payment_confirmed === 1 ? (item.confirmed === 1 ? 2 : 1) : 0

  const openDialog = (order: OrderType, fn: (v: boolean) => void) => {
    setCurrentOrder(order)
    fn(true)
  }

  return (
    <div className="flex flex-col gap-4">

      {/* 标题 + 切换 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
            <PackageCheck className="h-4 w-4 text-sky-500" />
          </div>
          <div>
            <h3 className="font-semibold">All Orders</h3>
            <p className="text-xs text-muted-foreground">{orders?.length} order{orders?.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Buy / Sell 切换 */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          {(['buy', 'sell'] as const).map((type) => (
            <button
              key={type}
              onClick={async () => { setAlignment(type); await init(type) }}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors",
                alignment === type
                  ? "bg-sky-500 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              )}
            >
              {type === 'buy'
                ? <ShoppingBag className="h-4 w-4" />
                : <Store className="h-4 w-4" />
              }
              {type === 'buy' ? 'Buying' : 'Selling'}
            </button>
          ))}
        </div>
      </div>

      {/* 订单列表 */}
      {orders?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((item, index) => (
            <Card key={index} className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">

                {/* 订单头部：进度条 */}
                <div className="px-6 pt-5 pb-4 bg-gray-50 border-b">
                  <OrderStepper activeStep={getActiveStep(item)} />
                </div>

                <div className="p-6 flex flex-col gap-4">

                  {/* 卖家/买家信息 + 状态 */}
                  <div className="flex items-center justify-between">
                    <button
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      onClick={() => { window.location.href = `/profile/${item.username}` }}
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
                        item.confirmed === 1,
                      )}
                    </span>
                  </div>

                  {/* 商品列表 */}
                  <div
                    className="flex flex-col gap-3 cursor-pointer"
                    onClick={() => { window.location.href = item.order_status_url }}
                  >
                    {item.items.map((productItem, pi) => (
                      <div key={pi} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={productItem.image} alt="product"
                            className="h-16 w-16 object-cover rounded-xl border shrink-0"
                            loading="lazy"
                          />
                          <div>
                            <p className="text-sm font-semibold line-clamp-1">{productItem.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{productItem.option}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold">{productItem.price} {item.currency}</p>
                          <p className="text-xs text-muted-foreground">×{productItem.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 价格汇总 */}
                  <div className="border-t pt-3 flex flex-col gap-1">
                    {[
                      { label: 'Subtotal', value: item.sub_total_price },
                      { label: 'Tax', value: item.total_tax },
                      { label: 'Tip', value: item.total_tip },
                      { label: 'Discounts', value: item.total_discounts },
                    ].filter(({ value }) => Number(value) > 0).map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-sm text-muted-foreground">
                        <span>{label}</span>
                        <span>{value} {item.currency}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-bold mt-1 pt-1 border-t">
                      <span>Total</span>
                      <span>{item.total_price || 0} {item.currency}</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">
                      {item.items.length} item{item.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* 操作区 */}
                  <div className="grid grid-cols-2 gap-3 border-t pt-4">

                    {/* 支付 */}
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                        <CreditCard className="h-3.5 w-3.5" /> Payment
                      </p>
                      <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 justify-start"
                        onClick={() => openDialog(item, setOpenBlockchainDialog)}>
                        <Link2 className="h-3.5 w-3.5" /> Check blockchain
                      </Button>
                      {alignment === 'buy' && item.payment_confirmed === 2 && (
                        <Button size="sm" className="h-8 text-xs bg-red-500 hover:bg-red-600 text-white gap-1.5 justify-start"
                          onClick={() => { window.location.href = `/payment/${item.order_id}` }}>
                          <CreditCard className="h-3.5 w-3.5" /> Go to pay
                        </Button>
                      )}
                      {alignment === 'sell' && item.payment_confirmed === 2 && (
                        <Button size="sm" className="h-8 text-xs bg-green-500 hover:bg-green-600 text-white gap-1.5 justify-start"
                          onClick={() => openDialog(item, setOpenConfirmPaymentDialog)}>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Confirm payment
                        </Button>
                      )}
                    </div>

                    {/* 更多操作 */}
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" /> Actions
                      </p>
                      <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 justify-start"
                        onClick={() => openDialog(item, setOpenOrderDetailsDialog)}>
                        <FileText className="h-3.5 w-3.5" /> Order details
                      </Button>

                      {alignment === 'buy' && (
                        <>
                          <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 justify-start"
                            onClick={() => showError('Not supported yet')}>
                            <ShoppingCart className="h-3.5 w-3.5" /> Buy again
                          </Button>

                          {item.payment_confirmed === 1 && item.confirmed !== 1 && (
                            <Button size="sm" className="h-8 text-xs bg-sky-500 hover:bg-sky-600 text-white gap-1.5 justify-start"
                              onClick={() => openDialog(item, setOpenConfirmDialog)}>
                              <CheckCircle2 className="h-3.5 w-3.5" /> Confirm order
                            </Button>
                          )}

                          {item.confirmed === 1 && (
                            <>
                              {item.ratings?.length > 0 ? (
                                <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 justify-start"
                                  onClick={() => openDialog(item, setOpenOrderRatingDialog)}>
                                  <Star className="h-3.5 w-3.5" /> View rating
                                </Button>
                              ) : (
                                <Button size="sm" className="h-8 text-xs bg-amber-500 hover:bg-amber-600 text-white gap-1.5 justify-start"
                                  onClick={() => openDialog(item, setPostOpenOrderRateDialog)}>
                                  <Star className="h-3.5 w-3.5" /> Rate now
                                </Button>
                              )}
                              <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 justify-start"
                                onClick={() => showError('Not supported yet')}>
                                <RotateCcw className="h-3.5 w-3.5" /> Request refund
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 text-xs text-red-500 hover:text-red-600 gap-1.5 justify-start"
                                onClick={() => showError('Not supported yet')}>
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
              {alignment === 'buy' ? 'Orders you place will appear here.' : 'Orders from your products will appear here.'}
            </p>
          </div>
        </div>
      )}

      {/* 弹窗 */}
      {currentOrder && (
        <>
          <BlockchainDialog currency={currentOrder.currency} transactions={currentOrder.transactions}
            openDialog={openBlockchainDialog} handleCloseDialog={refreshAndClose(setOpenBlockchainDialog)} />
          <ConfirmPaymentDialog orderId={currentOrder.order_id} confirmNumber={currentOrder.payment_confirmed_number}
            transactions={currentOrder.transactions} openDialog={openConfirmPaymentDialog}
            handleCloseDialog={refreshAndClose(setOpenConfirmPaymentDialog)} />
          <ConfirmOrderDialog orderId={currentOrder.order_id} confirmNumber={currentOrder.confirmed_number}
            openDialog={openConfirmDialog} handleCloseDialog={refreshAndClose(setOpenConfirmDialog)} />
          <OrderDetailsDialog order={currentOrder} openDialog={openOrderDetailsDialog}
            handleCloseDialog={refreshAndClose(setOpenOrderDetailsDialog)} />
          <PostOrderRateDialog orderId={currentOrder.order_id} orderItems={currentOrder.items}
            openDialog={openPostOrderRateDialog} handleCloseDialog={refreshAndClose(setPostOpenOrderRateDialog)} />
          <OrderRatingDialog ratings={currentOrder.ratings} openDialog={openOrderRatingDialog}
            handleCloseDialog={refreshAndClose(setOpenOrderRatingDialog)} />
        </>
      )}
    </div>
  )
}

export default ManageOrder