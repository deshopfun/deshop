// import { ProductType } from 'utils/types';

// type Props = {
//   uuid?: string;
//   product?: ProductType[];
// };

// const ProfileProduct = (props: Props) => {
//   return (
//     <Box>
//       <Typography variant="h6">All products</Typography>

//       <Box mt={2}>
//         {props.product && props.product.length > 0 ? (
//           <Grid container spacing={2}>
//             {props.product.map((item, index) => (
//               <Grid size={{ xs: 12, md: 6 }} key={index}>
//                 <div
//                   onClick={() => {
//                     window.location.href = `/products/${item.product_id}`;
//                   }}
//                 >
//                   <Card>
//                     <CardActionArea>
//                       <CardMedia
//                         component="img"
//                         width={item.images[0].width}
//                         height={item.images[0].height}
//                         image={item.images[0].src}
//                         alt="image"
//                       />
//                       <CardContent>
//                         <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1}>
//                           <Stack direction={'row'} alignItems={'center'} gap={1}>
//                             <Typography variant="h6">{item.title}</Typography>
//                             <Chip label={item.product_type} color="primary" size="small" />
//                           </Stack>
//                           <Typography>{item.product_type}</Typography>
//                         </Stack>
//                         <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
//                           {item.tags &&
//                             item.tags.split(',').map((item, index) => <Chip size="small" label={item} key={index} />)}
//                         </Stack>
//                         <Stack direction={'row'} alignItems={'center'} mt={1} gap={1} justifyContent={'right'}>
//                           {item.product_status === 1 && <Chip label={'Active'} color={'success'} size="small" />}
//                         </Stack>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </div>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Box mt={2}>
//             <Card>
//               <CardContent>
//                 <Typography>Not found</Typography>
//               </CardContent>
//             </Card>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ProfileProduct;

import { ProductType } from 'utils/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Props = {
  uuid?: string;
  product?: ProductType[];
};

const ProfileProduct = ({ product }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">All products</h2>

      {product && product.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              onClick={() => {
                window.location.href = `/products/${item.product_id}`;
              }}
            >
              {/* 图片部分 */}
              {item.images?.[0]?.src && (
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={item.images[0].src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    loading="lazy"
                  />
                </div>
              )}

              <CardContent className="p-5 space-y-4">
                {/* 标题和类型 */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">{item.title}</h3>
                  <Badge variant="default" className="shrink-0 mt-0.5">
                    {item.product_type}
                  </Badge>
                </div>

                {/* Tags */}
                {item.tags && item.tags.trim() && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.split(',').map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs font-normal">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* 状态 - 使用自定义样式 */}
                {item.product_status === 1 && (
                  <div className="flex justify-end pt-1">
                    <Badge
                      variant="default"
                      className="bg-green-600 hover:bg-green-600 text-white border-green-600 font-medium"
                    >
                      Active
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground text-lg">Not found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileProduct;
