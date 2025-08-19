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
import Link from 'next/link';
import { CHAINIDS } from 'packages/constants';
import { OmitMiddleString } from 'utils/strings';
import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3';
import { useState } from 'react';
import { useSnackPresistStore } from 'lib';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type BlockchainType = {
  qrcode: string;
  rate: string;
  chain_id: number;
  hash: string;
  address: string;
  from_address: string;
  to_address: string;
  token: string;
  transact_type: string;
  crypto_amount: string;
  block_timestamp: number;
};

type DialogType = {
  orderId: number;
  confirmNumber: string;
  blockchain: BlockchainType;
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function ConfirmPaymentDialog(props: DialogType) {
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

      const response: any = await axios.put(Http.order_confirm_payment, {
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
      <DialogTitle>Confirm payment</DialogTitle>
      <DialogContent>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Chain</Typography>
          <Typography fontWeight={'bold'}>{FindChainNamesByChainids(props.blockchain.chain_id)}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Hash</Typography>
          <Link
            href={GetBlockchainTxUrlByChainIds(props.blockchain.chain_id as CHAINIDS, String(props.blockchain.hash))}
            target="_blank"
          >
            {OmitMiddleString(String(props.blockchain.hash))}
          </Link>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>From address</Typography>
          <Link
            href={GetBlockchainAddressUrlByChainIds(
              props.blockchain.chain_id as CHAINIDS,
              String(props.blockchain.from_address),
            )}
            target="_blank"
          >
            {OmitMiddleString(String(props.blockchain.from_address))}
          </Link>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>To address</Typography>
          <Link
            href={GetBlockchainAddressUrlByChainIds(
              props.blockchain.chain_id as CHAINIDS,
              String(props.blockchain.to_address),
            )}
            target="_blank"
          >
            {OmitMiddleString(String(props.blockchain.to_address))}
          </Link>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Token</Typography>
          <Typography fontWeight={'bold'}>{props.blockchain.token}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Crypto amount</Typography>
          <Typography fontWeight={'bold'}>{props.blockchain.crypto_amount}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Rate</Typography>
          <Typography fontWeight={'bold'}>{`1 ${props.blockchain.token} = ${props.blockchain.rate} USD`}</Typography>
        </Stack>
        {props.blockchain.block_timestamp > 0 && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography>Block timestamp</Typography>
            <Typography fontWeight={'bold'}>
              {new Date(Number(props.blockchain.block_timestamp)).toLocaleString()}
            </Typography>
          </Stack>
        )}
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
          Confirm the payment
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
