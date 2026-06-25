// import { RATING_TYPE, SORT_BY_TYPE } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import { Http } from 'utils/http/http';
// import axios from 'utils/http/axios';
// import { useSnackPresistStore } from 'lib';
// import { RatingType } from 'utils/types';

// type DialogType = {
//   product_id: number;
//   ratings: RatingType[];
//   openDialog: boolean;
//   setOpenDialog: (value: boolean) => void;
// };

// export default function ProductRatingsDialog(props: DialogType) {
//   const [ratings, setRatings] = useState<RatingType[]>([]);
//   const [reviewSearch, setReviewSearch] = useState<string>('');
//   const [selectSortBy, setSelectSortBy] = useState<string>('');
//   const [selectRating, setSelectRating] = useState<string>('');

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

//   const handleClose = () => {
//     props.setOpenDialog(false);
//   };

//   const init = async (product_id: number, selectSortBy: string, selectRating: string) => {
//     try {
//       if (!product_id) {
//         return;
//       }

//       var ratingVal = 0;
//       if (!isNaN(parseInt(selectRating))) {
//         ratingVal = parseInt(selectRating);
//       }

//       const response: any = await axios.get(Http.product_rating_by_id, {
//         params: {
//           product_id: product_id,
//           sort_by: selectSortBy ? selectSortBy : undefined,
//           rating_number: ratingVal,
//         },
//       });

//       if (response.result) {
//         setRatings(response.data);
//       } else {
//         setRatings([]);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     props.product_id && init(props.product_id, selectSortBy, selectRating);
//   }, [props.product_id, selectSortBy, selectRating]);

//   return (
//     <Dialog open={props.openDialog} onClose={handleClose} fullWidth>
//       <DialogTitle>Ratings and reviews</DialogTitle>
//       <IconButton
//         sx={(theme) => ({
//           position: 'absolute',
//           right: 8,
//           top: 8,
//           color: theme.palette.grey[500],
//         })}
//         onClick={handleClose}
//       >
//         <Close />
//       </IconButton>
//       <DialogContent dividers>
//         <Stack direction={'row'} alignItems={'center'} gap={0}>
//           <Box width={'20%'}>
//             <Stack direction={'row'} alignItems={'center'}>
//               <Typography variant="h4">
//                 {props.ratings
//                   ? (
//                       props.ratings.reduce((total, item) => {
//                         return total + item.number;
//                       }, 0) / props.ratings.length
//                     ).toFixed(1)
//                   : 0}
//               </Typography>
//               <Star />
//             </Stack>
//             <Typography color="#000" fontSize={14}>
//               {`${props.ratings ? props.ratings.length : 0} ratings`}
//             </Typography>
//           </Box>
//           <Box width={'80%'}>
//             <Stack direction={'row'} alignItems={'center'} gap={1}>
//               <Typography fontWeight={'bold'}>5</Typography>
//               <Box sx={{ width: '100%' }}>
//                 <LinearProgress
//                   color={'inherit'}
//                   variant="determinate"
//                   value={parseInt(
//                     (
//                       (props.ratings
//                         ? props.ratings.reduce((total, item) => {
//                             if (item.number === 5) {
//                               return total + 1;
//                             }
//                             return total;
//                           }, 0) / props.ratings.length
//                         : 0) * 100
//                     ).toString(),
//                   )}
//                   style={{
//                     borderRadius: 5,
//                   }}
//                 />
//               </Box>
//             </Stack>
//             <Stack direction={'row'} alignItems={'center'} gap={1}>
//               <Typography fontWeight={'bold'}>4</Typography>
//               <Box sx={{ width: '100%' }}>
//                 <LinearProgress
//                   color={'inherit'}
//                   variant="determinate"
//                   value={parseInt(
//                     (
//                       (props.ratings
//                         ? props.ratings.reduce((total, item) => {
//                             if (item.number === 4) {
//                               return total + 1;
//                             }
//                             return total;
//                           }, 0) / props.ratings.length
//                         : 0) * 100
//                     ).toString(),
//                   )}
//                   style={{
//                     borderRadius: 5,
//                   }}
//                 />
//               </Box>
//             </Stack>
//             <Stack direction={'row'} alignItems={'center'} gap={1}>
//               <Typography fontWeight={'bold'}>3</Typography>
//               <Box sx={{ width: '100%' }}>
//                 <LinearProgress
//                   color={'inherit'}
//                   variant="determinate"
//                   value={parseInt(
//                     (
//                       (props.ratings
//                         ? props.ratings.reduce((total, item) => {
//                             if (item.number === 3) {
//                               return total + 1;
//                             }
//                             return total;
//                           }, 0) / props.ratings.length
//                         : 0) * 100
//                     ).toString(),
//                   )}
//                   style={{
//                     borderRadius: 5,
//                   }}
//                 />
//               </Box>
//             </Stack>
//             <Stack direction={'row'} alignItems={'center'} gap={1}>
//               <Typography fontWeight={'bold'}>2</Typography>
//               <Box sx={{ width: '100%' }}>
//                 <LinearProgress
//                   color={'inherit'}
//                   variant="determinate"
//                   value={parseInt(
//                     (
//                       (props.ratings
//                         ? props.ratings.reduce((total, item) => {
//                             if (item.number === 2) {
//                               return total + 1;
//                             }
//                             return total;
//                           }, 0) / props.ratings.length
//                         : 0) * 100
//                     ).toString(),
//                   )}
//                   style={{
//                     borderRadius: 5,
//                   }}
//                 />
//               </Box>
//             </Stack>
//             <Stack direction={'row'} alignItems={'center'} gap={1}>
//               <Typography fontWeight={'bold'}>1</Typography>
//               <Box sx={{ width: '100%' }}>
//                 <LinearProgress
//                   color={'inherit'}
//                   variant="determinate"
//                   value={parseInt(
//                     (
//                       (props.ratings
//                         ? props.ratings.reduce((total, item) => {
//                             if (item.number === 1) {
//                               return total + 1;
//                             }
//                             return total;
//                           }, 0) / props.ratings.length
//                         : 0) * 100
//                     ).toString(),
//                   )}
//                   style={{
//                     borderRadius: 5,
//                   }}
//                 />
//               </Box>
//             </Stack>
//           </Box>
//         </Stack>
//         <Box py={2}>
//           <Divider />
//         </Box>
//         <Box>
//           <Typography variant="h6">Reviews({props.ratings ? props.ratings.length : 0})</Typography>
//           <Box display={'flex'} justifyContent={'center'} gap={1} py={1}>
//             <TextField
//               fullWidth
//               hiddenLabel
//               size="small"
//               value={reviewSearch}
//               onChange={(e) => {
//                 setReviewSearch(e.target.value);
//               }}
//               placeholder="Search"
//             />
//             <Button onClick={() => {}} variant="contained">
//               Search
//             </Button>
//           </Box>
//           <Stack direction={'row'} alignItems={'center'} gap={1}>
//             <Select
//               displayEmpty
//               value={selectSortBy}
//               onChange={(e: any) => {
//                 setSelectSortBy(e.target.value);
//               }}
//               size={'small'}
//               inputProps={{ 'aria-label': 'Without label' }}
//               renderValue={(selected: any) => {
//                 if (selected.length === 0) {
//                   return <em>Sort by</em>;
//                 }

