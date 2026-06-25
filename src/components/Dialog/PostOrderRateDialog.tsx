// import { useSnackPresistStore } from 'lib';
// import { FILE_TYPE } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { PostRatingType } from 'utils/types';

// type DialogType = {
//   orderId: number;
//   orderItems: PostRatingType[];
//   openDialog: boolean;
//   handleCloseDialog: () => Promise<void>;
// };

// export default function PostOrderRateDialog(props: DialogType) {
//   const [countRating, setCountRating] = useState<number>(0);
//   const [ratings, setRatings] = useState<PostRatingType[]>([]);

//   const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

//   const uploadFile = async (files: FileList, ratingIndex: number) => {
//     try {
//       if (!files.length || files.length !== 1) {
//         setSnackSeverity('error');
//         setSnackMessage('Only support uploading one file');
//         setSnackOpen(true);
//         return;
//       }

//       const formData = new FormData();
//       Array.from(files).forEach((file) => {
//         formData.append('files', file);
//       });

//       const response: any = await axios.post(Http.upload_file, formData, {
//         params: {
//           file_type: FILE_TYPE.Image,
//         },
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.result && response.data.urls[0] != '') {
//         setRatings((prev) =>
//           prev.map((rating, i) => (i === ratingIndex ? { ...rating, rating_image: response.data.urls[0] } : rating)),
//         );
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage('Upload Failed');
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   const onClickPost = async () => {
//     try {
//       if (!props.orderId) {
//         return;
//       }

//       if (ratings.length !== props.orderItems.length) {
//         return;
//       }

//       const response: any = await axios.post(Http.product_rating, {
//         order_id: props.orderId,
//         ratings: ratings,
//       });

//       if (response.result) {
//         await props.handleCloseDialog();

//         setSnackSeverity('success');
//         setSnackMessage('Post successfully');
//         setSnackOpen(true);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage(response.message);
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     setRatings(props.orderItems);
//   }, [props.orderItems]);

//   useEffect(() => {
//     var count = 0;
//     ratings.map((item) => {
//       if (item.rating_number && item.rating_number !== 0) {
//         count += 1;
//       }
//     });
//     setCountRating(count);
//   }, [ratings]);

//   return (
//     <Dialog
//       open={props.openDialog}
//       onClose={() => {
//         props.handleCloseDialog();
//       }}
//       fullWidth
//     >
//       <DialogTitle>Post a rating</DialogTitle>
//       <DialogContent>
//         <Typography>
//           Product rating({countRating}/{ratings.length})
//         </Typography>
//         {ratings &&
//           ratings.length > 0 &&
//           ratings.map((item, index) => (
//             <Box key={index} mt={1}>
//               <Box py={1}>
//                 <Divider />
//               </Box>
//               <Stack direction={'row'} alignItems={'center'} gap={1}>
//                 <img src={item.image} alt={'image'} loading="lazy" width={50} height={50} />
//                 <Box>
//                   <Typography fontWeight={'bold'}>{`${item.title} ${item.option}`}</Typography>
//                   <Stack direction={'row'} alignItems={'center'} gap={1}>
//                     <Typography>Score</Typography>
//                     <Rating
//                       size="small"
//                       value={item.rating_number || 0}
//                       onChange={(e: any) => {
//                         const newRating = e.target.value;
//                         setRatings((prev) =>
//                           prev.map((rating, i) =>
//                             i === index ? { ...rating, rating_number: Number(newRating) } : rating,
//                           ),
//                         );
//                       }}
//                     />
//                   </Stack>
//                 </Box>
//               </Stack>
//               <Box py={1}>
//                 <Divider />
//               </Box>
//               <Box>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                   <Typography mb={1}>Image</Typography>
//                   {item.rating_image && item.rating_image != '' && (
//                     <Button
//                       size="small"
//                       variant={'contained'}
//                       color="error"
//                       onClick={() => {
//                         setRatings((prev) =>
//                           prev.map((rating, i) => (i === index ? { ...rating, rating_image: '' } : rating)),
//                         );
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   )}
//                 </Stack>
//                 <Box style={{ border: '1px dashed #000' }} mt={1}>
//                   {item.rating_image && item.rating_image != '' ? (
//                     <img srcSet={item.rating_image} src={item.rating_image} alt={'image'} loading="lazy" />
//                   ) : (
//                     <Button component="label" role={undefined} tabIndex={-1} fullWidth>
//                       <Box py={2} textAlign={'center'}>
//                         {/* <VisuallyHiddenInput
//                           type="file"
//                           onChange={async (event: any) => {
//                             await uploadFile(event.target.files, index);
//                           }}
//                         /> */}
//                         <input
//                           type="file"
//                           className="sr-only"
//                           onChange={async (event: any) => {
//                             await uploadFile(event.target.files, index);
//                           }}
//                         />
//                         <Collections fontSize={'large'} />
//                       </Box>
//                     </Button>
//                   )}
//                 </Box>
//               </Box>
//               <Box mt={2}>
//                 <Typography mb={1}>Description</Typography>
//                 <TextField
//                   hiddenLabel
//                   size="small"
//                   fullWidth
//                   multiline
//                   minRows={4}
//                   value={item.rating_body}
//                   onChange={(e) => {
//                     const newDescription = e.target.value;
//                     setRatings((prev) =>
//                       prev.map((rating, i) => (i === index ? { ...rating, rating_body: newDescription } : rating)),
//                     );
//                   }}
//                   placeholder="Images and text can help others understand products better"
//                 />
//               </Box>
//             </Box>
//           ))}
//       </DialogContent>
//       <DialogActions>
//         <Button
//           variant={'contained'}
//           onClick={() => {
//             props.handleCloseDialog();
//           }}
//         >
//           Close
//         </Button>
//         <Button color="success" variant={'contained'} onClick={onClickPost}>
//           Post
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import { useSnackPresistStore } from '@/lib';
import { FILE_TYPE } from '@/packages/constants';
import { useEffect, useState } from 'react';
import axios from '@/utils/http/axios';
import { Http } from '@/utils/http/http';
import { PostRatingType } from '@/utils/types';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { Star, Upload, X, Image as ImageIcon } from 'lucide-react';

