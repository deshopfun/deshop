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
import { useState } from 'react';

type DialogType = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

export default function ProductRatingsDialog(props: DialogType) {
  const [reviewSearch, setReviewSearch] = useState<string>('');

  const handleClose = () => {
    props.setOpenDialog(false);
  };

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
              <Typography variant="h4">4.9</Typography>
              <Star />
            </Stack>
            <Typography color="#000" fontSize={14}>
              4.6K ratings
            </Typography>
          </Box>
          <Box width={'80%'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontWeight={'bold'}>5</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  color={'inherit'}
                  variant="determinate"
                  value={90}
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
                  value={20}
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
                  value={30}
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
                  value={2}
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
                  value={10}
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
          <Typography variant="h6">Reviews(123)</Typography>
          <Box display={'flex'} justifyContent={'center'} gap={1} py={1}>
            <TextField
              fullWidth
              hiddenLabel
              size="small"
              value={reviewSearch}
              onChange={(e) => {
                setReviewSearch(e.target.value);
              }}
              placeholder="search for product"
            />
            <Button onClick={() => {}} variant="contained">
              Search
            </Button>
          </Box>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Select
              displayEmpty
              value={''}
              onChange={() => {}}
              size={'small'}
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <em>Sort by</em>;
                }

                return selected.join(', ');
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Select
              displayEmpty
              value={''}
              onChange={() => {}}
              size={'small'}
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <em>Rating</em>;
                }

                return selected.join(', ');
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Stack>

          <Box py={2}>
            <Rating size="small" value={5} readOnly />
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontSize={14}>abc</Typography>
              <Typography fontSize={14}>·</Typography>
              <Typography fontSize={14}>7 days ago</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontSize={14}>Red</Typography>
              <Typography fontSize={14}>/</Typography>
              <Typography fontSize={14}>M</Typography>
            </Stack>
            <Typography mt={2}>
              the hoodie is super comfy. only thing is even though i like over sized and knew this would be oversized i
              would still suggest sizing down.
            </Typography>
            <Stack direction={'row'} alignItems={'center'} py={2}>
              <IconButton size="small">
                <ThumbUpOffAlt fontSize={'small'} />
                {/* <ThumbUpAlt fontSize={'small'}/> */}
              </IconButton>
              <Typography>Helpful</Typography>
            </Stack>
            <Divider />
          </Box>
          <Box py={2}>
            <Rating size="small" value={5} readOnly />
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontSize={14}>abc</Typography>
              <Typography fontSize={14}>·</Typography>
              <Typography fontSize={14}>7 days ago</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontSize={14}>Red</Typography>
              <Typography fontSize={14}>/</Typography>
              <Typography fontSize={14}>M</Typography>
            </Stack>
            <Typography mt={2}>
              the hoodie is super comfy. only thing is even though i like over sized and knew this would be oversized i
              would still suggest sizing down.
            </Typography>
            <Stack direction={'row'} alignItems={'center'} py={2}>
              <IconButton size="small">
                <ThumbUpOffAlt fontSize={'small'} />
                {/* <ThumbUpAlt fontSize={'small'}/> */}
              </IconButton>
              <Typography>Helpful</Typography>
            </Stack>
            <Divider />
          </Box>
          <Box py={2}>
            <Rating size="small" value={5} readOnly />
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontSize={14}>abc</Typography>
              <Typography fontSize={14}>·</Typography>
              <Typography fontSize={14}>7 days ago</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontSize={14}>Red</Typography>
              <Typography fontSize={14}>/</Typography>
              <Typography fontSize={14}>M</Typography>
            </Stack>
            <Typography mt={2}>
              the hoodie is super comfy. only thing is even though i like over sized and knew this would be oversized i
              would still suggest sizing down.
            </Typography>
            <Stack direction={'row'} alignItems={'center'} py={2}>
              <IconButton size="small">
                <ThumbUpOffAlt fontSize={'small'} />
                {/* <ThumbUpAlt fontSize={'small'}/> */}
              </IconButton>
              <Typography>Helpful</Typography>
            </Stack>
            <Divider />
          </Box>
          <Box py={2}>
            <Rating size="small" value={5} readOnly />
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontSize={14}>abc</Typography>
              <Typography fontSize={14}>·</Typography>
              <Typography fontSize={14}>7 days ago</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography fontSize={14}>Red</Typography>
              <Typography fontSize={14}>/</Typography>
              <Typography fontSize={14}>M</Typography>
            </Stack>
            <Typography mt={2}>
              the hoodie is super comfy. only thing is even though i like over sized and knew this would be oversized i
              would still suggest sizing down.
            </Typography>
            <Stack direction={'row'} alignItems={'center'} py={2}>
              <IconButton size="small">
                <ThumbUpOffAlt fontSize={'small'} />
                {/* <ThumbUpAlt fontSize={'small'}/> */}
              </IconButton>
              <Typography>Helpful</Typography>
            </Stack>
            <Divider />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