//                 return selected;
//               }}
//             >
//               {SORT_BY_TYPE &&
//                 Object.entries(SORT_BY_TYPE).map((item, index) => (
//                   <MenuItem value={item[1]} key={index}>
//                     {item[1]}
//                   </MenuItem>
//                 ))}
//             </Select>
//             <Select
//               displayEmpty
//               value={selectRating}
//               onChange={(e: any) => {
//                 setSelectRating(e.target.value);
//               }}
//               size={'small'}
//               inputProps={{ 'aria-label': 'Without label' }}
//               renderValue={(selected: any) => {
//                 if (selected.length === 0) {
//                   return <em>Rating</em>;
//                 }

//                 return selected;
//               }}
//             >
//               {RATING_TYPE &&
//                 Object.entries(RATING_TYPE).map((item, index) => (
//                   <MenuItem value={item[1]} key={index}>
//                     {item[1]}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </Stack>

//           <Typography mt={1}>{`${ratings ? ratings.length : 0} results`}</Typography>

//           <Box mt={2}>
//             {ratings &&
//               ratings.length > 0 &&
//               ratings.map((item, index) => (
//                 <Box key={index}>
//                   <Rating size="small" value={item.number} readOnly />
//                   <Typography fontSize={14}>{`${item.username} · ${new Date(
//                     item.create_time,
//                   ).toLocaleString()}`}</Typography>
//                   <Stack direction={'row'} alignItems={'center'} mt={1} gap={1}>
//                     {item.product_option.split(',').map((optionItem, optionIndex) => (
//                       <>
//                         <Typography fontSize={14}>{optionItem}</Typography>
//                         {optionIndex + 1 !== item.product_option.split(',').length && (
//                           <Typography fontSize={14}>/</Typography>
//                         )}
//                       </>
//                     ))}
//                   </Stack>
//                   {item.image && (
//                     <Box mt={2}>
//                       <img src={item.image} alt={'image'} loading="lazy" width={50} height={50} />
//                     </Box>
//                   )}
//                   <Typography mt={1}>{item.body}</Typography>
//                   <Box py={2}>
//                     <Divider />
//                   </Box>
//                 </Box>
//               ))}
//           </Box>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { RATING_TYPE, SORT_BY_TYPE } from '@/packages/constants';
import { useEffect, useState } from 'react';
import { Http } from '@/utils/http/http';
import axios from '@/utils/http/axios';
import { useSnackPresistStore } from '@/lib';
import { RatingType } from '@/utils/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Search, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

type DialogType = {
  product_id: number;
  ratings: RatingType[];
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

// 星级展示组件
const StarRow = ({ value, max = 5 }: { value: number; max?: number }) => (
  <div className="flex">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        className={cn('h-4 w-4', i < value ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200')}
      />
    ))}
  </div>
);

