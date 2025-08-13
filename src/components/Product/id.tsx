import { useCartPresistStore, useSnackPresistStore, useUserPresistStore } from 'lib';
import { useRouter } from 'next/router';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
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
} from '@mui/icons-material';
import RecentViewCard from 'components/Card/RecentViewCard';
import ProductRatingsDialog from 'components/Dialog/ProductRatingsDialog';
import RefundPolicyDialog from 'components/Dialog/RefundPolicyDialog';
import { COLLECT_TYPE, PRODUCT_TAB_DATAS } from 'packages/constants';
import Product from './Product';
import ProductVariant from './Variant';
import ProductRating from './Rating';

type ProductType = {
  product_id: number;
  user_uuid: string;
  user_email: string;
  username: string;
  user_avatar_url: string;
  title: string;
  body_html: string;
  product_type: string;
  tags: string;
  vendor: string;
  product_status: number;
  collect_status: number;
  images: ProductImage[];
  options: ProductOption[];
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
  requires_shipping: boolean;
  sku: string;
  taxable: boolean;
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
  const [quantity, setQuantity] = useState<number>(0);

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
        setProduct(response.data);
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
          requires_shipping: response.data.requires_shipping === 1 ? true : false,
          taxable: response.data.taxable === 1 ? true : false,
        });
      } else {
        setCurrentProductVariant(undefined);
        setQuantity(0);
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

  if (product?.product_status !== 1 && getUuid() !== product?.user_uuid) {
    return (
      <Container>
        <Box>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <Typography>Not found</Typography>
          </Alert>
        </Box>
      </Container>
    );
  }

  const onClickFavorite = async () => {
    try {
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
    if (quantity <= 0) return;

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
          variant: [newVariant],
        },
      ]);
    }

    setSnackSeverity('success');
    setSnackMessage('Add to cart successfully');
    setSnackOpen(true);
  };

  const onClickBuyNow = async () => {};
  try {
  } catch (e) {
    setSnackSeverity('error');
    setSnackMessage('The network error occurred. Please try again later.');
    setSnackOpen(true);
    console.error(e);
  }

  return (
    <Container>
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

          <Box mt={3}>
            <Typography variant="h6">Ratings and reviews</Typography>
            <Box mt={2}>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Typography variant="h4">4.9</Typography>
                <Star />
              </Stack>
              <div
                onClick={() => {
                  setOpenRatingsDialog(true);
                }}
              >
                <Link color="#000" fontSize={14}>
                  4.6K ratings
                </Link>
              </div>

              <Box mt={2}>
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
            </Box>
            <Box mt={2}>
              <Grid container spacing={4}>
                <Grid size={{ xs: 6, md: 6 }}>
                  <Rating size="small" value={5} readOnly />
                  <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Typography fontSize={14}>abc</Typography>
                    <Typography fontSize={14}>·</Typography>
                    <Typography fontSize={14}>7 days ago</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
                    <Typography fontSize={14}>Red</Typography>
                    <Typography fontSize={14}>/</Typography>
                    <Typography fontSize={14}>M</Typography>
                  </Stack>
                  <Typography mt={2}>
                    the hoodie is super comfy. only thing is even though i like over sized and knew this would be
                    oversized i would still suggest sizing down.
                  </Typography>
                  <Stack direction={'row'} alignItems={'center'} mt={2}>
                    <IconButton size="small">
                      <ThumbUpOffAlt fontSize={'small'} />
                      {/* <ThumbUpAlt fontSize={'small'}/> */}
                    </IconButton>
                    <Typography>Helpful</Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, md: 6 }}>
                  <Rating size="small" value={5} readOnly />
                  <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Typography fontSize={14}>abc</Typography>
                    <Typography fontSize={14}>·</Typography>
                    <Typography fontSize={14}>7 days ago</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
                    <Typography fontSize={14}>Red</Typography>
                    <Typography fontSize={14}>/</Typography>
                    <Typography fontSize={14}>M</Typography>
                  </Stack>
                  <Typography mt={2}>
                    the hoodie is super comfy. only thing is even though i like over sized and knew this would be
                    oversized i would still suggest sizing down.
                  </Typography>
                  <Stack direction={'row'} alignItems={'center'} mt={2}>
                    <IconButton size="small">
                      <ThumbUpOffAlt fontSize={'small'} />
                      {/* <ThumbUpAlt fontSize={'small'}/> */}
                    </IconButton>
                    <Typography>Helpful</Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, md: 6 }}>
                  <Rating size="small" value={5} readOnly />
                  <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Typography fontSize={14}>abc</Typography>
                    <Typography fontSize={14}>·</Typography>
                    <Typography fontSize={14}>7 days ago</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
                    <Typography fontSize={14}>Red</Typography>
                    <Typography fontSize={14}>/</Typography>
                    <Typography fontSize={14}>M</Typography>
                  </Stack>
                  <Typography mt={2}>
                    the hoodie is super comfy. only thing is even though i like over sized and knew this would be
                    oversized i would still suggest sizing down.
                  </Typography>
                  <Stack direction={'row'} alignItems={'center'} mt={2}>
                    <IconButton size="small">
                      <ThumbUpOffAlt fontSize={'small'} />
                      {/* <ThumbUpAlt fontSize={'small'}/> */}
                    </IconButton>
                    <Typography>Helpful</Typography>
                  </Stack>
                </Grid>
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
                  <Typography color={'error'}>Report product</Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Box>
              <Typography variant="h6">{product.title}</Typography>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Rating size="small" value={5} readOnly />
                <div
                  onClick={() => {
                    setOpenRatingsDialog(true);
                  }}
                >
                  <Link color="#000" fontSize={14}>
                    4.6K ratings
                  </Link>
                </div>
              </Stack>
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
            <Box mt={2}>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Typography variant="h6">{`US$${currentProductVariant.price}`}</Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} gap={1} mt={2}>
                <LocalShipping fontSize={'small'} />
                {currentProductVariant.requires_shipping ? (
                  <Typography>Shipping calculated at checkout</Typography>
                ) : (
                  <Typography>Shipping for free</Typography>
                )}
              </Stack>
              <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
                <BorderColor fontSize={'small'} />
                {currentProductVariant.taxable ? (
                  <Typography>Product already include tax</Typography>
                ) : (
                  <Typography>Product do not include tax</Typography>
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
                </Box>
              ))}
          </Box>

          {product?.product_status === 1 && isSelectOption && (
            <>
              {currentProductVariant && currentProductVariant?.inventory_quantity > 0 ? (
                <>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2} gap={2}>
                    <Typography>Quantity</Typography>
                    <Input
                      fullWidth
                      startAdornment={
                        <IconButton
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
            {product?.body_html && <Box mt={1} dangerouslySetInnerHTML={{ __html: product?.body_html }}></Box>}
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
            <Typography variant="h6">Recommend more</Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Box>

          <Box mt={2}>
            <RecentViewCard />
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
                PRODUCT_TAB_DATAS.map((item, index) => <Tab key={index} label={item.title} {...a11yProps(item.id)} />)}
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
            <ProductVariant product_id={product?.product_id} options={product?.options} />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            <ProductRating />
          </CustomTabPanel>
        </Box>
      )}

      <ProductRatingsDialog openDialog={openRatingsDialog} setOpenDialog={setOpenRatingsDialog} />
      <RefundPolicyDialog openDialog={openRefundPolicy} setOpenDialog={setOpenRefundPolicy} />
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
