import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

type DialogType = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

export default function UserAddressDialog(props: DialogType) {
  const handleClose = () => {
    props.setOpenDialog(false);
  };

  const onClickEditAddress = async () => {};

  return (
    <Dialog open={props.openDialog} onClose={handleClose} fullWidth>
      <DialogTitle>Add new shipping address</DialogTitle>
      <DialogContent>
        <Stack direction={'row'} alignItems={'center'} gap={2}>
          <Box width={'100%'}>
            <Typography mb={1}>First name</Typography>
            <TextField
              hiddenLabel
              size="small"
              fullWidth
              value={''}
              onChange={(e) => {}}
              placeholder="Enter first name"
            />
          </Box>
          <Box width={'100%'}>
            <Typography mb={1}>Last name</Typography>
            <TextField
              hiddenLabel
              size="small"
              fullWidth
              value={''}
              onChange={(e) => {}}
              placeholder="Enter last name"
            />
          </Box>
        </Stack>
        <Box mt={3}>
          <Typography mb={1}>Email address</Typography>
          <TextField
            hiddenLabel
            size="small"
            fullWidth
            value={''}
            onChange={(e) => {}}
            placeholder="Enter email address"
          />
        </Box>
        <Box mt={3}>
          <Typography mb={1}>Phone number</Typography>
          <TextField
            hiddenLabel
            size="small"
            fullWidth
            value={''}
            onChange={(e) => {}}
            placeholder="Enter phone number"
          />
        </Box>
        <Box mt={3}>
          <Typography mb={1}>Country</Typography>
          <FormControl hiddenLabel fullWidth>
            <Select
              displayEmpty
              value={''}
              onChange={() => {}}
              size={'small'}
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <em>Choose state</em>;
                }

                return selected.join(', ');
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Stack mt={3} direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
          <Box>
            <Typography mb={1}>City</Typography>
            <TextField hiddenLabel size="small" fullWidth value={''} onChange={(e) => {}} placeholder="Enter city" />
          </Box>
          <Box>
            <Typography mb={1}>State</Typography>
            <TextField hiddenLabel size="small" fullWidth value={''} onChange={(e) => {}} placeholder="Enter state" />
          </Box>
          <Box>
            <Typography mb={1}>ZIP Code</Typography>
            <TextField
              hiddenLabel
              size="small"
              fullWidth
              value={''}
              onChange={(e) => {}}
              placeholder="Enter ZIP code"
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant={'contained'} onClick={handleClose}>
          Close
        </Button>
        <Button color="success" variant={'contained'} onClick={onClickEditAddress}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