// 评分进度条
const RatingBar = ({ star, ratings }: { star: number; ratings: RatingType[] }) => {
  const count = ratings.filter((r) => r.number === star).length;
  const percent = ratings.length > 0 ? Math.round((count / ratings.length) * 100) : 0;
  return (
    <button className="flex items-center gap-3 w-full group">
      <div className="flex items-center gap-0.5 shrink-0">
        <span className="text-sm font-medium w-3">{star}</span>
        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
      </div>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
    </button>
  );
};

export default function ProductRatingsDialog({
  product_id,
  ratings: propsRatings,
  openDialog,
  setOpenDialog,
}: DialogType) {
  const [ratings, setRatings] = useState<RatingType[]>([]);
  const [reviewSearch, setReviewSearch] = useState('');
  const [selectSortBy, setSelectSortBy] = useState('');
  const [selectRating, setSelectRating] = useState('');

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const avgRating = propsRatings?.length
    ? (propsRatings.reduce((s, r) => s + r.number, 0) / propsRatings.length).toFixed(1)
    : '0';

  const init = async (id: number, sortBy: string, ratingFilter: string) => {
    if (!id) return;
    try {
      const ratingVal = !isNaN(parseInt(ratingFilter)) ? parseInt(ratingFilter) : 0;
      const response: any = await axios.get(Http.product_rating_by_id, {
        params: { product_id: id, sort_by: sortBy || undefined, rating_number: ratingVal },
      });
      setRatings(response.result ? response.data || [] : []);
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('Network error. Please try again later.');
      setSnackOpen(true);
    }
  };

  // 前端搜索过滤
  const filteredRatings = ratings.filter(
    (r) =>
      !reviewSearch ||
      r.body?.toLowerCase().includes(reviewSearch.toLowerCase()) ||
      r.username?.toLowerCase().includes(reviewSearch.toLowerCase()),
  );

  useEffect(() => {
    if (product_id) init(product_id, selectSortBy, selectRating);
  }, [product_id, selectSortBy, selectRating]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl">
        {/* 顶部标题栏 */}
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle className="text-lg font-bold">Ratings & Reviews</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {/* 总评分概览 */}
          <div className="px-6 py-5 bg-gray-50 border-b">
            <div className="flex items-center gap-8">
              {/* 左：大数字评分 */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                <span className="text-5xl font-extrabold text-gray-900">{avgRating}</span>
                <StarRow value={Math.round(Number(avgRating))} />
                <span className="text-xs text-muted-foreground mt-0.5">{propsRatings?.length || 0} reviews</span>
              </div>

              {/* 右：进度条 */}
              <div className="flex-1 flex flex-col gap-2">
                {[5, 4, 3, 2, 1].map((s) => (
                  <RatingBar key={s} star={s} ratings={propsRatings || []} />
                ))}
              </div>
            </div>
          </div>

          {/* 筛选栏 */}
          <div className="px-6 py-4 border-b flex flex-col sm:flex-row gap-2 shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={reviewSearch}
                onChange={(e) => setReviewSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Select value={selectSortBy} onValueChange={setSelectSortBy}>
              <SelectTrigger className="h-9 w-full sm:w-36">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SORT_BY_TYPE).map(([k, v]) => (
                  <SelectItem key={k} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectRating} onValueChange={setSelectRating}>
              <SelectTrigger className="h-9 w-full sm:w-36">
                <SelectValue placeholder="All stars" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All stars</SelectItem>
                {Object.entries(RATING_TYPE).map(([k, v]) => (
                  <SelectItem key={k} value={v}>
                    {v} Stars
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 评论列表 */}
          <div className="px-6 py-4">
            <p className="text-sm text-muted-foreground mb-4">
              {filteredRatings.length} result{filteredRatings.length !== 1 ? 's' : ''}
            </p>

            {filteredRatings.length > 0 ? (
              <div className="flex flex-col divide-y">
                {filteredRatings.map((item, index) => (
                  <div key={index} className="py-5 first:pt-0 last:pb-0">
                    {/* 用户信息行 */}
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-sm bg-sky-100 text-sky-600 font-semibold">
                          {item.username?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{item.username}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.create_time).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    {/* 星级 */}
                    <StarRow value={item.number} />

                    {/* 选项标签 */}
                    {item.product_option && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.product_option.split(',').map((opt, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {opt.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* 评论图片 */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt="review"
                        className="mt-3 h-20 w-20 object-cover rounded-xl border"
                        loading="lazy"
                      />
                    )}

                    {/* 评论内容 */}
                    {item.body && <p className="mt-3 text-sm text-gray-700 leading-relaxed">{item.body}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                  <MessageSquare className="h-7 w-7 text-gray-300" />
                </div>
                <p className="font-medium text-sm">No reviews found</p>
                <p className="text-xs text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>

        {/* 底部关闭按钮 */}
        <div className="px-6 py-4 border-t shrink-0">
          <Button variant="outline" className="w-full h-10" onClick={() => setOpenDialog(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
