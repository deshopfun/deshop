// import { useCartPresistStore, useSnackPresistStore, useUserPresistStore } from 'lib';
// import { useRouter } from 'next/router';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { useEffect, useState } from 'react';
// // import Swiper core and required modules
// import { Navigation, Pagination, Scrollbar, A11y, FreeMode, Thumbs } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import ProductRatingsDialog from 'components/Dialog/ProductRatingsDialog';
// import RefundPolicyDialog from 'components/Dialog/RefundPolicyDialog';
// import { COLLECT_TYPE, PRODUCT_TAB_DATAS, PRODUCT_TYPE } from 'packages/constants';
// import Product from './Product';
// import ProductVariant from './Variant';
// import ProductRating from './Rating';
// import NowTrendingCard from 'components/Card/NowTrendingCard';
// import { CURRENCYS } from 'packages/constants/currency';
// import { marked } from 'marked';
// import DOMPurify from 'dompurify';
// import { ProductType, ProductVariantType } from 'utils/types';
// import { a11yProps, CustomTabPanel } from 'components/Tab';

// const ProductDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [product, setProduct] = useState<ProductType>();
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [openRatingsDialog, setOpenRatingsDialog] = useState<boolean>(false);
//   const [openRefundPolicy, setOpenRefundPolicy] = useState<boolean>(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [optionOneValue, setOptionOneValue] = useState<string>('');
//   const [optionTwoValue, setOptionTwoValue] = useState<string>('');
//   const [optionThreeValue, setOptionThreeValue] = useState<string>('');
//   const [currentProductVariant, setCurrentProductVariant] = useState<ProductVariantType>();
//   const [isSelectOption, setIsSelectOption] = useState<boolean>(false);
//   const [quantity, setQuantity] = useState<number>(1);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     const tabId = Object.values(PRODUCT_TAB_DATAS).find((item) => item.id === newValue)?.tabId;
//     router.replace({
//       pathname: router.pathname,
//       query: { ...router.query, tab: tabId },
//     });

//     setTabValue(newValue);
//   };

//   const openMore = Boolean(anchorEl);

//   const handleClickMore = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMore = () => {
//     setAnchorEl(null);
//   };

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
//   const { getUuid, getIsLogin } = useUserPresistStore((state) => state);
//   const { getCart, setCart } = useCartPresistStore((state) => state);

//   const init = async (id: any) => {
//     try {
//       if (!id || id === 0) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect product id');
//         setSnackOpen(true);
//         return;
//       }

//       let response: any;
//       if (getIsLogin()) {
//         response = await axios.get(Http.product_by_login_id, {
//           params: {
//             product_id: id,
//           },
//         });
//       } else {
//         response = await axios.get(Http.product_by_id, {
//           params: {
//             product_id: id,
//           },
//         });
//       }

