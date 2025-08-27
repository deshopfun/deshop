import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { CHAINIDS } from 'packages/constants';
import { OmitMiddleString } from 'utils/strings';
import { FindChainNamesByChainids, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3';

type RatingType = {
  rating_id: number;
  product_option: string;
  number: number;
  image: string;
  body: string;
  create_time: number;
};

type DialogType = {
  ratings: RatingType[];
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function OrderRatingDialog(props: DialogType) {
  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.handleCloseDialog();
      }}
      fullWidth
    >
      <DialogTitle>Ratings</DialogTitle>
      <DialogContent>
        {props.ratings &&
          props.ratings.length > 0 &&
          props.ratings.map((item, index) => (
            <Box key={index}>
              <Typography>{item.body}</Typography>
              {item.image && (
                <Box mt={1}>
                  <img src={item.image} alt={'image'} loading="lazy" width={50} height={50} />
                </Box>
              )}
              <Stack direction={'row'} alignItems={'center'} mt={1} gap={1}>
                <Typography>Rating:</Typography>
                <Rating size="small" value={item.number || 0} readOnly />
                <Typography>|</Typography>
                <Typography>{item.product_option}</Typography>
              </Stack>
              <Typography fontWeight={'bold'} mt={1} textAlign={'right'}>
                {new Date(item.create_time).toLocaleString()}
              </Typography>
              <Box py={2}>
                <Divider />
              </Box>
            </Box>
          ))}
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
