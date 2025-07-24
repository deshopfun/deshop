import { PhotoCamera } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { CHAINIDS } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { FindChainNamesByChainids, FindChainNamesByChains } from 'utils/web3';

type DialogType = {
  chain: CHAINIDS;
  address?: string;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

export default function BindAddressDialog(props: DialogType) {
  const [address, setAddress] = useState<string>();

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  useEffect(() => {
    setAddress(props.address);
  }, [props.address]);

  const onClickEditProfile = async () => {
    const response: any = await axios.put(Http.wallet, {
      chain: props.chain,
      address: address,
    });

    if (response.result) {
      setSnackSeverity('success');
      setSnackMessage('Update successfully');
      setSnackOpen(true);
      handleClose();

      //   window.location.href = `/profile/${username}`;
    } else {
      setSnackSeverity('error');
      setSnackMessage(response.message);
      setSnackOpen(true);
    }
  };

  return (
    <Dialog open={props.openDialog} onClose={handleClose} fullWidth>
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
        <Button variant={'contained'} onClick={handleClose}>
          Close
        </Button>
        <Button color="success" variant={'contained'} onClick={onClickEditProfile}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