//       if (response.result) {
//         setProduct({
//           ...response.data,
//           render_body_html: DOMPurify.sanitize(await marked(response.data.body_html)),
//         });
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage(response.message);
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   const initOptionValue = async (oneValue: string, twoValue: string, threeValue: string) => {
//     try {
//       if (!product) {
//         return;
//       }

//       let option = '';
//       switch (product.options.length) {
//         case 3:
//           if (!oneValue || !twoValue || !threeValue) return;
//           option = `${oneValue},${twoValue},${threeValue}`;
//           break;
//         case 2:
//           if (!oneValue || !twoValue) return;
//           option = `${oneValue},${twoValue}`;
//           break;
//         case 1:
//           if (!oneValue) return;
//           option = `${oneValue}`;
//           break;
//         default:
//           return;
//       }

//       setIsSelectOption(true);

//       const response: any = await axios.get(Http.product_variant_by_option, {
//         params: {
//           product_id: product.product_id,
//           option: option,
//         },
//       });

//       if (response.result) {
//         setCurrentProductVariant({
//           ...response.data,
//           inventory_policy: response.data.inventory_policy === 1 ? true : false,
//           // shippable: response.data.shippable === 1 ? true : false,
//           taxable: response.data.taxable === 1 ? true : false,
//         });
//       } else {
//         setCurrentProductVariant(undefined);
//         setQuantity(1);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       init(id);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   useEffect(() => {
//     initOptionValue(optionOneValue, optionTwoValue, optionThreeValue);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [optionOneValue, optionTwoValue, optionThreeValue]);

//   const onClickFavorite = async () => {
//     try {
//       if (!product) {
//         return;
//       }

//       if (!product.product_id || product.product_id === 0) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect product id');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.put(Http.collect, {
//         collect_type: COLLECT_TYPE.PRODUCT,
//         bind_id: product.product_id,
//       });

//       if (response.result) {
//         await init(id);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage(response.message);
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   const onClickAddToCart = async () => {
//     if (!product) {
//       return;
//     }

//     if (quantity <= 0) {
//       setSnackSeverity('error');
//       setSnackMessage('At least one quantity is required.');
//       setSnackOpen(true);
//       return;
//     }

//     if (getUuid() === product.user_uuid) {
//       setSnackSeverity('error');
//       setSnackMessage('Cannot buy your own products.');
//       setSnackOpen(true);
//       return;
//     }

//     addToCart();

//     setSnackSeverity('success');
//     setSnackMessage('Add to cart successfully');
//     setSnackOpen(true);
//   };

//   const onClickBuyNow = async () => {
//     if (!product) {
//       return;
//     }

//     if (quantity <= 0) {
//       setSnackSeverity('error');
//       setSnackMessage('At least one quantity is required.');
//       setSnackOpen(true);
//       return;
//     }

//     if (getUuid() === product.user_uuid) {
//       setSnackSeverity('error');
//       setSnackMessage('Cannot buy your own products.');
//       setSnackOpen(true);
//       return;
//     }

//     addToCart();

//     window.location.href = `/checkout/${product.user_uuid}`;
//   };

//   const addToCart = () => {
//     if (!product) {
//       return;
//     }

//     let option = '';
//     switch (product.options.length) {
//       case 3:
//         if (!optionOneValue || !optionTwoValue || !optionThreeValue) return;
//         option = `${optionOneValue},${optionTwoValue},${optionThreeValue}`;
//         break;
//       case 2:
//         if (!optionOneValue || !optionTwoValue) return;
//         option = `${optionOneValue},${optionTwoValue}`;
//         break;
//       case 1:
//         if (!optionOneValue) return;
//         option = `${optionOneValue}`;
//         break;
//       default:
//         return;
//     }

//     const cart = getCart();
//     const cartItem = cart.find((item) => item.uuid === product.user_uuid);
//     const newVariant: any = {
//       productId: product.product_id,
//       title: product.title,
//       image: String(currentProductVariant?.image ?? ''),
//       option,
//       price: String(currentProductVariant?.price ?? ''),
//       discounts: String(currentProductVariant?.discounts ?? ''),
//       taxable: currentProductVariant?.taxable,
//       tax: String(currentProductVariant?.tax ?? ''),
//       // shippable: currentProductVariant?.shippable,
//       // shipping: String(currentProductVariant?.shipping ?? ''),
//       tip: String(currentProductVariant?.tip ?? ''),
//       weight: String(currentProductVariant?.weight ?? ''),
//       weightUnit: String(currentProductVariant?.weight_unit ?? ''),
//       quantity,
//     };

//     if (cartItem) {
//       const variantItem = cartItem.variant.find(
//         (vItem) => vItem.productId === product.product_id && vItem.option === option,
//       );

//       setCart(
//         cart.map((item) =>
//           item.uuid === product.user_uuid
//             ? {
//                 ...item,
//                 variant: variantItem
//                   ? item.variant.map((vItem) =>
//                       vItem.productId === product.product_id && vItem.option === option
//                         ? { ...vItem, quantity: vItem.quantity + quantity }
//                         : vItem,
//                     )
//                   : [...item.variant, newVariant],
//               }
//             : item,
//         ),
//       );
//     } else {
//       setCart([
//         ...cart,
//         {
//           uuid: product.user_uuid,
//           avatarUrl: product.user_avatar_url,
//           username: product.username,
//           currency: product.currency,
//           variant: [newVariant],
//         },
//       ]);
//     }
//   };

//   return (
//     <Container>
//       {product?.product_status !== 1 && getUuid() !== product?.user_uuid ? (
//         <Box>
//           <Alert severity="error">
//             <AlertTitle>Error</AlertTitle>
//             <Typography>Not found</Typography>
//           </Alert>
//         </Box>
//       ) : (
//         <>
//           {product?.product_status === 2 && (
//             <Box>
//               <Alert severity="info">
//                 <AlertTitle>Archived</AlertTitle>
//                 <Typography>The product status is Archived, only read but not editable</Typography>
//               </Alert>
//             </Box>
//           )}
//           {product?.product_status === 3 && (
//             <Box>
//               <Alert severity="warning">
//                 <AlertTitle>Draft</AlertTitle>
//                 <Typography>The status of the product is Draft, you can edit it and put it on the market</Typography>
//               </Alert>
//             </Box>
//           )}
//           <Grid container spacing={8} mt={4}>
//             <Grid size={{ xs: 12, md: 8 }}>
//               {isSelectOption && currentProductVariant?.image ? (
//                 <Box textAlign={'center'}>
//                   <img src={currentProductVariant.image} alt="image" width={200} height={200} />
//                 </Box>
//               ) : (
//                 <Swiper
//                   pagination={{
//                     clickable: true,
//                   }}
//                   navigation={true}
//                   modules={[Pagination, Navigation]}
//                 >
//                   {product &&
//                     product.images.length > 0 &&
//                     product.images.map((item, index) => (
//                       <SwiperSlide key={index}>
//                         <Box display={'flex'} justifyContent={'center'}>
//                           <img src={item.src} alt="image" width={200} height={200} />
//                         </Box>
//                       </SwiperSlide>
//                     ))}
//                 </Swiper>
//               )}
//               <Stack direction={'row'} alignItems={'center'} gap={1} mt={2}>
//                 {product &&
//                   product.images.length > 0 &&
//                   product.images.map((item, index) => (
//                     <img key={index} src={item.src} alt="image" width={50} height={50} />
//                   ))}
//               </Stack>

//               {product.ratings && product.ratings.length > 0 ? (
//                 <Box mt={3}>
//                   <Typography variant="h6">Ratings and reviews</Typography>
//                   <Box mt={2}>
//                     <Stack direction={'row'} alignItems={'center'} gap={1}>
//                       <Typography variant="h4">
//                         {product.ratings
//                           ? (
//                               product.ratings.reduce((total, item) => {
//                                 return total + item.number;
//                               }, 0) / product.ratings.length
//                             ).toFixed(1)
//                           : 0}
//                       </Typography>
//                       <Star />
//                     </Stack>
//                     <div
//                       onClick={() => {
//                         setOpenRatingsDialog(true);
//                       }}
//                     >
//                       <Link color="#000" fontSize={14}>
//                         {`${product.ratings ? product.ratings.length : 0} ratings`}
//                       </Link>
//                     </div>

//                     <Box mt={2}>
//                       <Stack direction={'row'} alignItems={'center'} gap={1}>
//                         <Typography fontWeight={'bold'}>5</Typography>
//                         <Box sx={{ width: '100%' }}>
//                           <LinearProgress
//                             color={'inherit'}
//                             variant="determinate"
//                             value={parseInt(
//                               (
//                                 (product.ratings
//                                   ? product.ratings.reduce((total, item) => {
//                                       if (item.number === 5) {
//                                         return total + 1;
//                                       }
//                                       return total;
//                                     }, 0) / product.ratings.length
//                                   : 0) * 100
//                               ).toString(),
//                             )}
//                             style={{
//                               borderRadius: 5,
//                             }}
//                           />
//                         </Box>
//                       </Stack>
//                       <Stack direction={'row'} alignItems={'center'} gap={1}>
//                         <Typography fontWeight={'bold'}>4</Typography>
//                         <Box sx={{ width: '100%' }}>
//                           <LinearProgress
//                             color={'inherit'}
//                             variant="determinate"
//                             value={parseInt(
//                               (
//                                 (product.ratings
//                                   ? product.ratings.reduce((total, item) => {
//                                       if (item.number === 4) {
//                                         return total + 1;
//                                       }
//                                       return total;
//                                     }, 0) / product.ratings.length
//                                   : 0) * 100
//                               ).toString(),
//                             )}
//                             style={{
//                               borderRadius: 5,
//                             }}
//                           />
//                         </Box>
//                       </Stack>
//                       <Stack direction={'row'} alignItems={'center'} gap={1}>
//                         <Typography fontWeight={'bold'}>3</Typography>
//                         <Box sx={{ width: '100%' }}>
//                           <LinearProgress
//                             color={'inherit'}
//                             variant="determinate"
//                             value={parseInt(
//                               (
//                                 (product.ratings
//                                   ? product.ratings.reduce((total, item) => {
//                                       if (item.number === 3) {
//                                         return total + 1;
//                                       }
//                                       return total;
//                                     }, 0) / product.ratings.length
//                                   : 0) * 100
//                               ).toString(),
//                             )}
//                             style={{
//                               borderRadius: 5,
//                             }}
//                           />
//                         </Box>
//                       </Stack>
//                       <Stack direction={'row'} alignItems={'center'} gap={1}>
//                         <Typography fontWeight={'bold'}>2</Typography>
//                         <Box sx={{ width: '100%' }}>
//                           <LinearProgress
//                             color={'inherit'}
//                             variant="determinate"
//                             value={parseInt(
//                               (
//                                 (product.ratings
//                                   ? product.ratings.reduce((total, item) => {
//                                       if (item.number === 2) {
//                                         return total + 1;
//                                       }
//                                       return total;
//                                     }, 0) / product.ratings.length
//                                   : 0) * 100
//                               ).toString(),
//                             )}
//                             style={{
//                               borderRadius: 5,
//                             }}
//                           />
//                         </Box>
//                       </Stack>
//                       <Stack direction={'row'} alignItems={'center'} gap={1}>
//                         <Typography fontWeight={'bold'}>1</Typography>
//                         <Box sx={{ width: '100%' }}>
//                           <LinearProgress
//                             color={'inherit'}
//                             variant="determinate"
//                             value={parseInt(
//                               (
//                                 (product.ratings
//                                   ? product.ratings.reduce((total, item) => {
//                                       if (item.number === 1) {
//                                         return total + 1;
//                                       }
//                                       return total;
//                                     }, 0) / product.ratings.length
//                                   : 0) * 100
//                               ).toString(),
//                             )}
//                             style={{
//                               borderRadius: 5,
//                             }}
//                           />
//                         </Box>
//                       </Stack>
//                     </Box>
//                   </Box>
//                   <Box mt={2}>
//                     <Grid container spacing={4}>
//                       {product.ratings.slice(0, 4).map((item, index) => (
//                         <Grid size={{ xs: 6, md: 6 }} key={index}>
//                           <Rating size="small" value={item.number} readOnly />
//                           <Typography fontSize={14}>{`${item.username} · ${new Date(
//                             item.create_time,
//                           ).toLocaleString()}`}</Typography>
//                           <Stack direction={'row'} alignItems={'center'} mt={1} gap={1}>
//                             {item.product_option.split(',').map((optionItem, optionIndex) => (
//                               <>
//                                 <Typography fontSize={14}>{optionItem}</Typography>
//                                 {optionIndex + 1 !== item.product_option.split(',').length && (
//                                   <Typography fontSize={14}>/</Typography>
//                                 )}
//                               </>
//                             ))}
//                           </Stack>
//                           {item.image && (
//                             <Box mt={2}>
//                               <img src={item.image} alt={'image'} loading="lazy" width={50} height={50} />
//                             </Box>
//                           )}
//                           <Typography mt={1}>{item.body}</Typography>
//                         </Grid>
//                       ))}
//                     </Grid>
//                     <Box mt={4}>
//                       <Button
//                         fullWidth
//                         variant={'contained'}
//                         color={'inherit'}
//                         onClick={() => {
//                           setOpenRatingsDialog(true);
//                         }}
//                       >
//                         Read more reviews
//                       </Button>
//                     </Box>
//                   </Box>
//                 </Box>
//               ) : (
//                 <Box mt={3}>
//                   <Card>
//                     <CardContent>
//                       <Box py={2} textAlign={'center'}>
//                         <Typography variant="h6">Not found the rating</Typography>
//                         <Typography mt={2}>Need more product reviews to be displayed here.</Typography>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Box>
//               )}
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Stack direction={'row'} alignItems={'center'} gap={1}>
//                   {product.user_avatar_url ? (
//                     <img src={product.user_avatar_url} alt={'image'} loading="lazy" width={30} height={30} />
//                   ) : (
//                     <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={30} height={30} />
//                   )}
//                   <Typography fontWeight={'bold'}>{product.username}</Typography>
//                 </Stack>
//                 <IconButton onClick={handleClickMore}>
//                   <MoreHoriz />
//                 </IconButton>
//                 <Menu open={openMore} anchorEl={anchorEl} onClose={handleCloseMore}>
//                   <MenuItem
//                     onClick={() => {
//                       window.location.href = `mailto:${product.user_email}`;
//                     }}
//                   >
//                     <Stack direction={'row'} alignItems={'center'} gap={1}>
//                       <ChatBubbleOutline fontSize={'small'} />
//                       <Typography>{`Contact ${product.username}`}</Typography>
//                     </Stack>
//                   </MenuItem>
//                   <MenuItem onClick={() => {}}>
//                     <Stack direction={'row'} alignItems={'center'} gap={1}>
//                       <HelpOutline color={'error'} fontSize={'small'} />
//                       <Link color={'error'} href={`/report/products/${product.product_id}`} underline="none">
//                         Report product
//                       </Link>
//                     </Stack>
//                   </MenuItem>
//                 </Menu>
//               </Stack>

//               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
//                 <Box>
//                   <Typography variant="h6">{product.title}</Typography>
//                   {product.ratings && product.ratings.length > 0 && (
//                     <Stack direction={'row'} alignItems={'center'} gap={1}>
//                       <Rating size="small" value={5} readOnly />
//                       <div
//                         onClick={() => {
//                           setOpenRatingsDialog(true);
//                         }}
//                       >
//                         <Link color="#000" fontSize={14}>
//                           {`${product.ratings ? product.ratings.length : 0} ratings`}
//                         </Link>
//                       </div>
//                     </Stack>
//                   )}
//                 </Box>
//                 {getIsLogin() && (
//                   <IconButton
//                     style={{
//                       width: 50,
//                       height: 50,
//                       background: product?.collect_status === 1 ? '#0098e5' : '',
//                       color: product?.collect_status === 1 ? 'white' : '',
//                     }}
//                     onClick={() => {
//                       onClickFavorite();
//                     }}
//                   >
//                     <FavoriteBorder />
//                   </IconButton>
//                 )}
//               </Stack>

//               {currentProductVariant && isSelectOption && (
//                 <Box>
//                   <Stack direction={'row'} alignItems={'center'} gap={1} py={1}>
//                     <Typography variant="h5">{`${CURRENCYS.find((item) => item.name === product.currency)?.code}${
//                       currentProductVariant.price
//                     }`}</Typography>
//                   </Stack>

//                   {/* <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
//                     <Stack direction={'row'} alignItems={'center'} gap={1}>
//                       <LocalShipping fontSize={'small'} />
//                       <Typography>SHIPPING</Typography>
//                     </Stack>
//                     {currentProductVariant.shippable ? (
//                       <Typography fontWeight={'bold'}>
//                         {CURRENCYS.find((item) => item.name === product.currency)?.code}
//                         {(parseFloat(currentProductVariant.shipping) * quantity).toFixed(2)}
//                       </Typography>
//                     ) : (
//                       <Typography>Shipping free</Typography>
//                     )}
//                   </Stack> */}

//                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                     <Stack direction={'row'} alignItems={'center'} gap={1}>
//                       <BorderColor fontSize={'small'} />
//                       <Typography>TAX</Typography>
//                     </Stack>
//                     {currentProductVariant.taxable ? (
//                       <Typography fontWeight={'bold'}>
//                         {CURRENCYS.find((item) => item.name === product.currency)?.code}
//                         {(parseFloat(currentProductVariant.tax) * quantity).toFixed(2)}
//                       </Typography>
//                     ) : (
//                       <Typography>Tax free</Typography>
//                     )}
//                   </Stack>

//                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                     <Stack direction={'row'} alignItems={'center'} gap={1}>
//                       <Wallet fontSize={'small'} />
//                       <Typography>TIP</Typography>
//                     </Stack>
//                     {Number(currentProductVariant.tip) > 0 ? (
//                       <Typography fontWeight={'bold'}>
//                         {CURRENCYS.find((item) => item.name === product.currency)?.code}
//                         {(parseFloat(currentProductVariant.tip) * quantity).toFixed(2)}
//                       </Typography>
//                     ) : (
//                       <Typography>No Tip</Typography>
//                     )}
//                   </Stack>

//                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                     <Stack direction={'row'} alignItems={'center'} gap={1}>
//                       <Discount fontSize={'small'} />
//                       <Typography>DISCOUNTS</Typography>
//                     </Stack>
//                     {Number(currentProductVariant.discounts) > 0 ? (
//                       <Typography fontWeight={'bold'}>
//                         {CURRENCYS.find((item) => item.name === product.currency)?.code}
//                         {(parseFloat(currentProductVariant.discounts) * quantity).toFixed(2)}
//                       </Typography>
//                     ) : (
//                       <Typography>No Discounts</Typography>
//                     )}
//                   </Stack>
//                 </Box>
//               )}

//               <Box mt={2}>
//                 {product?.options &&
//                   product.options.length > 0 &&
//                   product.options.map((item, index) => (
//                     <Box key={index}>
//                       <Stack direction={'row'} alignItems={'center'} gap={2}>
//                         <Typography variant="h6">{item.name}</Typography>
//                       </Stack>

//                       <Box pt={1} pb={2}>
//                         <Grid container columnSpacing={6} rowSpacing={2}>
//                           {item.value &&
//                             item.value.split(',').length > 0 &&
//                             item.value.split(',').map((innerItem, innerIndex) => (
//                               <Grid size={4} key={innerIndex}>
//                                 <Button
//                                   variant={'contained'}
//                                   color={
//                                     index === 0 && innerItem === optionOneValue
//                                       ? 'success'
//                                       : index === 1 && innerItem === optionTwoValue
//                                         ? 'success'
//                                         : index === 2 && innerItem === optionThreeValue
//                                           ? 'success'
//                                           : 'primary'
//                                   }
//                                   onClick={() => {
//                                     if (index === 0) {
//                                       setOptionOneValue(innerItem);
//                                     } else if (index === 1) {
//                                       setOptionTwoValue(innerItem);
//                                     } else if (index === 2) {
//                                       setOptionThreeValue(innerItem);
//                                     }
//                                   }}
//                                 >
//                                   {innerItem}
//                                 </Button>
//                               </Grid>
//                             ))}
//                         </Grid>
//                       </Box>
//                       <Box py={2}>
//                         <Divider />
//                       </Box>
//                     </Box>
//                   ))}
//               </Box>

//               {product?.product_status === 1 && isSelectOption && (
//                 <>
//                   {currentProductVariant && currentProductVariant?.inventory_quantity > 0 ? (
//                     <>
//                       <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
//                         <Typography fontWeight={'bold'}>Quantity</Typography>
//                         <Input
//                           fullWidth
//                           startAdornment={
//                             <IconButton
//                               disabled={quantity <= 1 ? true : false}
//                               onClick={() => {
//                                 if (quantity - 1 >= 0) {
//                                   setQuantity(quantity - 1);
//                                 }
//                               }}
//                             >
//                               <Remove />
//                             </IconButton>
//                           }
//                           endAdornment={
//                             <IconButton
//                               disabled={quantity >= currentProductVariant.inventory_quantity ? true : false}
//                               onClick={() => {
//                                 if (quantity + 1 <= currentProductVariant.inventory_quantity) {
//                                   setQuantity(quantity + 1);
//                                 }
//                               }}
//                             >
//                               <Add />
//                             </IconButton>
//                           }
//                           value={quantity}
//                           onChange={(e: any) => {
//                             if (0 < e.target.value && e.target.value <= currentProductVariant.inventory_quantity) {
//                               setQuantity(e.target.value);
//                             }
//                           }}
//                         />
//                         <Button
//                           variant={'contained'}
//                           onClick={() => {
//                             setQuantity(currentProductVariant.inventory_quantity);
//                           }}
//                         >
//                           Max
//                         </Button>
//                       </Stack>
//                       <Box mt={4}>
//                         <Button
//                           variant={'contained'}
//                           fullWidth
//                           onClick={() => {
//                             onClickAddToCart();
//                           }}
//                         >
//                           Add to cart
//                         </Button>
//                         <Button
//                           variant={'contained'}
//                           fullWidth
//                           style={{ background: '#000', marginTop: 10 }}
//                           onClick={() => {
//                             onClickBuyNow();
//                           }}
//                         >
//                           Buy now
//                         </Button>
//                       </Box>
//                     </>
//                   ) : (
//                     <Box>
//                       <Alert severity="error">
//                         <AlertTitle>Error</AlertTitle>
//                         <Typography>Sorry, the product has been sold out</Typography>
//                       </Alert>
//                     </Box>
//                   )}
//                 </>
//               )}
//               <Box mt={2} overflow={'auto'}>
//                 <Typography variant="h6">Description</Typography>
//                 {product?.render_body_html && (
//                   <Box mt={1} dangerouslySetInnerHTML={{ __html: product?.render_body_html }}></Box>
//                 )}
//               </Box>

//               <Box mt={2}>
//                 <Button
//                   fullWidth
//                   variant={'contained'}
//                   color={'inherit'}
//                   startIcon={<InsertLink />}
//                   onClick={() => {
//                     window.location.href = `/profile/${product.username}`;
//                   }}
//                 >
//                   {`More details at ${product.username}`}
//                 </Button>
//                 <Box mt={1}>
//                   <Button
//                     fullWidth
//                     variant={'contained'}
//                     color={'inherit'}
//                     onClick={() => {
//                       setOpenRefundPolicy(true);
//                     }}
//                   >
//                     Refund Policy
//                   </Button>
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>

//           {product?.product_status === 1 && (
//             <Box mt={4} mb={8}>
//               <Box display={'flex'} alignItems={'center'}>
//                 <Button
//                   color={'inherit'}
//                   endIcon={<ChevronRight />}
//                   onClick={() => {
//                     window.location.href = `/explore?type=${
//                       Object.entries(PRODUCT_TYPE).find((item) => item[1] == product.product_type)?.[0]
//                     }`;
//                   }}
//                 >
//                   <Typography variant="h6">Recommend more</Typography>
//                 </Button>
//               </Box>

//               <Box mt={2}>
//                 <NowTrendingCard productType={product.product_type} />
//               </Box>
//             </Box>
//           )}

//           {getUuid() === product?.user_uuid && (
//             <Box mt={4}>
//               <Typography variant="h6">Product manage</Typography>

//               <Box mt={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                 <Tabs value={tabValue} onChange={handleChange} variant="scrollable" scrollButtons="auto">
//                   {PRODUCT_TAB_DATAS &&
//                     PRODUCT_TAB_DATAS.length > 0 &&
//                     PRODUCT_TAB_DATAS.map((item, index) => (
//                       <Tab key={index} label={item.title} {...a11yProps(item.id)} />
//                     ))}
//                 </Tabs>
//               </Box>

//               <CustomTabPanel value={tabValue} index={0}>
//                 <Product
//                   product_id={product?.product_id}
//                   title={product?.title}
//                   vendor={product?.vendor}
//                   productType={product?.product_type}
//                   tags={product?.tags}
//                   description={product?.body_html}
//                   options={product?.options}
//                   images={product?.images}
//                   productStatus={product?.product_status}
//                   init={init}
//                 />
//               </CustomTabPanel>
//               <CustomTabPanel value={tabValue} index={1}>
//                 <ProductVariant
//                   product_id={product?.product_id}
//                   options={product?.options}
//                   currency={product?.currency}
//                 />
//               </CustomTabPanel>
//               <CustomTabPanel value={tabValue} index={2}>
//                 <ProductRating />
//               </CustomTabPanel>
//             </Box>
//           )}

//           <ProductRatingsDialog
//             product_id={product.product_id}
//             openDialog={openRatingsDialog}
//             setOpenDialog={setOpenRatingsDialog}
//             ratings={product.ratings}
//           />
//           <RefundPolicyDialog openDialog={openRefundPolicy} setOpenDialog={setOpenRefundPolicy} />
//         </>
//       )}
//     </Container>
//   );
// };

// export default ProductDetails;

// import { useCartPresistStore, useSnackPresistStore, useUserPresistStore } from 'lib';
// import { useRouter } from 'next/router';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { useEffect, useState } from 'react';

// import { Navigation, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import ProductRatingsDialog from 'components/Dialog/ProductRatingsDialog';
// import RefundPolicyDialog from 'components/Dialog/RefundPolicyDialog';

// import { COLLECT_TYPE, PRODUCT_TAB_DATAS, PRODUCT_TYPE } from 'packages/constants';
// import Product from './Product';
// import ProductVariant from './Variant';
// import ProductRating from './Rating';
// import NowTrendingCard from 'components/Card/NowTrendingCard';

// import { CURRENCYS } from 'packages/constants/currency';
// import { marked } from 'marked';
// import DOMPurify from 'dompurify';

// import { ProductType, ProductVariantType } from 'utils/types';

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Input } from '@/components/ui/input';

// import { Heart, Plus, Minus, ShoppingCart, CreditCard, MessageCircle, Flag, Store } from 'lucide-react';

// const ProductDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [product, setProduct] = useState<ProductType>();
//   const [openRatingsDialog, setOpenRatingsDialog] = useState<boolean>(false);
//   const [openRefundPolicy, setOpenRefundPolicy] = useState<boolean>(false);
//   const [activeTab, setActiveTab] = useState('description');

//   const [optionOneValue, setOptionOneValue] = useState<string>('');
//   const [optionTwoValue, setOptionTwoValue] = useState<string>('');
//   const [optionThreeValue, setOptionThreeValue] = useState<string>('');
//   const [currentProductVariant, setCurrentProductVariant] = useState<ProductVariantType>();
//   const [isSelectOption, setIsSelectOption] = useState<boolean>(false);
//   const [quantity, setQuantity] = useState<number>(1);

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
//   const { getUuid, getIsLogin } = useUserPresistStore((state) => state);
//   const { getCart, setCart } = useCartPresistStore((state) => state);

//   // 初始化商品
//   const init = async (productId: any) => {
//     try {
//       if (!productId) return;

//       const response: any = await axios.get(getIsLogin() ? Http.product_by_login_id : Http.product_by_id, {
//         params: { product_id: productId },
//       });

//       if (response.result) {
//         setProduct({
//           ...response.data,
//           render_body_html: DOMPurify.sanitize(await marked(response.data.body_html || '')),
//         });
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage(response.message);
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('Network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   // 获取具体规格
//   const initOptionValue = async () => {
//     if (!product) return;

//     let option = '';
//     const optionsCount = product.options?.length || 0;

//     if (optionsCount === 3 && (!optionOneValue || !optionTwoValue || !optionThreeValue)) return;
//     if (optionsCount === 2 && (!optionOneValue || !optionTwoValue)) return;
//     if (optionsCount === 1 && !optionOneValue) return;

//     switch (optionsCount) {
//       case 3:
//         option = `${optionOneValue},${optionTwoValue},${optionThreeValue}`;
//         break;
//       case 2:
//         option = `${optionOneValue},${optionTwoValue}`;
//         break;
//       case 1:
//         option = optionOneValue;
//         break;
//       default:
//         return;
//     }

//     setIsSelectOption(true);

//     try {
//       const response: any = await axios.get(Http.product_variant_by_option, {
//         params: { product_id: product.product_id, option },
//       });

//       if (response.result) {
//         setCurrentProductVariant({
//           ...response.data,
//           inventory_policy: response.data.inventory_policy === 1,
//           taxable: response.data.taxable === 1,
//         });
//       } else {
//         setCurrentProductVariant(undefined);
//         setQuantity(1);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     if (id) init(id);
//   }, [id]);

//   useEffect(() => {
//     initOptionValue();
//   }, [optionOneValue, optionTwoValue, optionThreeValue]);

//   const onClickFavorite = async () => {
//     if (!product?.product_id) return;

//     try {
//       const res: any = await axios.put(Http.collect, {
//         collect_type: COLLECT_TYPE.PRODUCT,
//         bind_id: product.product_id,
//       });

//       if (res.result) await init(id);
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('Failed to favorite');
//       setSnackOpen(true);
//     }
//   };

//   const addToCart = () => {
//     if (!product || !currentProductVariant) {
//       setSnackSeverity('error');
//       setSnackMessage('Product data error');
//       setSnackOpen(true);
//       return;
//     }

//     let option = '';
//     const optCount = product.options?.length || 0;

//     if (optCount === 1) option = optionOneValue;
//     else if (optCount === 2) option = `${optionOneValue},${optionTwoValue}`;
//     else if (optCount === 3) option = `${optionOneValue},${optionTwoValue},${optionThreeValue}`;

//     if (!option) {
//       setSnackSeverity('error');
//       setSnackMessage('Please select all product options');
//       setSnackOpen(true);
//       return;
//     }

//     const newVariant: any = {
//       productId: product.product_id,
//       title: product.title,
//       image: currentProductVariant.image || product.images?.[0]?.src || '',
//       option,
//       price: String(currentProductVariant.price || 0),
//       discounts: String(currentProductVariant.discounts || 0),
//       taxable: currentProductVariant.taxable || false,
//       tax: String(currentProductVariant.tax || 0),
//       tip: String(currentProductVariant.tip || 0),
//       weight: String(currentProductVariant.weight || 0),
//       weightUnit: String(currentProductVariant.weight_unit || ''),
//       quantity: Number(quantity),
//     };

//     const cart = getCart();
//     const newCart = [...cart];

//     const sellerIndex = newCart.findIndex((item) => item.uuid === product.user_uuid);

//     if (sellerIndex !== -1) {
//       const variantIndex = newCart[sellerIndex].variant.findIndex(
//         (v: any) => v.productId === product.product_id && v.option === option,
//       );

//       if (variantIndex !== -1) {
//         // 已存在相同规格 → 累加数量
//         newCart[sellerIndex].variant[variantIndex].quantity += Number(quantity);
//       } else {
//         // 新增规格
//         newCart[sellerIndex].variant.push(newVariant);
//       }
//     } else {
//       // 新增卖家
//       newCart.push({
//         uuid: product.user_uuid,
//         avatarUrl: product.user_avatar_url || '',
//         username: product.username || '',
//         currency: product.currency || '',
//         variant: [newVariant],
//       });
//     }

//     setCart(newCart);
//   };

//   const onClickAddToCart = () => {
//     if (quantity <= 0) return;
//     if (getUuid() === product?.user_uuid) {
//       setSnackSeverity('error');
//       setSnackMessage('Cannot buy your own product');
//       setSnackOpen(true);
//       return;
//     }
//     addToCart();
//     setSnackSeverity('success');
//     setSnackMessage('Added to cart successfully');
//     setSnackOpen(true);
//   };

//   const onClickBuyNow = () => {
//     if (quantity <= 0) return;
//     if (getUuid() === product?.user_uuid) {
//       setSnackSeverity('error');
//       setSnackMessage('Cannot buy your own product');
//       setSnackOpen(true);
//       return;
//     }
//     addToCart();
//     window.location.href = `/checkout/${product?.user_uuid}`;
//   };

//   if (!product) return <div className="py-20 text-center">Loading...</div>;

//   const isOwner = getUuid() === product.user_uuid;
//   const currencySymbol = CURRENCYS.find((c) => c.name === product.currency)?.code || '$';

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Status Alerts */}
//       {product.product_status !== 1 && !isOwner && (
//         <Card className="mb-6 border-red-500">
//           <CardContent className="p-6 text-red-600">Product not found or unavailable.</CardContent>
//         </Card>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//         {/* Left: Image Gallery */}
//         <div className="lg:col-span-7">
//           <div className="aspect-square bg-muted rounded-xl overflow-hidden">
//             {isSelectOption && currentProductVariant?.image ? (
//               <img src={currentProductVariant.image} alt="Selected variant" className="w-full h-full object-contain" />
//             ) : (
//               <Swiper modules={[Navigation, Pagination]} pagination={{ clickable: true }} navigation className="h-full">
//                 {product.images?.map((img, index) => (
//                   <SwiperSlide key={index}>
//                     <img src={img.src} alt={product.title} className="w-full h-full object-contain" />
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             )}
//           </div>

