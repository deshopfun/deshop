import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';

type OrderType = {
  customer_username: string;
  username: string;
  sub_total_price: string;
  total_discounts: string;
  total_tax: string;
  total_tip: string;
  total_shipping: string;
  total_price: string;
  currency: string;
  confirmed: number;
  payment_confirmed: number;
  shipping_confirmed: number;
  create_time: number;
  update_time: number;
};

type DialogType = {
  order: OrderType;
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function OrderDetailsDialog(props: DialogType) {
  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.handleCloseDialog();
      }}
      fullWidth
    >
      <DialogTitle>Order details</DialogTitle>
      <DialogContent>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Customer Username</Typography>
          <Typography fontWeight={'bold'}>{props.order.customer_username}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Merchant Username</Typography>
          <Typography fontWeight={'bold'}>{props.order.username}</Typography>
        </Stack>
        {Number(props.order.sub_total_price) > 0 && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography>Subtotal</Typography>
            <Typography fontWeight={'bold'}>{`${props.order.sub_total_price} ${props.order.currency}`}</Typography>
          </Stack>
        )}
        {Number(props.order.total_shipping) > 0 && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography>Shipping</Typography>
            <Typography fontWeight={'bold'}>{`${props.order.total_shipping} ${props.order.currency}`}</Typography>
          </Stack>
        )}
        {Number(props.order.total_tax) > 0 && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography>Tax</Typography>
            <Typography fontWeight={'bold'}>{`${props.order.total_tax} ${props.order.currency}`}</Typography>
          </Stack>
        )}
        {Number(props.order.total_tip) > 0 && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography>Tip</Typography>
            <Typography fontWeight={'bold'}>{`${props.order.total_tip} ${props.order.currency}`}</Typography>
          </Stack>
        )}
        {Number(props.order.total_discounts) > 0 && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography>Discounts</Typography>
            <Typography fontWeight={'bold'}>{`${props.order.total_discounts} ${props.order.currency}`}</Typography>
          </Stack>
        )}
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Total</Typography>
          <Typography fontWeight={'bold'}>{`${props.order.total_price || 0} ${props.order.currency}`}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Payment status</Typography>
          <Typography fontWeight={'bold'} color={props.order.payment_confirmed === 1 ? 'success' : 'error'}>
            {props.order.payment_confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Shipping status</Typography>
          <Typography fontWeight={'bold'} color={props.order.shipping_confirmed === 1 ? 'success' : 'error'}>
            {props.order.shipping_confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Order status</Typography>
          <Typography fontWeight={'bold'} color={props.order.confirmed === 1 ? 'success' : 'error'}>
            {props.order.confirmed === 1 ? 'Complete' : 'Waiting for confirm'}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Create time</Typography>
          <Typography fontWeight={'bold'}>{new Date(props.order.create_time).toLocaleString()}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Update time</Typography>
          <Typography fontWeight={'bold'}>{new Date(props.order.update_time).toLocaleString()}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant={'contained'}
          onClick={() => {
            props.handleCloseDialog();
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
