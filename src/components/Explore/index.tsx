// import { PRODUCT_TYPE } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import { GetImgSrcByProductType } from 'utils/image';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { useSnackPresistStore } from 'lib';
// import { useRouter } from 'next/router';
// import { CURRENCYS } from 'packages/constants/currency';
// import { ProductType } from 'utils/types';

// const Explore = () => {
//   const router = useRouter();
//   const { type } = router.query;

//   const [open, setOpen] = useState<boolean>(false);
//   const [products, setProducts] = useState<ProductType[]>();
//   const [currentProductType, setCurrentProductType] = useState<string>(PRODUCT_TYPE.GAMING);

//   const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

//   const init = async (productType: string) => {
//     try {
//       const response: any = await axios.get(Http.product_list, {
//         params: {
//           product_type: productType,
//         },
//       });

//       if (response.result) {
//         setProducts(response.data);
//       } else {
//         setProducts([]);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     if (type && Object.entries(PRODUCT_TYPE).find((item) => item[0] === type)?.[1]) {
//       setCurrentProductType(String(Object.entries(PRODUCT_TYPE).find((item) => item[0] === type)?.[1]));
//       init(String(Object.entries(PRODUCT_TYPE).find((item) => item[0] === type)?.[1]));
//     } else {
//       init(PRODUCT_TYPE.GAMING);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [type]);

//   return (
//     <Container>
//       <Grid container spacing={2}>
//         {PRODUCT_TYPE &&
//           Object.entries(PRODUCT_TYPE).map((item, index) => (
//             <Grid size={{ xs: 12, md: 2 }} key={index} display={index > 7 && !open ? 'none' : ''}>
//               <Card>
//                 <CardActionArea
//                   onClick={() => {
//                     setCurrentProductType(item[1]);
//                     init(item[1]);
//                   }}
//                 >
//                   <CardMedia component="img" height="140" image={GetImgSrcByProductType(item[1])} alt="image" />
//                   <CardContent>
//                     <Typography textAlign={'center'}>{item[1]}</Typography>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//       </Grid>
//       <Box textAlign={'center'} mt={2}>
//         {open ? (
//           <Button
//             variant={'contained'}
//             onClick={() => {
//               setOpen(false);
//             }}
//           >
//             Less
//           </Button>
//         ) : (
//           <Button
//             variant={'contained'}
//             onClick={() => {
//               setOpen(true);
//             }}
//           >
//             More
//           </Button>
//         )}
//       </Box>

//       <Box mt={2}>
//         <Typography variant="h6">{currentProductType}</Typography>
//         <Box mt={2}>
//           {products && products.length > 0 ? (
//             <Grid container spacing={2}>
//               {products.map((item, index) => (
//                 <Grid size={{ xs: 12, md: 2 }} key={index}>
//                   <div
//                     onClick={() => {
//                       window.location.href = `/products/${item.product_id}`;
//                     }}
//                   >
//                     <Card>
//                       <CardActionArea>
//                         <CardMedia component="img" width={100} height={150} image={item.images[0].src} alt="image" />
//                         <CardContent>
//                           <Typography fontWeight={'bold'}>{item.title}</Typography>
//                           {item.variants && item.variants.length > 0 && (
//                             <Box>
//                               <Typography>{item.variants[0].option}</Typography>
//                               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
//                                 <Typography color={'error'} fontWeight={'bold'}>{`${
//                                   CURRENCYS.find((c) => c.name === item.currency)?.code
//                                 }${item.variants[0].price}`}</Typography>
//                                 <Typography>{`RM:${item.variants[0].inventory_quantity}`}</Typography>
//                               </Stack>
//                             </Box>
//                           )}
//                         </CardContent>
//                       </CardActionArea>
//                     </Card>
//                   </div>
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             <Card>
//               <CardContent>
//                 <Box py={2} textAlign={'center'}>
//                   <Typography variant="h6">{currentProductType} type is empty</Typography>
//                   <Typography mt={2}>More products will be displayed here in the future.</Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           )}
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Explore;

import { PRODUCT_TYPE } from 'packages/constants';
import { useEffect, useState } from 'react';
import { GetImgSrcByProductType } from 'utils/image';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useSnackPresistStore } from 'lib';
import { useRouter } from 'next/router';
import { CURRENCYS } from 'packages/constants/currency';
import { ProductType } from 'utils/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';

const Explore = () => {
  const router = useRouter();
  const { type } = router.query;

  const [showMore, setShowMore] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentProductType, setCurrentProductType] = useState<string>(PRODUCT_TYPE.GAMING);

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const init = async (productType: string) => {
    try {
      const response: any = await axios.get(Http.product_list, {
        params: { product_type: productType },
      });

      if (response.result) {
        setProducts(response.data || []);
      } else {
        setProducts([]);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  // 处理路由中的 type 参数
  useEffect(() => {
    const typeKey = Object.keys(PRODUCT_TYPE).find((key) => PRODUCT_TYPE[key as keyof typeof PRODUCT_TYPE] === type);
    const targetType = typeKey ? PRODUCT_TYPE[typeKey as keyof typeof PRODUCT_TYPE] : PRODUCT_TYPE.GAMING;

    setCurrentProductType(targetType);
    init(targetType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleCategoryClick = (productType: string) => {
    setCurrentProductType(productType);
    init(productType);

    // 可选：更新 URL
    router.push({
      pathname: router.pathname,
      query: { ...router.query, type: productType },
    });
  };

  const categories = Object.entries(PRODUCT_TYPE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Navigation */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            Explore
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(([key, value], index) => {
            const isVisible = index < 8 || showMore;
            if (!isVisible) return null;

            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
                  currentProductType === value ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleCategoryClick(value)}
              >
                <div className="aspect-square relative">
                  <img src={GetImgSrcByProductType(value)} alt={value} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white font-semibold text-lg">Explore</p>
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <p className="font-medium">{value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {categories.length > 8 && (
          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={() => setShowMore(!showMore)} className="gap-2">
              {showMore ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <Separator className="mb-8" />

      {/* Current Category Products */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold">{currentProductType}</h2>
          <Badge variant="secondary">{products.length} items</Badge>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((item, index) => {
              const firstVariant = item.variants?.[0];
              const currencySymbol = CURRENCYS.find((c) => c.name === item.currency)?.code || '$';

              return (
                <Card
                  key={index}
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                  onClick={() => {
                    window.location.href = `/products/${item.product_id}`;
                  }}
                >
                  <div className="aspect-[4/3] relative bg-muted">
                    <img
                      src={item.images?.[0]?.src || '/images/default_avatar.png'}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold line-clamp-2 leading-tight">{item.title}</h3>

                    {firstVariant && (
                      <div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{firstVariant.option}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xl font-bold text-primary">
                            {currencySymbol}
                            {firstVariant.price}
                          </p>
                          <p className="text-xs text-muted-foreground">{firstVariant.inventory_quantity} in stock</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-24 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
              <h3 className="text-2xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                {currentProductType} category is currently empty.
                <br />
                More products will be added soon.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Explore;