//           {/* Thumbnails */}
//           <div className="flex gap-3 mt-4 overflow-auto pb-2">
//             {product.images?.map((img, index) => (
//               <img
//                 key={index}
//                 src={img.src}
//                 alt=""
//                 className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:border-primary"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right: Product Info */}
//         <div className="lg:col-span-5 space-y-6">
//           <div>
//             <div className="flex items-center gap-3">
//               <Avatar>
//                 <AvatarImage src={product.user_avatar_url} />
//                 <AvatarFallback>{product.username?.[0]}</AvatarFallback>
//               </Avatar>
//               <p className="font-medium">{product.username}</p>
//             </div>

//             <h1 className="text-3xl font-bold mt-4">{product.title}</h1>

//             {product.ratings && product.ratings.length > 0 && (
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-2xl font-semibold">
//                   {(product.ratings.reduce((sum, r) => sum + r.number, 0) / product.ratings.length).toFixed(1)}
//                 </span>
//                 <span className="text-yellow-500">★</span>
//                 <button
//                   onClick={() => setOpenRatingsDialog(true)}
//                   className="text-sm text-muted-foreground hover:underline"
//                 >
//                   ({product.ratings.length} reviews)
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Price & Variant Info */}
//           {currentProductVariant && isSelectOption && (
//             <div className="text-4xl font-bold">
//               {currencySymbol}
//               {currentProductVariant.price}
//             </div>
//           )}

