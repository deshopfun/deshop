import { useCartPresistStore, useSnackPresistStore, useUserPresistStore } from 'lib';
import { useRouter } from 'next/router';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  LinearProgress,
  Link,
  Menu,
  MenuItem,
  Rating,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useEffect, useState } from 'react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
  Add,
  BorderColor,
  ChatBubbleOutline,
  ChevronRight,
  Discount,
  FavoriteBorder,
  FavoriteBorderOutlined,
  FavoriteBorderTwoTone,
  HelpOutline,
  InsertLink,
  LocalShipping,
  MoreHoriz,
  Remove,
  SaveAs,
  Star,
  ThumbUpAlt,
  ThumbUpOffAlt,
  Wallet,
} from '@mui/icons-material';
import ProductRatingsDialog from 'components/Dialog/ProductRatingsDialog';
import RefundPolicyDialog from 'components/Dialog/RefundPolicyDialog';
import { COLLECT_TYPE, PRODUCT_TAB_DATAS, PRODUCT_TYPE } from 'packages/constants';
import Product from './Product';
import ProductVariant from './Variant';
import ProductRating from './Rating';
import NowTrendingCard from 'components/Card/NowTrendingCard';
import { CURRENCYS } from 'packages/constants/currency';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

type ProductType = {
  product_id: number;
  user_uuid: string;
  user_email: string;
  username: string;
  user_avatar_url: string;
  title: string;
  body_html: string;
  render_body_html: string;
  product_type: string;
  tags: string;
  vendor: string;
  currency: string;
  product_status: number;
  collect_status: number;
  images: ProductImage[];
  options: ProductOption[];
  ratings: ProductRating[];
};

type ProductRating = {
  username: string;
  rating_id: number;
  product_option: string;
  number: number;
  image: string;
  body: string;
  create_time: number;
};

type ProductImage = {
  src: string;
  width: number;
  height: number;
};

type ProductOption = {
  name: string;
  value: string;
};