type DialogType = {
  orderId: number;
  orderItems: PostRatingType[];
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function PostOrderRateDialog({
  orderId,
  orderItems,
  openDialog,
  handleCloseDialog,
}: DialogType) {
  const [ratings, setRatings] = useState<PostRatingType[]>([]);
  const [countRating, setCountRating] = useState<number>(0);

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const uploadFile = async (files: FileList | null, ratingIndex: number) => {
    if (!files || files.length !== 1) {
      setSnackSeverity('error');
      setSnackMessage('Only support uploading one file');
      setSnackOpen(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('files', files[0]);

      const response: any = await axios.post(Http.upload_file, formData, {
        params: { file_type: FILE_TYPE.Image },
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.result && response.data.urls?.[0]) {
        setRatings((prev) =>
          prev.map((rating, i) =>
            i === ratingIndex ? { ...rating, rating_image: response.data.urls[0] } : rating
          )
        );
      } else {
        setSnackSeverity('error');
        setSnackMessage('Upload failed');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('Network error occurred');
      setSnackOpen(true);
      console.error(e);
    }
  };

  const onClickPost = async () => {
    if (!orderId || ratings.length === 0) return;

    try {
      const response: any = await axios.post(Http.product_rating, {
        order_id: orderId,
        ratings: ratings,
      });

      if (response.result) {
        setSnackSeverity('success');
        setSnackMessage('Rating posted successfully');
        setSnackOpen(true);
        await handleCloseDialog();
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message || 'Failed to post rating');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('Network error occurred');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    setRatings(orderItems);
  }, [orderItems]);

  useEffect(() => {
    const count = ratings.filter((item) => item.rating_number && item.rating_number > 0).length;
    setCountRating(count);
  }, [ratings]);

  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Rate Your Purchase
            <Badge variant="secondary">
              {countRating}/{ratings.length} rated
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto py-6 space-y-8 pr-2">
          {ratings.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6 space-y-5">
                {/* Product Info */}
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.option}</p>
                  </div>
                </div>

                <Separator />

                {/* Star Rating */}
                <div>
                  <p className="text-sm font-medium mb-2">How would you rate this product?</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setRatings((prev) =>
                            prev.map((r, i) => (i === index ? { ...r, rating_number: star } : r))
                          )
                        }
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= (item.rating_number || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <p className="text-sm font-medium mb-2">Add Photo (Optional)</p>
                  <div className="border border-dashed border-border rounded-lg p-4">
                    {item.rating_image ? (
                      <div className="relative inline-block">
                        <img
                          src={item.rating_image}
                          alt="Review"
                          className="max-h-40 rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2"
                          onClick={() =>
                            setRatings((prev) =>
                              prev.map((r, i) => (i === index ? { ...r, rating_image: '' } : r))
                            )
                          }
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => uploadFile(e.target.files, index)}
                        />
                        <div className="flex flex-col items-center py-8 text-muted-foreground hover:text-foreground transition-colors">
                          <ImageIcon className="w-10 h-10 mb-3" />
                          <p>Click to upload photo</p>
                          <p className="text-xs">PNG, JPG up to 5MB</p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <p className="text-sm font-medium mb-2">Write a Review</p>
                  <Textarea
                    rows={4}
                    placeholder="What did you like or dislike? Help others make better decisions..."
                    value={item.rating_body || ''}
                    onChange={(e) =>
                      setRatings((prev) =>
                        prev.map((r, i) => (i === index ? { ...r, rating_body: e.target.value } : r))
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={onClickPost} disabled={countRating === 0}>
            Post Ratings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}