//           {/* Options */}
//           {product.options?.map((option, idx) => (
//             <div key={idx} className="space-y-3">
//               <p className="font-semibold">{option.name}</p>
//               <div className="flex flex-wrap gap-2">
//                 {option.value?.split(',').map((val, i) => (
//                   <Button
//                     key={i}
//                     variant={
//                       (idx === 0 && val === optionOneValue) ||
//                       (idx === 1 && val === optionTwoValue) ||
//                       (idx === 2 && val === optionThreeValue)
//                         ? 'default'
//                         : 'outline'
//                     }
//                     onClick={() => {
//                       if (idx === 0) setOptionOneValue(val);
//                       else if (idx === 1) setOptionTwoValue(val);
//                       else setOptionThreeValue(val);
//                     }}
//                   >
//                     {val}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           ))}

//           <Separator />

//           {/* Quantity & Actions */}
//           {product.product_status === 1 && isSelectOption && currentProductVariant && (
//             <div className="space-y-4">
//               {currentProductVariant.inventory_quantity > 0 ? (
//                 <>
//                   <div className="flex items-center justify-between">
//                     <p className="font-medium">Quantity</p>
//                     <div className="flex items-center gap-3">
//                       <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
//                         <Minus className="w-4 h-4" />
//                       </Button>
//                       <Input
//                         className="w-20 text-center"
//                         value={quantity}
//                         onChange={(e) => {
//                           const val = parseInt(e.target.value);
//                           if (val > 0 && val <= currentProductVariant.inventory_quantity) {
//                             setQuantity(val);
//                           }
//                         }}
//                       />
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => setQuantity(Math.min(currentProductVariant.inventory_quantity, quantity + 1))}
//                       >
//                         <Plus className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="flex flex-col gap-3">
//                     <Button size="lg" onClick={onClickAddToCart} className="gap-2">
//                       <ShoppingCart className="w-5 h-5" />
//                       Add to Cart
//                     </Button>
//                     <Button size="lg" variant="default" className="bg-black hover:bg-black/90" onClick={onClickBuyNow}>
//                       <CreditCard className="w-5 h-5 mr-2" />
//                       Buy Now
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 <Card className="border-red-500">
//                   <CardContent className="p-6 text-center text-red-600">Sold Out</CardContent>
//                 </Card>
//               )}
//             </div>
//           )}

