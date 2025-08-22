import { Close, Star, ThumbUpOffAlt } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { RATING_TYPE, SORT_BY_TYPE } from 'packages/constants';
import { useEffect, useState } from 'react';
import { Http } from 'utils/http/http';
import axios from 'utils/http/axios';
import { useSnackPresistStore } from 'lib';

type ProductRating = {
  username: string;
  rating_id: number;
  product_option: string;
  number: number;
  image: string;
  body: string;
  created_at: number;
};

type DialogType = {
  product_id: number;
  ratings: ProductRating[];
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

export default function ProductRatingsDialog(props: DialogType) {
  const [ratings, setRatings] = useState<ProductRating[]>([]);
  const [reviewSearch, setReviewSearch] = useState<string>('');
  const [selectSortBy, setSelectSortBy] = useState<string>('');
  const [selectRating, setSelectRating] = useState<string>('');

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  const init = async (product_id: number, selectSortBy: string, selectRating: string) => {
    try {
      if (!product_id) {
        return;
      }

      var ratingVal = 0;
      if (!isNaN(parseInt(selectRating))) {
        ratingVal = parseInt(selectRating);
      }

      const response: any = await axios.get(Http.product_rating_by_id, {
        params: {
          product_id: product_id,
          sort_by: selectSortBy ? selectSortBy : undefined,
          rating_number: ratingVal,
        },
      });

      if (response.result) {
        setRatings(response.data);
      } else {
        setRatings([]);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    props.product_id && init(props.product_id, selectSortBy, selectRating);
  }, [props.product_id, selectSortBy, selectRating]);

  return (
    <Dialog open={props.openDialog} onClose={handleClose} fullWidth>
      <DialogTitle>Ratings and reviews</DialogTitle>
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
        <Stack direction={'row'} alignItems={'center'} gap={0}>
          <Box width={'20%'}>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography variant="h4">
                {props.ratings
                  ? (
                      props.ratings.reduce((total, item) => {
                        return total + item.number;
                      }, 0) / props.ratings.length
                    ).toFixed(1)
                  : 0}
              </Typography>
              <Star />
            </Stack>
            <Typography color="#000" fontSize={14}>
              {`${props.ratings ? props.ratings.length : 0} ratings`}
            </Typography>
          </Box>
          <Box width={'80%'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontWeight={'bold'}>5</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  color={'inherit'}
                  variant="determinate"
                  value={parseInt(
                    (
                      (props.ratings
                        ? props.ratings.reduce((total, item) => {
                            if (item.number === 5) {
                              return total + 1;
                            }
                            return total;
                          }, 0) / props.ratings.length
                        : 0) * 100
                    ).toString(),
                  )}
                  style={{
                    borderRadius: 5,
                  }}
                />
              </Box>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontWeight={'bold'}>4</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  color={'inherit'}
                  variant="determinate"
                  value={parseInt(
                    (
                      (props.ratings
                        ? props.ratings.reduce((total, item) => {
                            if (item.number === 4) {
                              return total + 1;
                            }
                            return total;
                          }, 0) / props.ratings.length
                        : 0) * 100
                    ).toString(),
                  )}
                  style={{
                    borderRadius: 5,
                  }}
                />
              </Box>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontWeight={'bold'}>3</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  color={'inherit'}
                  variant="determinate"
                  value={parseInt(
                    (
                      (props.ratings
                        ? props.ratings.reduce((total, item) => {
                            if (item.number === 3) {
                              return total + 1;
                            }
                            return total;
                          }, 0) / props.ratings.length
                        : 0) * 100
                    ).toString(),
                  )}
                  style={{
                    borderRadius: 5,
                  }}
                />
              </Box>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontWeight={'bold'}>2</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  color={'inherit'}
                  variant="determinate"
                  value={parseInt(
                    (
                      (props.ratings
                        ? props.ratings.reduce((total, item) => {
                            if (item.number === 2) {
                              return total + 1;
                            }
                            return total;
                          }, 0) / props.ratings.length
                        : 0) * 100
                    ).toString(),
                  )}
                  style={{
                    borderRadius: 5,
                  }}
                />
              </Box>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontWeight={'bold'}>1</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  color={'inherit'}
                  variant="determinate"
                  value={parseInt(
                    (
                      (props.ratings
                        ? props.ratings.reduce((total, item) => {
                            if (item.number === 1) {
                              return total + 1;
                            }
                            return total;
                          }, 0) / props.ratings.length
                        : 0) * 100
                    ).toString(),
                  )}
                  style={{
                    borderRadius: 5,
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Stack>
        <Box py={2}>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h6">Reviews({props.ratings ? props.ratings.length : 0})</Typography>
          <Box display={'flex'} justifyContent={'center'} gap={1} py={1}>
            <TextField
              fullWidth
              hiddenLabel
              size="small"
              value={reviewSearch}
              onChange={(e) => {
                setReviewSearch(e.target.value);
              }}
              placeholder="Search"
            />
            <Button onClick={() => {}} variant="contained">
              Search
            </Button>
          </Box>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Select
              displayEmpty
              value={selectSortBy}
              onChange={(e: any) => {
                setSelectSortBy(e.target.value);
              }}
              size={'small'}
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <em>Sort by</em>;
                }

                return selected;
              }}
            >
              {SORT_BY_TYPE &&
                Object.entries(SORT_BY_TYPE).map((item, index) => (
                  <MenuItem value={item[1]} key={index}>
                    {item[1]}
                  </MenuItem>
                ))}
            </Select>
            <Select
              displayEmpty
              value={selectRating}
              onChange={(e: any) => {
                setSelectRating(e.target.value);
              }}
              size={'small'}
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <em>Rating</em>;
                }

                return selected;
              }}
            >
              {RATING_TYPE &&
                Object.entries(RATING_TYPE).map((item, index) => (
                  <MenuItem value={item[1]} key={index}>
                    {item[1]}
                  </MenuItem>
                ))}
            </Select>
          </Stack>

          <Typography mt={1}>{`${ratings ? ratings.length : 0} results`}</Typography>

          <Box mt={2}>
            {ratings &&
              ratings.length > 0 &&
              ratings.map((item, index) => (
                <Box key={index}>
                  <Rating size="small" value={item.number} readOnly />
                  <Typography fontSize={14}>{`${item.username} · ${new Date(
                    item.created_at,
                  ).toLocaleString()}`}</Typography>
                  <Stack direction={'row'} alignItems={'center'} mt={1} gap={1}>
                    {item.product_option.split(',').map((optionItem, optionIndex) => (
                      <>
                        <Typography fontSize={14}>{optionItem}</Typography>
                        {optionIndex + 1 !== item.product_option.split(',').length && (
                          <Typography fontSize={14}>/</Typography>
                        )}
                      </>
                    ))}
                  </Stack>
                  {item.image && (
                    <Box mt={2}>
                      <img src={item.image} alt={'image'} loading="lazy" width={50} height={50} />
                    </Box>
                  )}
                  <Typography mt={1}>{item.body}</Typography>
                  <Box py={2}>
                    <Divider />
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
