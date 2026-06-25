// import { OrderType } from 'utils/types';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

// type DialogType = {
//   order: OrderType;
//   openDialog: boolean;
//   handleCloseDialog: () => Promise<void>;
// };

// // export default function OrderDetailsDialog(props: DialogType) {
// export default function OrderDetailsDialog({order, openDialog, handleCloseDialog}: DialogType) {

//   const handleClose = () => {
//     handleCloseDialog()
//   }

//   return (
//     <Dialog
//       open={openDialog}
//       onOpenChange={handleClose}
//     >

//       <DialogContent className="max-w-md rounded-2xl p-0 gap-0 overflow-hidden">

//       </DialogContent>

//       <DialogTitle>Order details</DialogTitle>
//       <DialogContent>
//         <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//           <Typography>Buyer Username</Typography>
//           <Typography fontWeight={'bold'}>{props.order.customer_username}</Typography>
//         </Stack>
//         <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//           <Typography>Seller Username</Typography>
//           <Typography fontWeight={'bold'}>{props.order.username}</Typography>
//         </Stack>
//         {Number(props.order.sub_total_price) > 0 && (
//           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//             <Typography>Subtotal</Typography>
//             <Typography fontWeight={'bold'}>{`${props.order.sub_total_price} ${props.order.currency}`}</Typography>
//           </Stack>
//         )}
//         {/* {Number(props.order.total_shipping) > 0 && (
//           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//             <Typography>Shipping</Typography>
//             <Typography fontWeight={'bold'}>{`${props.order.total_shipping} ${props.order.currency}`}</Typography>
//           </Stack>
//         )} */}
//         {Number(props.order.total_tax) > 0 && (
//           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//             <Typography>Tax</Typography>
//             <Typography fontWeight={'bold'}>{`${props.order.total_tax} ${props.order.currency}`}</Typography>
//           </Stack>
//         )}
//         {Number(props.order.total_tip) > 0 && (
//           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//             <Typography>Tip</Typography>
//             <Typography fontWeight={'bold'}>{`${props.order.total_tip} ${props.order.currency}`}</Typography>
//           </Stack>
//         )}
//         {Number(props.order.total_discounts) > 0 && (
//           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//             <Typography>Discounts</Typography>
//             <Typography fontWeight={'bold'}>{`${props.order.total_discounts} ${props.order.currency}`}</Typography>
//           </Stack>
//         )}
//         <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//           <Typography>Total</Typography>
//           <Typography fontWeight={'bold'}>{`${props.order.total_price || 0} ${props.order.currency}`}</Typography>
//         </Stack>
//         <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//           <Typography>Payment status</Typography>
//           <Typography fontWeight={'bold'} color={props.order.payment_confirmed === 1 ? 'success' : 'error'}>
//             {props.order.payment_confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
//           </Typography>
//         </Stack>
//         {/* <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//           <Typography>Shipping status</Typography>
//           <Typography fontWeight={'bold'} color={props.order.shipping_confirmed === 1 ? 'success' : 'error'}>
//             {props.order.shipping_confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
//           </Typography>
//         </Stack> */}
//         <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//           <Typography>Order status</Typography>
//           <Typography fontWeight={'bold'} color={props.order.confirmed === 1 ? 'success' : 'error'}>
//             {props.order.confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
//           </Typography>
//         </Stack>
//         <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//           <Typography>Create time</Typography>
//           <Typography fontWeight={'bold'}>{new Date(props.order.create_time).toLocaleString()}</Typography>
//         </Stack>
//         <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//           <Typography>Update time</Typography>
//           <Typography fontWeight={'bold'}>{new Date(props.order.update_time).toLocaleString()}</Typography>
//         </Stack>
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


import { OrderType } from '@/utils/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

type DialogType = {
  order: OrderType;
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function OrderDetailsDialog({
  order,
  openDialog,
  handleCloseDialog,
}: DialogType) {
  const handleClose = async () => {
    await handleCloseDialog();
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleClose}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <Card>
          <CardContent className="p-6 space-y-5">
            {/* Buyer & Seller */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Buyer</p>
                <p className="font-semibold">{order.customer_username}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Seller</p>
                <p className="font-semibold">{order.username}</p>
              </div>
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-3">
              {Number(order.sub_total_price) > 0 && (
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {order.sub_total_price} {order.currency}
                  </span>
                </div>
              )}

              {Number(order.total_tax) > 0 && (
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium">
                    {order.total_tax} {order.currency}
                  </span>
                </div>
              )}

              {Number(order.total_tip) > 0 && (
                <div className="flex justify-between">
                  <span>Tip</span>
                  <span className="font-medium">
                    {order.total_tip} {order.currency}
                  </span>
                </div>
              )}

              {Number(order.total_discounts) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discounts</span>
                  <span>-{order.total_discounts} {order.currency}</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>
                  {order.total_price || 0} {order.currency}
                </span>
              </div>
            </div>

            <Separator />

            {/* Status */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Status</span>
                <Badge variant={order.payment_confirmed === 1 ? 'default' : 'secondary'}>
                  {order.payment_confirmed === 1 ? 'Paid' : 'Pending'}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Order Status</span>
                <Badge variant={order.confirmed === 1 ? 'default' : 'secondary'}>
                  {order.confirmed === 1 ? 'Completed' : 'Processing'}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Created</p>
                <p>{new Date(order.create_time).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Updated</p>
                <p>{new Date(order.update_time).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter>
          <Button onClick={handleClose} variant="outline" className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}