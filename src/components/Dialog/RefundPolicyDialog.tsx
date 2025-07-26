import { Close, Star, ThumbUpOffAlt } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

type DialogType = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

export default function RefundPolicyDialog(props: DialogType) {
  const handleClose = () => {
    props.setOpenDialog(false);
  };

  return (
    <Dialog open={props.openDialog} onClose={handleClose} fullWidth>
      <DialogTitle>Refund Policy</DialogTitle>
      <IconButton
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
        onClick={handleClose}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>
        <Typography variant="h6" textAlign={'center'}>
          Product Returns
        </Typography>
        <Box mt={2}>
          <Typography>Terms and Guidelines:</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
