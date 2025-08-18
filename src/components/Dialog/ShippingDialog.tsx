import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { CHAINIDS, SHIPPING_TYPE } from 'packages/constants';
import { OmitMiddleString } from 'utils/strings';
import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3';

type ShippingType = {
  address_one: string;
  address_two: string;
  city: string;
  company: string;
  country: string;
  country_code: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  province: string;
  province_code: string;
  shipping_type: number;
  zip: string;
};

type DialogType = {
  alignment: 'buy' | 'sell';
  shipping: ShippingType;
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function ShippingDialog(props: DialogType) {
  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.handleCloseDialog();
      }}
      fullWidth
    >
      <DialogTitle>Shipping</DialogTitle>
      <DialogContent>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Shipping type</Typography>
          <Typography fontWeight={'bold'} color={'error'}>
            {props.alignment === 'buy' && props.shipping.shipping_type === 1 && 'Goods to be received'}
            {props.alignment === 'buy' && props.shipping.shipping_type === 2 && 'To be picked up'}
            {props.alignment === 'sell' && props.shipping.shipping_type === 1 && 'Waiting for delivery'}
            {props.alignment === 'sell' && props.shipping.shipping_type === 2 && 'Waiting for customers to pick up'}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Username</Typography>
          <Typography fontWeight={'bold'}>{`${props.shipping.first_name} ${props.shipping.last_name}`}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Email</Typography>
          <Typography fontWeight={'bold'}>{props.shipping.email}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Company</Typography>
          <Typography fontWeight={'bold'}>{props.shipping.company}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Phone</Typography>
          <Typography fontWeight={'bold'}>{props.shipping.phone}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Address line 1</Typography>
          <Typography fontWeight={'bold'}>{props.shipping.address_one}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Address line 2</Typography>
          <Typography fontWeight={'bold'}>{props.shipping.address_two}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Country/Region</Typography>
          <Typography fontWeight={'bold'}>{props.shipping.country}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>City</Typography>
          <Typography fontWeight={'bold'}>{props.shipping.city}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>State/Province</Typography>
          <Typography fontWeight={'bold'}>{props.shipping.province}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>ZIP/Postal code</Typography>
          <Typography fontWeight={'bold'}>{props.shipping.zip}</Typography>
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
