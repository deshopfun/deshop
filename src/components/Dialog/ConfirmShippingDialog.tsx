import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

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
  orderId: number;
  confirmNumber: string;
  shipping: ShippingType;
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function ConfirmShippingDialog(props: DialogType) {
  const [text, setText] = useState<string>('');

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const onClickConfirm = async () => {
    try {
      if (!props.orderId) {
        return;
      }

      if (!text || text === '' || text !== props.confirmNumber) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect text input');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.put(Http.order_confirm_shipping, {
        order_id: props.orderId,
        confirm_number: text,
      });

      if (response.result) {
        await props.handleCloseDialog();

        setSnackSeverity('success');
        setSnackMessage('Confirm successfully');
        setSnackOpen(true);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Confirm Failed');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };
  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.handleCloseDialog();
      }}
      fullWidth
    >
      <DialogTitle>Confirm shipping</DialogTitle>
      <DialogContent>
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
        <Box py={2}>
          <Divider />
        </Box>
        <Typography>
          To confirm, type "<b>{props.confirmNumber}</b>" in the box below
        </Typography>
        <Box py={1}>
          <TextField
            hiddenLabel
            size="small"
            fullWidth
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Box>
        <Button
          color="success"
          fullWidth
          variant={'contained'}
          onClick={() => {
            onClickConfirm();
          }}
        >
          Confirm the shipping
        </Button>
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
