import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Radio,
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
import { TransactionType } from 'utils/types';

type DialogType = {
  orderId: number;
  confirmNumber: string;
  transactions: TransactionType[];
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function ConfirmPaymentDialog(props: DialogType) {
  const [text, setText] = useState<string>('');
  const [selectId, setSelectId] = useState<number>(0);

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

      if (!selectId) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect tx select');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.put(Http.order_confirm_payment, {
        order_id: props.orderId,
        confirm_payment_id: Number(selectId),
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
        {props.transactions && props.transactions.length > 0 ? (
          <Box>
            {props.transactions.map((item, index) => (
              <Box key={index}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Select</Typography>
                  <Radio
                    size="small"
                    checked={item.transaction_id === selectId ? true : false}
                    onClick={() => {
                      setSelectId(item.transaction_id);
                    }}
                  />
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Chain</Typography>
                  <Typography fontWeight={'bold'}>{FindChainNamesByChainids(item.blockchain.chain_id)}</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Hash</Typography>
                  <Link
                    href={GetBlockchainTxUrlByChainIds(
                      item.blockchain.chain_id as CHAINIDS,
                      String(item.blockchain.hash),
                    )}
                    target="_blank"
                  >
                    {OmitMiddleString(String(item.blockchain.hash))}
                  </Link>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>From address</Typography>
                  <Link
                    href={GetBlockchainAddressUrlByChainIds(
                      item.blockchain.chain_id as CHAINIDS,
                      String(item.blockchain.from_address),
                    )}
                    target="_blank"
                  >
                    {OmitMiddleString(String(item.blockchain.from_address))}
                  </Link>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>To address</Typography>
                  <Link
                    href={GetBlockchainAddressUrlByChainIds(
                      item.blockchain.chain_id as CHAINIDS,
                      String(item.blockchain.to_address),
                    )}
                    target="_blank"
                  >
                    {OmitMiddleString(String(item.blockchain.to_address))}
                  </Link>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Token</Typography>
                  <Typography fontWeight={'bold'}>{item.blockchain.token}</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Crypto amount</Typography>
                  <Typography fontWeight={'bold'}>{item.blockchain.crypto_amount}</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography>Rate</Typography>
                  <Typography
                    fontWeight={'bold'}
                  >{`1 ${item.blockchain.token} = ${item.blockchain.rate} USD`}</Typography>
                </Stack>
                {item.blockchain.block_timestamp > 0 && (
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>Block timestamp</Typography>
                    <Typography fontWeight={'bold'}>
                      {new Date(Number(item.blockchain.block_timestamp)).toLocaleString()}
                    </Typography>
                  </Stack>
                )}

                <Box py={2}>
                  <Divider />
                </Box>
              </Box>
            ))}
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
          </Box>
        ) : (
          <Card>
            <CardContent>
              <Box py={2} textAlign={'center'}>
                <Typography variant="h6">blockchain is empty</Typography>
                <Typography mt={2}>No records have been paid.</Typography>
              </Box>
            </CardContent>
          </Card>
        )}
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
