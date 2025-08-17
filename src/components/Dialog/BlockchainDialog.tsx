import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackPresistStore } from 'lib';
import Link from 'next/link';
import { CHAINIDS } from 'packages/constants';
import { WEB3 } from 'packages/web3/web3';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { OmitMiddleString } from 'utils/strings';
import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3';

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
  blockchain: BlockchainType;
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function BlockchainDialog(props: DialogType) {
  const [address, setAddress] = useState<string>();

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.handleCloseDialog();
      }}
      fullWidth
    >
      <DialogTitle>Blockchain</DialogTitle>
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
