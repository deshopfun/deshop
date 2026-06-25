// import { RatingType } from 'utils/types';

// type DialogType = {
//   ratings: RatingType[];
//   openDialog: boolean;
//   handleCloseDialog: () => Promise<void>;
// };

// export default function OrderRatingDialog(props: DialogType) {
//   return (
//     <Dialog
//       open={props.openDialog}
//       onClose={() => {
//         props.handleCloseDialog();
//       }}
//       fullWidth
//     >
//       <DialogTitle>Ratings</DialogTitle>
//       <DialogContent>
//         {props.ratings &&
//           props.ratings.length > 0 &&
//           props.ratings.map((item, index) => (
//             <Box key={index}>
//               <Typography>{item.body}</Typography>
//               {item.image && (
//                 <Box mt={1}>
//                   <img src={item.image} alt={'image'} loading="lazy" width={50} height={50} />
//                 </Box>
//               )}
//               <Stack direction={'row'} alignItems={'center'} mt={1} gap={1}>
//                 <Typography>Rating:</Typography>
//                 <Rating size="small" value={item.number || 0} readOnly />
//                 <Typography>|</Typography>
//                 <Typography>{item.product_option}</Typography>
//               </Stack>
//               <Typography fontWeight={'bold'} mt={1} textAlign={'right'}>
//                 {new Date(item.create_time).toLocaleString()}
//               </Typography>
//               <Box py={2}>
//                 <Divider />
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
//       </DialogActions>
//     </Dialog>
//   );
// }

import { RatingType } from '@/utils/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Star, Calendar } from 'lucide-react';

type DialogType = {
  ratings: RatingType[];
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
};

export default function OrderRatingDialog({
  ratings,
  openDialog,
  handleCloseDialog,
}: DialogType) {
  const handleClose = async () => {
    await handleCloseDialog();
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Product Ratings
            <Badge variant="secondary">{ratings?.length || 0}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto py-4 space-y-6 pr-2">
          {ratings && ratings.length > 0 ? (
            ratings.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < (item.number || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="outline">{item.number}/5</Badge>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.create_time).toLocaleDateString()}
                    </div>
                  </div>

                  {item.product_option && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.product_option.split(',').map((option, i) => (
                        <Badge key={i} variant="secondary">
                          {option.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-sm leading-relaxed text-foreground">
                    {item.body}
                  </p>

                  {item.image && (
                    <img
                      src={item.image}
                      alt="Review photo"
                      className="max-w-[180px] rounded-lg border mt-2"
                      loading="lazy"
                    />
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground">No ratings yet</p>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleClose} variant="outline" className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}