//           {/* Favorite */}
//           {getIsLogin() && (
//             <Button
//               variant={product.collect_status === 1 ? 'default' : 'outline'}
//               className="w-full gap-2"
//               onClick={onClickFavorite}
//             >
//               <Heart className={product.collect_status === 1 ? 'fill-current' : ''} />
//               {product.collect_status === 1 ? 'Favorited' : 'Add to Favorites'}
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Description & Tabs */}
//       <div className="mt-16">
//         <Tabs value={activeTab} onValueChange={setActiveTab}>
//           <TabsList>
//             <TabsTrigger value="description">Description</TabsTrigger>
//             <TabsTrigger value="reviews">Reviews</TabsTrigger>
//           </TabsList>

//           <TabsContent value="description" className="prose max-w-none mt-8">
//             {product.render_body_html && <div dangerouslySetInnerHTML={{ __html: product.render_body_html }} />}
//           </TabsContent>

//           <TabsContent value="reviews">Reviews content (can be extended)</TabsContent>
//         </Tabs>
//       </div>

//       {/* More from seller */}
//       {product.product_status === 1 && (
//         <div className="mt-16">
//           <Button
//             variant="link"
//             onClick={() =>
//               router.push(
//                 `/explore?type=${Object.keys(PRODUCT_TYPE).find((k) => PRODUCT_TYPE[k as keyof typeof PRODUCT_TYPE] === product.product_type)}`,
//               )
//             }
//           >
//             More from this category →
//           </Button>
//           <NowTrendingCard productType={product.product_type} />
//         </div>
//       )}

