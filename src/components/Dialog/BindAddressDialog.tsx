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
import { CHAINIDS } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { FindChainNamesByChainids } from 'utils/web3';

type DialogType = {
  chain: CHAINIDS;
  address?: string;
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function BindAddressDialog(props: DialogType) {
  const [address, setAddress] = useState<string>();

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  useEffect(() => {
    setAddress(props.address || '');
  }, [props.address]);

  const onClickEditProfile = async () => {
    try {
      const response: any = await axios.put(Http.wallet, {
        handle: 1,
        chain_id: props.chain,
        address: address,
      });

      if (response.result) {
        await props.handleCloseDialog();

        setSnackSeverity('success');
        setSnackMessage('Update successfully');
        setSnackOpen(true);
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message);
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
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
      <DialogTitle>Bind Address</DialogTitle>
      <DialogContent>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Typography>Chain:</Typography>
          <Typography fontWeight={'bold'}>{FindChainNamesByChainids(props.chain)}</Typography>
        </Stack>
        <Box mt={2}>
          <Typography mb={1}>Address</Typography>
          <TextField
            hiddenLabel
            size="small"
            fullWidth
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </Box>
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
        <Button color="success" variant={'contained'} onClick={onClickEditProfile}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
