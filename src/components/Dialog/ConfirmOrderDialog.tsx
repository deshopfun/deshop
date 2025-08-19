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
import { useState } from 'react';
import { useSnackPresistStore } from 'lib';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type DialogType = {
  orderId: number;
  confirmNumber: string;
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function ConfirmOrderDialog(props: DialogType) {
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

      const response: any = await axios.put(Http.order_confirm, {
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
      <DialogTitle>Confirm order</DialogTitle>
      <DialogContent>
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
          Confirm the order
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
