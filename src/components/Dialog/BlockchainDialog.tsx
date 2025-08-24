import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { CHAINIDS } from 'packages/constants';
import { OmitMiddleString } from 'utils/strings';
import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3';

type BlockchainType = {
  rate: string;
  chain_id: number;
  hash: string;
  address: string;
  from_address: string;
  to_address: string;
  token: string;
  crypto_amount: string;
  block_timestamp: number;
};

type TransactionType = {
  select: number;
  transaction_id: number;
  amount: string;
  currency: number;
  gateway: string;
  message: string;
  source_name: number;
  transaction_status: number;
  blockchain: BlockchainType;
};

type DialogType = {
  currency: string;
  transactions: TransactionType[];
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function BlockchainDialog(props: DialogType) {
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
        {props.transactions && props.transactions.length > 0 ? (
          props.transactions.map((item, index) => (
            <Box key={index}>
              {item.select === 1 && (
                <Stack direction={'row'} alignItems={'center'} justifyContent={'right'}>
                  <Chip label={'Select'} color={'success'} size="small" />
                </Stack>
              )}

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
                {item.blockchain.rate && (
                  <Typography
                    fontWeight={'bold'}
                  >{`1 ${item.blockchain.token} = ${item.blockchain.rate} ${item.currency}`}</Typography>
                )}
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
          ))
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
