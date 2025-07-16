import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

type DialogType = {
  email: string;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

export default function RegisterDialog(props: DialogType) {
  const handleClose = () => {
    props.setOpenDialog(false);
  };

  return (
    <Dialog open={props.openDialog} onClose={handleClose} fullWidth>
      <DialogTitle>Check your email</DialogTitle>
      <DialogContent>
        <Typography>Please click the link in the email to complete your registration.</Typography>
        <Stack direction={'row'} alignItems={'center'} mt={2}>
          <Typography>Your email:</Typography>
          <Typography fontWeight={'bold'} pl={1}>
            {props.email}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant={'contained'} onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