type ProductVariant = {
  title: string;
  barcode: string;
  compare_at_price: string;
  image: string;
  inventory_policy: boolean;
  inventory_quantity: number;
  position: number;
  price: string;
  discounts: string;
  taxable: boolean;
  tax: string;
  tip: string;
  shippable: boolean;
  shipping: string;
  sku: string;
  weight: string;
  weight_unit: string;
};

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<ProductType>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openRatingsDialog, setOpenRatingsDialog] = useState<boolean>(false);
  const [openRefundPolicy, setOpenRefundPolicy] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);
  const [optionOneValue, setOptionOneValue] = useState<string>('');
  const [optionTwoValue, setOptionTwoValue] = useState<string>('');
  const [optionThreeValue, setOptionThreeValue] = useState<string>('');
  const [currentProductVariant, setCurrentProductVariant] = useState<ProductVariant>();
  const [isSelectOption, setIsSelectOption] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const tabId = Object.values(PRODUCT_TAB_DATAS).find((item) => item.id === newValue)?.tabId;
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, tab: tabId },
    });

    setTabValue(newValue);
  };

  const openMore = Boolean(anchorEl);

  const handleClickMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getUuid, getIsLogin } = useUserPresistStore((state) => state);
  const { getCart, setCart } = useCartPresistStore((state) => state);

  const init = async (id: any) => {
    try {
      if (!id || id === 0) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect product id');
        setSnackOpen(true);
        return;
      }

      let response: any;
      if (getIsLogin()) {
        response = await axios.get(Http.product_by_login_id, {
          params: {
            product_id: id,
          },
        });
      } else {
        response = await axios.get(Http.product_by_id, {
          params: {
            product_id: id,
          },
        });
      }

      if (response.result) {
        setProduct({
          ...response.data,
          render_body_html: DOMPurify.sanitize(await marked(response.data.body_html)),
        });
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message);
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  const initOptionValue = async (oneValue: string, twoValue: string, threeValue: string) => {
    try {
      if (!product) {
        return;
      }

      let option = '';
      switch (product.options.length) {
        case 3:
          if (!oneValue || !twoValue || !threeValue) return;
          option = `${oneValue},${twoValue},${threeValue}`;
          break;
        case 2:
          if (!oneValue || !twoValue) return;
          option = `${oneValue},${twoValue}`;
          break;
        case 1:
          if (!oneValue) return;
          option = `${oneValue}`;
          break;
        default:
          return;
      }

      setIsSelectOption(true);

      const response: any = await axios.get(Http.product_variant_by_option, {
        params: {
          product_id: product.product_id,
          option: option,
        },
      });

      if (response.result) {
        setCurrentProductVariant({
          ...response.data,
          inventory_policy: response.data.inventory_policy === 1 ? true : false,
          shippable: response.data.shippable === 1 ? true : false,
          taxable: response.data.taxable === 1 ? true : false,
        });
      } else {
        setCurrentProductVariant(undefined);
        setQuantity(1);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      init(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    initOptionValue(optionOneValue, optionTwoValue, optionThreeValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionOneValue, optionTwoValue, optionThreeValue]);

  const onClickFavorite = async () => {
    try {
      if (!product) {
        return;
      }

      if (!product.product_id || product.product_id === 0) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect product id');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.put(Http.collect, {
        collect_type: COLLECT_TYPE.PRODUCT,
        bind_id: product.product_id,
      });

      if (response.result) {
        await init(id);
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message);
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  const onClickAddToCart = async () => {
    if (!product) {
      return;
    }

    if (quantity <= 0) {
      setSnackSeverity('error');
      setSnackMessage('At least one quantity is required.');
      setSnackOpen(true);
      return;
    }

    if (getUuid() === product.user_uuid) {
      setSnackSeverity('error');
      setSnackMessage('Cannot buy your own products.');
      setSnackOpen(true);
      return;
    }

    addToCart();

    setSnackSeverity('success');
    setSnackMessage('Add to cart successfully');
    setSnackOpen(true);
  };

  const onClickBuyNow = async () => {
    if (!product) {
      return;
    }

    if (quantity <= 0) {
      setSnackSeverity('error');
      setSnackMessage('At least one quantity is required.');
      setSnackOpen(true);
      return;
    }

    if (getUuid() === product.user_uuid) {
      setSnackSeverity('error');
      setSnackMessage('Cannot buy your own products.');
      setSnackOpen(true);
      return;
    }

    addToCart();

    window.location.href = `/checkout/${product.user_uuid}`;
  };

  const addToCart = () => {
    if (!product) {
      return;
    }

    let option = '';
    switch (product.options.length) {
      case 3:
        if (!optionOneValue || !optionTwoValue || !optionThreeValue) return;
        option = `${optionOneValue},${optionTwoValue},${optionThreeValue}`;
        break;
      case 2:
        if (!optionOneValue || !optionTwoValue) return;
        option = `${optionOneValue},${optionTwoValue}`;
        break;
      case 1:
        if (!optionOneValue) return;
        option = `${optionOneValue}`;
        break;
      default:
        return;
    }

    const cart = getCart();
    const cartItem = cart.find((item) => item.uuid === product.user_uuid);
    const newVariant: any = {
      productId: product.product_id,
      title: product.title,
      image: String(currentProductVariant?.image ?? ''),
      option,
      price: String(currentProductVariant?.price ?? ''),
      discounts: String(currentProductVariant?.discounts ?? ''),
      taxable: currentProductVariant?.taxable,
      tax: String(currentProductVariant?.tax ?? ''),
      shippable: currentProductVariant?.shippable,
      shipping: String(currentProductVariant?.shipping ?? ''),
      tip: String(currentProductVariant?.tip ?? ''),
      weight: String(currentProductVariant?.weight ?? ''),
      weightUnit: String(currentProductVariant?.weight_unit ?? ''),
      quantity,
    };

    if (cartItem) {
      const variantItem = cartItem.variant.find(
        (vItem) => vItem.productId === product.product_id && vItem.option === option,
      );

      setCart(
        cart.map((item) =>
          item.uuid === product.user_uuid
            ? {
                ...item,
                variant: variantItem
                  ? item.variant.map((vItem) =>
                      vItem.productId === product.product_id && vItem.option === option
                        ? { ...vItem, quantity: vItem.quantity + quantity }
                        : vItem,
                    )
                  : [...item.variant, newVariant],
              }
            : item,
        ),
      );
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
      ]);
    }
  };

  return (
    <Container>
      {product?.product_status !== 1 && getUuid() !== product?.user_uuid ? (
        <Box>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <Typography>Not found</Typography>
          </Alert>
        </Box>
      ) : (
        <>
          {product?.product_status === 2 && (
            <Box>
              <Alert severity="info">
                <AlertTitle>Archived</AlertTitle>
                <Typography>The product status is Archived, only read but not editable</Typography>
              </Alert>
            </Box>
          )}
          {product?.product_status === 3 && (
            <Box>
              <Alert severity="warning">
                <AlertTitle>Draft</AlertTitle>
                <Typography>The status of the product is Draft, you can edit it and put it on the market</Typography>
              </Alert>
            </Box>
          )}
          <Grid container spacing={8} mt={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              {isSelectOption && currentProductVariant?.image ? (
                <Box textAlign={'center'}>
                  <img src={currentProductVariant.image} alt="image" width={200} height={200} />
                </Box>
              ) : (
                <Swiper
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                >
                  {product &&
                    product.images.length > 0 &&
                    product.images.map((item, index) => (
                      <SwiperSlide key={index}>
                        <Box display={'flex'} justifyContent={'center'}>
                          <img src={item.src} alt="image" width={200} height={200} />
                        </Box>
                      </SwiperSlide>
                    ))}
                </Swiper>
              )}
              <Stack direction={'row'} alignItems={'center'} gap={1} mt={2}>
                {product &&
                  product.images.length > 0 &&
                  product.images.map((item, index) => (
                    <img key={index} src={item.src} alt="image" width={50} height={50} />
                  ))}
              </Stack>

              {product.ratings && product.ratings.length > 0 ? (
                <Box mt={3}>
                  <Typography variant="h6">Ratings and reviews</Typography>
                  <Box mt={2}>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <Typography variant="h4">
                        {product.ratings
                          ? (
                              product.ratings.reduce((total, item) => {
                                return total + item.number;
                              }, 0) / product.ratings.length
                            ).toFixed(1)
                          : 0}
                      </Typography>
                      <Star />
                    </Stack>
                    <div
                      onClick={() => {
                        setOpenRatingsDialog(true);
                      }}
                    >
                      <Link color="#000" fontSize={14}>
                        {`${product.ratings ? product.ratings.length : 0} ratings`}
                      </Link>
                    </div>

                    <Box mt={2}>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography fontWeight={'bold'}>5</Typography>
                        <Box sx={{ width: '100%' }}>
                          <LinearProgress
                            color={'inherit'}
                            variant="determinate"
                            value={parseInt(
                              (
                                (product.ratings
                                  ? product.ratings.reduce((total, item) => {
                                      if (item.number === 5) {
                                        return total + 1;
                                      }
                                      return total;
                                    }, 0) / product.ratings.length
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
                                (product.ratings
                                  ? product.ratings.reduce((total, item) => {
                                      if (item.number === 4) {
                                        return total + 1;
                                      }
                                      return total;
                                    }, 0) / product.ratings.length
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
                                (product.ratings
                                  ? product.ratings.reduce((total, item) => {
                                      if (item.number === 3) {
                                        return total + 1;
                                      }
                                      return total;
                                    }, 0) / product.ratings.length
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
                                (product.ratings
                                  ? product.ratings.reduce((total, item) => {
                                      if (item.number === 2) {
                                        return total + 1;
                                      }
                                      return total;
                                    }, 0) / product.ratings.length
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
                                (product.ratings
                                  ? product.ratings.reduce((total, item) => {
                                      if (item.number === 1) {
                                        return total + 1;
                                      }
                                      return total;
                                    }, 0) / product.ratings.length
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
                  </Box>
                  <Box mt={2}>
                    <Grid container spacing={4}>
                      {product.ratings.slice(0, 4).map((item, index) => (
                        <Grid size={{ xs: 6, md: 6 }} key={index}>
                          <Rating size="small" value={item.number} readOnly />
                          <Typography fontSize={14}>{`${item.username} · ${new Date(
                            item.create_time,
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
                        </Grid>
                      ))}
                    </Grid>
                    <Box mt={4}>
                      <Button
                        fullWidth
                        variant={'contained'}
                        color={'inherit'}
                        onClick={() => {
                          setOpenRatingsDialog(true);
                        }}
                      >
                        Read more reviews
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box mt={3}>
                  <Card>
                    <CardContent>
                      <Box py={2} textAlign={'center'}>
                        <Typography variant="h6">Not found the rating</Typography>
                        <Typography mt={2}>Need more product reviews to be displayed here.</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  {product.user_avatar_url ? (
                    <img src={product.user_avatar_url} alt={'image'} loading="lazy" width={30} height={30} />
                  ) : (
                    <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={30} height={30} />
                  )}
                  <Typography fontWeight={'bold'}>{product.username}</Typography>
                </Stack>
                <IconButton onClick={handleClickMore}>
                  <MoreHoriz />
                </IconButton>
                <Menu open={openMore} anchorEl={anchorEl} onClose={handleCloseMore}>
                  <MenuItem
                    onClick={() => {
                      window.location.href = `mailto:${product.user_email}`;
                    }}
                  >
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <ChatBubbleOutline fontSize={'small'} />
                      <Typography>{`Contact ${product.username}`}</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem onClick={() => {}}>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <HelpOutline color={'error'} fontSize={'small'} />
                      <Link color={'error'} href={`/report/products/${product.product_id}`} underline='none'>
                        Report product
                      </Link>
                    </Stack>
                  </MenuItem>
                </Menu>
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                <Box>
                  <Typography variant="h6">{product.title}</Typography>
                  {product.ratings && product.ratings.length > 0 && (
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <Rating size="small" value={5} readOnly />
                      <div
                        onClick={() => {
                          setOpenRatingsDialog(true);
                        }}
                      >
                        <Link color="#000" fontSize={14}>
                          {`${product.ratings ? product.ratings.length : 0} ratings`}
                        </Link>
                      </div>
                    </Stack>
                  )}
                </Box>
                {getIsLogin() && (
                  <IconButton
                    style={{
                      width: 50,
                      height: 50,
                      background: product?.collect_status === 1 ? '#0098e5' : '',
                      color: product?.collect_status === 1 ? 'white' : '',
                    }}
                    onClick={() => {
                      onClickFavorite();
                    }}
                  >
                    <FavoriteBorder />
                  </IconButton>
                )}
              </Stack>

              {currentProductVariant && isSelectOption && (
                <Box>
                  <Stack direction={'row'} alignItems={'center'} gap={1} py={1}>
                    <Typography variant="h5">{`${CURRENCYS.find((item) => item.name === product.currency)?.code}${
                      currentProductVariant.price
                    }`}</Typography>
                  </Stack>

                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <LocalShipping fontSize={'small'} />
                      <Typography>SHIPPING</Typography>
                    </Stack>
                    {currentProductVariant.shippable ? (
                      <Typography fontWeight={'bold'}>
                        {CURRENCYS.find((item) => item.name === product.currency)?.code}
                        {(parseFloat(currentProductVariant.shipping) * quantity).toFixed(2)}
                      </Typography>
                    ) : (
                      <Typography>Shipping free</Typography>
                    )}
                  </Stack>

                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <BorderColor fontSize={'small'} />
                      <Typography>TAX</Typography>
                    </Stack>
                    {currentProductVariant.taxable ? (
                      <Typography fontWeight={'bold'}>
                        {CURRENCYS.find((item) => item.name === product.currency)?.code}
                        {(parseFloat(currentProductVariant.tax) * quantity).toFixed(2)}
                      </Typography>
                    ) : (
                      <Typography>Tax free</Typography>
                    )}
                  </Stack>

                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <Wallet fontSize={'small'} />
                      <Typography>TIP</Typography>
                    </Stack>
                    {Number(currentProductVariant.tip) > 0 ? (
                      <Typography fontWeight={'bold'}>
                        {CURRENCYS.find((item) => item.name === product.currency)?.code}
                        {(parseFloat(currentProductVariant.tip) * quantity).toFixed(2)}
                      </Typography>
                    ) : (
                      <Typography>No Tip</Typography>
                    )}
                  </Stack>

                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <Discount fontSize={'small'} />
                      <Typography>DISCOUNTS</Typography>
                    </Stack>
                    {Number(currentProductVariant.discounts) > 0 ? (
                      <Typography fontWeight={'bold'}>
                        {CURRENCYS.find((item) => item.name === product.currency)?.code}
                        {(parseFloat(currentProductVariant.discounts) * quantity).toFixed(2)}
                      </Typography>
                    ) : (
                      <Typography>No Discounts</Typography>
                    )}
                  </Stack>
                </Box>
              )}

              <Box mt={2}>
                {product?.options &&
                  product.options.length > 0 &&
                  product.options.map((item, index) => (
                    <Box key={index}>
                      <Stack direction={'row'} alignItems={'center'} gap={2}>
                        <Typography variant="h6">{item.name}</Typography>
                      </Stack>

                      <Box pt={1} pb={2}>
                        <Grid container columnSpacing={6} rowSpacing={2}>
                          {item.value &&
                            item.value.split(',').length > 0 &&
                            item.value.split(',').map((innerItem, innerIndex) => (
                              <Grid size={4} key={innerIndex}>
                                <Button
                                  variant={'contained'}
                                  color={
                                    index === 0 && innerItem === optionOneValue
                                      ? 'success'
                                      : index === 1 && innerItem === optionTwoValue
                                      ? 'success'
                                      : index === 2 && innerItem === optionThreeValue
                                      ? 'success'
                                      : 'primary'
                                  }
                                  onClick={() => {
                                    if (index === 0) {
                                      setOptionOneValue(innerItem);
                                    } else if (index === 1) {
                                      setOptionTwoValue(innerItem);
                                    } else if (index === 2) {
                                      setOptionThreeValue(innerItem);
                                    }
                                  }}
                                >
                                  {innerItem}
                                </Button>
                              </Grid>
                            ))}
                        </Grid>
                      </Box>
                      <Box py={2}>
                        <Divider />
                      </Box>
                    </Box>
                  ))}
              </Box>

              {product?.product_status === 1 && isSelectOption && (
                <>
                  {currentProductVariant && currentProductVariant?.inventory_quantity > 0 ? (
                    <>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                        <Typography fontWeight={'bold'}>Quantity</Typography>
                        <Input
                          fullWidth
                          startAdornment={
                            <IconButton
                              disabled={quantity <= 1 ? true : false}
                              onClick={() => {
                                if (quantity - 1 >= 0) {
                                  setQuantity(quantity - 1);
                                }
                              }}
                            >
                              <Remove />
                            </IconButton>
                          }
                          endAdornment={
                            <IconButton
                              disabled={quantity >= currentProductVariant.inventory_quantity ? true : false}
                              onClick={() => {
                                if (quantity + 1 <= currentProductVariant.inventory_quantity) {
                                  setQuantity(quantity + 1);
                                }
                              }}
                            >
                              <Add />
                            </IconButton>
                          }
                          value={quantity}
                          onChange={(e: any) => {
                            if (0 < e.target.value && e.target.value <= currentProductVariant.inventory_quantity) {
                              setQuantity(e.target.value);
                            }
                          }}
                        />
                        <Button
                          variant={'contained'}
                          onClick={() => {
                            setQuantity(currentProductVariant.inventory_quantity);
                          }}
                        >
                          Max
                        </Button>
                      </Stack>
                      <Box mt={4}>
                        <Button
                          variant={'contained'}
                          fullWidth
                          onClick={() => {
                            onClickAddToCart();
                          }}
                        >
                          Add to cart
                        </Button>
                        <Button
                          variant={'contained'}
                          fullWidth
                          style={{ background: '#000', marginTop: 10 }}
                          onClick={() => {
                            onClickBuyNow();
                          }}
                        >
                          Buy now
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <Box>
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <Typography>Sorry, the product has been sold out</Typography>
                      </Alert>
                    </Box>
                  )}
                </>
              )}
              <Box mt={2} overflow={'auto'}>
                <Typography variant="h6">Description</Typography>
                {product?.render_body_html && (
                  <Box mt={1} dangerouslySetInnerHTML={{ __html: product?.render_body_html }}></Box>
                )}
              </Box>

              <Box mt={2}>
                <Button
                  fullWidth
                  variant={'contained'}
                  color={'inherit'}
                  startIcon={<InsertLink />}
                  onClick={() => {
                    window.location.href = `/profile/${product.username}`;
                  }}
                >
                  {`More details at ${product.username}`}
                </Button>
                <Box mt={1}>
                  <Button
                    fullWidth
                    variant={'contained'}
                    color={'inherit'}
                    onClick={() => {
                      setOpenRefundPolicy(true);
                    }}
                  >
                    Refund Policy
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {product?.product_status === 1 && (
            <Box mt={4} mb={8}>
              <Box display={'flex'} alignItems={'center'}>
                <Button
                  color={'inherit'}
                  endIcon={<ChevronRight />}
                  onClick={() => {
                    window.location.href = `/explore?type=${
                      Object.entries(PRODUCT_TYPE).find((item) => item[1] == product.product_type)?.[0]
                    }`;
                  }}
                >
                  <Typography variant="h6">Recommend more</Typography>
                </Button>
              </Box>

              <Box mt={2}>
                <NowTrendingCard productType={product.product_type} />
              </Box>
            </Box>
          )}

          {getUuid() === product?.user_uuid && (
            <Box mt={4}>
              <Typography variant="h6">Product manage</Typography>

              <Box mt={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                  {PRODUCT_TAB_DATAS &&
                    PRODUCT_TAB_DATAS.length > 0 &&
                    PRODUCT_TAB_DATAS.map((item, index) => (
                      <Tab key={index} label={item.title} {...a11yProps(item.id)} />
                    ))}
                </Tabs>
              </Box>

              <CustomTabPanel value={tabValue} index={0}>
                <Product
                  product_id={product?.product_id}
                  title={product?.title}
                  vendor={product?.vendor}
                  productType={product?.product_type}
                  tags={product?.tags}
                  description={product?.body_html}
                  options={product?.options}
                  images={product?.images}
                  productStatus={product?.product_status}
                />
              </CustomTabPanel>
              <CustomTabPanel value={tabValue} index={1}>
                <ProductVariant
                  product_id={product?.product_id}
                  options={product?.options}
                  currency={product?.currency}
                />
              </CustomTabPanel>
              <CustomTabPanel value={tabValue} index={2}>
                <ProductRating />
              </CustomTabPanel>
            </Box>
          )}

          <ProductRatingsDialog
            product_id={product.product_id}
            openDialog={openRatingsDialog}
            setOpenDialog={setOpenRatingsDialog}
            ratings={product.ratings}
          />
          <RefundPolicyDialog openDialog={openRefundPolicy} setOpenDialog={setOpenRefundPolicy} />
        </>
      )}
    </Container>
  );
};

export default ProductDetails;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