//       {/* Owner Management Tabs */}
//       {isOwner && (
//         <div className="mt-20">
//           <h2 className="text-2xl font-bold mb-6">Product Management</h2>
//           {/* Add your management tabs here using shadcn Tabs */}
//         </div>
//       )}

//       {/* Dialogs */}
//       <ProductRatingsDialog
//         product_id={product.product_id}
//         openDialog={openRatingsDialog}
//         setOpenDialog={setOpenRatingsDialog}
//         ratings={product.ratings}
//       />
//       <RefundPolicyDialog openDialog={openRefundPolicy} setOpenDialog={setOpenRefundPolicy} />
//     </div>
//   );
// };

// export default ProductDetails;

import { useCartPresistStore, useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useEffect, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/navigation'
// @ts-ignore
import 'swiper/css/pagination'
// @ts-ignore
import 'swiper/css/scrollbar'
import ProductRatingsDialog from '@/components/Dialog/ProductRatingsDialog'
import RefundPolicyDialog from '@/components/Dialog/RefundPolicyDialog'
import { COLLECT_TYPE, PRODUCT_TAB_DATAS, PRODUCT_TYPE } from '@/packages/constants'
import Product from './Product'
import ProductVariant from './Variant'
import ProductRating from './Rating'
import NowTrendingCard from '@/components/Card/NowTrendingCard'
import { CURRENCYS } from '@/packages/constants/currency'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { ProductType, ProductVariantType } from '@/utils/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {
  Heart,
  MoreHorizontal,
  Mail,
  Flag,
  Star,
  ShoppingCart,
  Zap,
  Minus,
  Plus,
  ChevronRight,
  Link2,
  RefreshCcw,
  Tag,
  Coins,
  Receipt,
  AlertCircle,
  PackageX,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 评分进度条组件
const RatingBar = ({ star, ratings }: { star: number; ratings: any[] }) => {
  const count = ratings.filter((r) => r.number === star).length
  const percent = ratings.length > 0 ? (count / ratings.length) * 100 : 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-3">{star}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs text-muted-foreground w-6">{count}</span>
    </div>
  )
}

// 价格行组件
const PriceRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center justify-between py-1.5 border-b border-dashed border-gray-100 last:border-0">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4" />
      {label}
    </div>
    <span className="text-sm font-semibold">{value}</span>
  </div>
)

const ProductDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState<ProductType>()
  const [openRatingsDialog, setOpenRatingsDialog] = useState(false)
  const [openRefundPolicy, setOpenRefundPolicy] = useState(false)
  const [tabValue, setTabValue] = useState('0')
  const [optionOneValue, setOptionOneValue] = useState('')
  const [optionTwoValue, setOptionTwoValue] = useState('')
  const [optionThreeValue, setOptionThreeValue] = useState('')
  const [currentProductVariant, setCurrentProductVariant] = useState<ProductVariantType>()
  const [isSelectOption, setIsSelectOption] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)
  const { getUuid, getIsLogin } = useUserPresistStore((state) => state)
  const { getCart, setCart } = useCartPresistStore((state) => state)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }
  const showSuccess = (msg: string) => {
    setSnackSeverity('success')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const currencyCode = CURRENCYS.find((c) => c.name === product?.currency)?.code ?? ''

  const init = async (id: any) => {
    try {
      if (!id) return showError('Incorrect product id')
      const endpoint = getIsLogin() ? Http.product_by_login_id : Http.product_by_id
      const response: any = await axios.get(endpoint, {
        params: { product_id: id },
      })
      if (response.result) {
        setProduct({
          ...response.data,
          render_body_html: DOMPurify.sanitize(await marked(response.data.body_html)),
        })
      } else {
        showError(response.message)
      }
    } catch (e) {
      showError('Network error. Please try again later.')
    }
  }

  const initOptionValue = async (one: string, two: string, three: string) => {
    if (!product) return
    let option = ''
    switch (product.options.length) {
      case 3:
        if (!one || !two || !three) return
        option = `${one},${two},${three}`
        break
      case 2:
        if (!one || !two) return
        option = `${one},${two}`
        break
      case 1:
        if (!one) return
        option = one
        break
      default:
        return
    }
    setIsSelectOption(true)
    try {
      const response: any = await axios.get(Http.product_variant_by_option, {
        params: { product_id: product.product_id, option },
      })
      if (response.result) {
        setCurrentProductVariant({
          ...response.data,
          inventory_policy: response.data.inventory_policy === 1,
          taxable: response.data.taxable === 1,
        })
      } else {
        setCurrentProductVariant(undefined)
        setQuantity(1)
      }
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const addToCart = () => {
    if (!product) return
    let option = ''
    switch (product.options.length) {
      case 3:
        if (!optionOneValue || !optionTwoValue || !optionThreeValue) return
        option = `${optionOneValue},${optionTwoValue},${optionThreeValue}`
        break
      case 2:
        if (!optionOneValue || !optionTwoValue) return
        option = `${optionOneValue},${optionTwoValue}`
        break
      case 1:
        if (!optionOneValue) return
        option = optionOneValue
        break
      default:
        return
    }
    const cart = getCart()
    const newVariant: any = {
      productId: product.product_id,
      title: product.title,
      image: String(currentProductVariant?.image ?? ''),
      option,
      price: String(currentProductVariant?.price ?? ''),
      discounts: String(currentProductVariant?.discounts ?? ''),
      taxable: currentProductVariant?.taxable,
      tax: String(currentProductVariant?.tax ?? ''),
      tip: String(currentProductVariant?.tip ?? ''),
      weight: String(currentProductVariant?.weight ?? ''),
      weightUnit: String(currentProductVariant?.weight_unit ?? ''),
      quantity,
    }
    const cartItem = cart.find((i) => i.uuid === product.user_uuid)
    if (cartItem) {
      const exists = cartItem.variant.find(
        (v) => v.productId === product.product_id && v.option === option
      )
      setCart(
        cart.map((i) =>
          i.uuid === product.user_uuid
            ? {
                ...i,
                variant: exists
                  ? i.variant.map((v) =>
                      v.productId === product.product_id && v.option === option
                        ? { ...v, quantity: v.quantity + quantity }
                        : v
                    )
                  : [...i.variant, newVariant],
              }
            : i
        )
      )
    } else {
      setCart([
        ...cart,
        {
          uuid: product.user_uuid,
          avatarUrl: product.user_avatar_url,
          username: product.username,
          currency: product.currency,
          variant: [newVariant],
        },
      ])
    }
  }

  const onClickAddToCart = () => {
    if (!product || quantity <= 0) return showError('At least one quantity is required.')
    if (getUuid() === product.user_uuid) return showError('Cannot buy your own products.')
    addToCart()
    showSuccess('Added to cart successfully')
  }

  const onClickBuyNow = () => {
    if (!product || quantity <= 0) return showError('At least one quantity is required.')
    if (getUuid() === product.user_uuid) return showError('Cannot buy your own products.')
    addToCart()
    window.location.href = `/checkout/${product.user_uuid}`
  }

  const onClickFavorite = async () => {
    if (!product?.product_id) return showError('Incorrect product id')
    try {
      const response: any = await axios.put(Http.collect, {
        collect_type: COLLECT_TYPE.PRODUCT,
        bind_id: product.product_id,
      })
      if (response.result) {
        await init(id)
      } else {
        showError(response.message)
      }
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const avgRating = product?.ratings?.length
    ? (product.ratings.reduce((s, r) => s + r.number, 0) / product.ratings.length).toFixed(1)
    : '0'

  useEffect(() => {
    if (id) init(id)
  }, [id])
  useEffect(() => {
    initOptionValue(optionOneValue, optionTwoValue, optionThreeValue)
  }, [optionOneValue, optionTwoValue, optionThreeValue])

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )

  if (product.product_status !== 1 && getUuid() !== product.user_uuid)
    return (
      <div className="container mx-auto py-12 flex flex-col items-center gap-3 text-center">
        <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <p className="text-muted-foreground text-sm">
          This product does not exist or has been removed.
        </p>
        <Button
          onClick={() => {
            window.location.href = '/'
          }}
        >
          Back to Home
        </Button>
      </div>
    )

  return (
    <div className="container mx-auto py-6 px-4 flex flex-col gap-8">
      {/* 状态提示 */}
      {product.product_status === 2 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Archived</strong> — This product is read-only and not editable.
          </span>
        </div>
      )}
      {product.product_status === 3 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 text-amber-700 rounded-xl text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Draft</strong> — Edit this product and publish it to the market.
          </span>
        </div>
      )}

      {/* 主体内容 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：图片 + 评分 */}
        <div className="flex flex-col gap-6">
          {/* 图片区 */}
          <Card className="overflow-hidden border-0 shadow-sm">
            {isSelectOption && currentProductVariant?.image ? (
              <div className="flex justify-center items-center p-8 bg-gray-50 min-h-72">
                <img
                  src={currentProductVariant.image}
                  alt="variant"
                  className="max-h-64 object-contain rounded-xl"
                />
              </div>
            ) : (
              <Swiper navigation={true} modules={[Navigation]} className="min-h-72">
                {product.images.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="flex justify-center items-center p-8 bg-gray-50 min-h-72">
                      <img
                        src={item.src}
                        alt="product"
                        className="max-h-64 object-contain rounded-xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {/* 缩略图 */}
            <div className="flex gap-2 p-3 border-t">
              {product.images.map((item, i) => (
                <img
                  key={i}
                  src={item.src}
                  alt="thumb"
                  className="h-14 w-14 object-cover rounded-lg border shrink-0 cursor-pointer hover:border-sky-400 transition-colors"
                />
              ))}
            </div>
          </Card>

          {/* 评分区 */}
          {product.ratings && product.ratings.length > 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <h3 className="font-semibold text-base">Ratings & Reviews</h3>

                {/* 总评分 */}
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-extrabold text-gray-900">{avgRating}</div>
                  <div className="flex flex-col gap-1 flex-1">
                    {[5, 4, 3, 2, 1].map((s) => (
                      <RatingBar key={s} star={s} ratings={product.ratings} />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setOpenRatingsDialog(true)}
                  className="text-sm text-sky-500 hover:underline text-left"
                >
                  View all {product.ratings.length} reviews
                </button>

                {/* 评论预览 */}
                <div className="grid grid-cols-2 gap-4">
                  {product.ratings.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-xl">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              'h-3.5 w-3.5',
                              s <= item.number
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-200 fill-gray-200'
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.username} · {new Date(item.create_time).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.product_option.split(',').join(' / ')}
                      </p>
                      {item.image && (
                        <img
                          src={item.image}
                          alt="review"
                          className="h-12 w-12 object-cover rounded-lg"
                        />
                      )}
                      <p className="text-sm">{item.body}</p>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setOpenRatingsDialog(true)}
                >
                  Read more reviews
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-12 flex flex-col items-center gap-2 text-center">
                <Star className="h-8 w-8 text-gray-200" />
                <p className="font-medium text-sm">No ratings yet</p>
                <p className="text-xs text-muted-foreground">
                  Reviews will appear here after purchases.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右侧：商品信息 */}
        <div className="flex flex-col gap-5">
          {/* 卖家信息 */}
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              onClick={() => {
                window.location.href = `/profile/${product.username}`
              }}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={product.user_avatar_url || '/images/default_avatar.png'} />
                <AvatarFallback>{product.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold">{product.username}</span>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    window.location.href = `mailto:${product.user_email}`
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" /> Contact {product.username}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  onClick={() => {
                    window.location.href = `/report/products/${product.product_id}`
                  }}
                >
                  <Flag className="mr-2 h-4 w-4" /> Report product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 标题 + 收藏 */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">{product.title}</h1>
              {product.ratings && product.ratings.length > 0 && (
                <button
                  className="flex items-center gap-1"
                  onClick={() => setOpenRatingsDialog(true)}
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={cn(
                        'h-3.5 w-3.5',
                        s <= Math.round(Number(avgRating))
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-200 fill-gray-200'
                      )}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {product.ratings.length} ratings
                  </span>
                </button>
              )}
            </div>
            {getIsLogin() && (
              <button
                onClick={onClickFavorite}
                className={cn(
                  'h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-200 shrink-0',
                  product.collect_status === 1
                    ? 'bg-sky-500 border-sky-500 text-white'
                    : 'border-gray-200 text-gray-400 hover:border-sky-300 hover:text-sky-500'
                )}
              >
                <Heart className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* 价格详情 */}
          {currentProductVariant && isSelectOption && (
            <Card className="border-0 bg-gray-50">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="text-3xl font-extrabold text-gray-900 mb-2">
                  {currencyCode}
                  {currentProductVariant.price}
                </div>
                <PriceRow
                  icon={Receipt}
                  label="TAX"
                  value={
                    currentProductVariant.taxable
                      ? `${currencyCode}${(parseFloat(currentProductVariant.tax) * quantity).toFixed(2)}`
                      : 'Tax free'
                  }
                />
                <PriceRow
                  icon={Coins}
                  label="TIP"
                  value={
                    Number(currentProductVariant.tip) > 0
                      ? `${currencyCode}${(parseFloat(currentProductVariant.tip) * quantity).toFixed(2)}`
                      : 'No tip'
                  }
                />
                <PriceRow
                  icon={Tag}
                  label="DISCOUNTS"
                  value={
                    Number(currentProductVariant.discounts) > 0
                      ? `${currencyCode}${(parseFloat(currentProductVariant.discounts) * quantity).toFixed(2)}`
                      : 'No discounts'
                  }
                />
              </CardContent>
            </Card>
          )}

          {/* 选项选择 */}
          {product.options?.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <div className="flex flex-wrap gap-2">
                {item.value.split(',').map((val, vi) => {
                  const isSelected =
                    (index === 0 && val === optionOneValue) ||
                    (index === 1 && val === optionTwoValue) ||
                    (index === 2 && val === optionThreeValue)
                  return (
                    <button
                      key={vi}
                      onClick={() => {
                        if (index === 0) setOptionOneValue(val)
                        else if (index === 1) setOptionTwoValue(val)
                        else setOptionThreeValue(val)
                      }}
                      className={cn(
                        'px-4 py-1.5 rounded-full text-sm border transition-all duration-150',
                        isSelected
                          ? 'bg-sky-500 text-white border-sky-500'
                          : 'border-gray-200 text-gray-600 hover:border-sky-300'
                      )}
                    >
                      {val}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* 数量 + 购买 */}
          {product.product_status === 1 &&
            isSelectOption &&
            (currentProductVariant && currentProductVariant.inventory_quantity > 0 ? (
              <div className="flex flex-col gap-3">
                {/* 数量选择 */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">Quantity</span>
                  <div className="flex items-center border rounded-xl overflow-hidden">
                    <button
                      className="h-9 w-9 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition-colors"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      className="h-9 w-9 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition-colors"
                      disabled={quantity >= currentProductVariant.inventory_quantity}
                      onClick={() =>
                        setQuantity((q) =>
                          Math.min(currentProductVariant.inventory_quantity, q + 1)
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    className="text-xs text-sky-500 hover:underline"
                    onClick={() => setQuantity(currentProductVariant.inventory_quantity)}
                  >
                    Max ({currentProductVariant.inventory_quantity})
                  </button>
                </div>

                {/* 购买按钮 */}
                <Button
                  className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
                  onClick={onClickAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" /> Add to cart
                </Button>
                <Button
                  className="h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold gap-2"
                  onClick={onClickBuyNow}
                >
                  <Zap className="h-5 w-5" /> Buy now
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-xl">
                <PackageX className="h-5 w-5 shrink-0" />
                <p className="text-sm font-medium">Sorry, this product is sold out.</p>
              </div>
            ))}

          {/* 描述 */}
          {product.render_body_html && (
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-sm">Description</h3>
              <div
                className="text-sm text-muted-foreground prose prose-sm max-w-none overflow-auto"
                dangerouslySetInnerHTML={{ __html: product.render_body_html }}
              />
            </div>
          )}

          {/* 底部操作 */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                window.location.href = `/profile/${product.username}`
              }}
            >
              <Link2 className="h-4 w-4" /> More from {product.username}
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => setOpenRefundPolicy(true)}>
              <RefreshCcw className="h-4 w-4" /> Refund Policy
            </Button>
          </div>
        </div>
      </div>

      {/* 推荐商品 */}
      {product.product_status === 1 && (
        <div className="flex flex-col gap-4">
          <button
            className="flex items-center gap-1 hover:text-sky-500 transition-colors"
            onClick={() => {
              window.location.href = `/explore?type=${Object.entries(PRODUCT_TYPE).find(([, v]) => v === product.product_type)?.[0]}`
            }}
          >
            <h2 className="text-lg font-bold">Recommended</h2>
            <ChevronRight className="h-5 w-5" />
          </button>
          <NowTrendingCard productType={product.product_type} />
        </div>
      )}

      {/* 商品管理（仅限卖家） */}
      {getUuid() === product.user_uuid && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Product Management</h2>
          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsList className="w-full justify-start">
              {PRODUCT_TAB_DATAS.map((item) => (
                <TabsTrigger key={item.id} value={String(item.id)}>
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="0">
              <Product
                product_id={product.product_id}
                title={product.title}
                vendor={product.vendor}
                productType={product.product_type}
                tags={product.tags}
                description={product.body_html}
                options={product.options}
                images={product.images}
                productStatus={product.product_status}
                init={init}
              />
            </TabsContent>
            <TabsContent value="1">
              <ProductVariant
                product_id={product.product_id}
                options={product.options}
                currency={product.currency}
              />
            </TabsContent>
            <TabsContent value="2">
              <ProductRating />
            </TabsContent>
          </Tabs>
        </div>
      )}

      <ProductRatingsDialog
        product_id={product.product_id}
        openDialog={openRatingsDialog}
        setOpenDialog={setOpenRatingsDialog}
        ratings={product.ratings}
      />
      <RefundPolicyDialog openDialog={openRefundPolicy} setOpenDialog={setOpenRefundPolicy} />
    </div>
  )
}

export default ProductDetails
