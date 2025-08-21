import styled from '@emotion/styled';
import { Collections } from '@mui/icons-material';
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
  TextField,
  Typography,
} from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { FILE_TYPE } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type RatingType = {
  product_id: number;
  option: string;
  quantity: number;
  price: string;
  title: string;
  image: string;
  rating_number?: number;
  rating_image?: string;
  rating_body?: string;
};

type DialogType = {
  orderId: number;
  orderItems: RatingType[];
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function PostOrderRateDialog(props: DialogType) {
  const [countRating, setCountRating] = useState<number>(0);
  const [ratings, setRatings] = useState<RatingType[]>([]);

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const uploadFile = async (files: FileList, ratingIndex: number) => {
    try {
      if (!files.length || files.length !== 1) {
        setSnackSeverity('error');
        setSnackMessage('Only support uploading one file');
        setSnackOpen(true);
        return;
      }

      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      const response: any = await axios.post(Http.upload_file, formData, {
        params: {
          file_type: FILE_TYPE.Image,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.result && response.data.urls[0] != '') {
        setRatings((prev) =>
          prev.map((rating, i) => (i === ratingIndex ? { ...rating, rating_image: response.data.urls[0] } : rating)),
        );
      } else {
        setSnackSeverity('error');
        setSnackMessage('Upload Failed');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  const onClickPost = async () => {
    try {
      if (!props.orderId) {
        return;
      }

      if (ratings.length !== props.orderItems.length) {
        return;
      }

      const response: any = await axios.post(Http.product_rating, {
        order_id: props.orderId,
        ratings: ratings,
      });

      if (response.result) {
        await props.handleCloseDialog();

        setSnackSeverity('success');
        setSnackMessage('Post successfully');
        setSnackOpen(true);
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message);
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    setRatings(props.orderItems);
  }, [props.orderItems]);

  useEffect(() => {
    var count = 0;
    ratings.map((item) => {
      if (item.rating_number && item.rating_number !== 0) {
        count += 1;
      }
    });
    setCountRating(count);
  }, [ratings]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.handleCloseDialog();
      }}
      fullWidth
    >
      <DialogTitle>Post a rating</DialogTitle>
      <DialogContent>
        <Typography>
          Product rating({countRating}/{ratings.length})
        </Typography>
        {ratings &&
          ratings.length > 0 &&
          ratings.map((item, index) => (
            <Box key={index} mt={1}>
              <Box py={1}>
                <Divider />
              </Box>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <img src={item.image} alt={'image'} loading="lazy" width={50} height={50} />
                <Box>
                  <Typography fontWeight={'bold'}>{`${item.title} ${item.option}`}</Typography>
                  <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Typography>Score</Typography>
                    <Rating
                      size="small"
                      value={item.rating_number || 0}
                      onChange={(e: any) => {
                        const newRating = e.target.value;
                        setRatings((prev) =>
                          prev.map((rating, i) => (i === index ? { ...rating, rating_number: Number(newRating) } : rating)),
                        );
                      }}
                    />
                  </Stack>
                </Box>
              </Stack>
              <Box py={1}>
                <Divider />
              </Box>
              <Box>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography mb={1}>Image</Typography>
                  {item.rating_image && item.rating_image != '' && (
                    <Button
                      size="small"
                      variant={'contained'}
                      color="error"
                      onClick={() => {
                        setRatings((prev) =>
                          prev.map((rating, i) => (i === index ? { ...rating, rating_image: '' } : rating)),
                        );
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Stack>
                <Box style={{ border: '1px dashed #000' }} mt={1}>
                  {item.rating_image && item.rating_image != '' ? (
                    <img srcSet={item.rating_image} src={item.rating_image} alt={'image'} loading="lazy" />
                  ) : (
                    <Button component="label" role={undefined} tabIndex={-1} fullWidth>
                      <Box py={2} textAlign={'center'}>
                        <VisuallyHiddenInput
                          type="file"
                          onChange={async (event: any) => {
                            await uploadFile(event.target.files, index);
                          }}
                        />
                        <Collections fontSize={'large'} />
                      </Box>
                    </Button>
                  )}
                </Box>
              </Box>
              <Box mt={2}>
                <Typography mb={1}>Description</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  multiline
                  minRows={4}
                  value={item.rating_body}
                  onChange={(e) => {
                    const newDescription = e.target.value;
                    setRatings((prev) =>
                      prev.map((rating, i) => (i === index ? { ...rating, rating_body: newDescription } : rating)),
                    );
                  }}
                  placeholder="Images and text can help others understand products better"
                />
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
        <Button color="success" variant={'contained'} onClick={onClickPost}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}
