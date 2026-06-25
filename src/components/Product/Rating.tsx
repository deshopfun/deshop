// import { useSnackPresistStore } from 'lib';
// import { useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';

// const ProductRating = () => {
//   return (
//     <Box>
//       <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//         <Typography variant="h6">Update product rating</Typography>
//         <Button variant={'contained'} color={'success'}>
//           Add Product Rating
//         </Button>
//       </Stack>
//       <Box mt={2}></Box>
//     </Box>
//   );
// };

// export default ProductRating;

import { useSnackPresistStore, useUserPresistStore } from '@/lib';
import { useState } from 'react';
import axios from '@/utils/http/axios';
import { Http } from '@/utils/http/http';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Star, Plus, StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// 星级选择器组件
const StarPicker = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              'h-8 w-8 transition-colors',
              s <= (hover || value) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200',
            )}
          />
        </button>
      ))}
    </div>
  );
};

const ratingLabels: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

const ProductRating = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const showError = (msg: string) => {
    setSnackSeverity('error');
    setSnackMessage(msg);
    setSnackOpen(true);
  };
  const showSuccess = (msg: string) => {
    setSnackSeverity('success');
    setSnackMessage(msg);
    setSnackOpen(true);
  };

  const resetForm = () => {
    setRating(5);
    setBody('');
    setImage('');
  };

  const onSubmit = async () => {
    if (!body.trim()) return showError('Please write a review');
    setLoading(true);
    try {
      const response: any = await axios.post(Http.product_rating, {
        number: rating,
        body,
        image: image || undefined,
      });
      if (response.result) {
        showSuccess('Rating submitted successfully');
        setOpen(false);
        resetForm();
      } else {
        showError(response.message || 'Submission failed');
      }
    } catch {
      showError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          {/* 标题行 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <StarIcon className="h-4 w-4 text-amber-500" />
              </div>
              <h3 className="font-semibold">Product Ratings</h3>
            </div>
            <Button className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5" onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" /> Add Rating
            </Button>
          </div>

          {/* 空状态 */}
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-8 w-8 text-gray-200 fill-gray-200" />
              ))}
            </div>
            <p className="font-medium text-sm">No ratings yet</p>
            <p className="text-xs text-muted-foreground">Add a rating to help buyers make informed decisions.</p>
            <Button variant="outline" className="mt-2 gap-1.5" onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" /> Write a Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 添加评分弹窗 */}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) resetForm();
        }}
      >
        <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden gap-0">
          {/* 顶部渐变区 */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-400 px-6 py-6 text-white text-center flex flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
              <StarIcon className="h-7 w-7 text-white" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-white text-xl font-bold">Add a Rating</DialogTitle>
            </DialogHeader>
            <p className="text-white/80 text-sm">Share your experience with this product</p>
          </div>

          {/* 表单内容 */}
          <div className="px-6 py-5 flex flex-col gap-5">
            {/* 星级选择 */}
            <div className="flex flex-col items-center gap-2">
              <StarPicker value={rating} onChange={setRating} />
              {rating > 0 && <span className="text-sm font-medium text-amber-600">{ratingLabels[rating]}</span>}
            </div>

            {/* 评论内容 */}
            <div className="flex flex-col gap-1.5">
              <Label>
                Review <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share details about your experience..."
                className="min-h-24 resize-none"
              />
            </div>

            {/* 图片链接（可选） */}
            <div className="flex flex-col gap-1.5">
              <Label>
                Image URL <span className="text-xs text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <DialogFooter className="px-6 pb-6 flex flex-col gap-2">
            <Button
              className="w-full h-11 bg-amber-500 hover:bg-amber-600 text-white font-semibold"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Rating'}
            </Button>
            <Button
              variant="ghost"
              className="w-full h-10 text-muted-foreground"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductRating;
