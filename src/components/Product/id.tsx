import { useSnackPresistStore, useUserPresistStore } from 'lib';
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

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<ProductType>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openRatingsDialog, setOpenRatingsDialog] = useState<boolean>(false);
  const [openRefundPolicy, setOpenRefundPolicy] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);

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

  const init = async (id: any) => {
    try {
      if (!id || id === 0) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect product id');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.get(Http.product_by_id, {
        params: {
          product_id: id,
        },
      });

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

  useEffect(() => {
    if (id) {
      init(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
              <Typography variant="h6">Pastel Hoodie</Typography>
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
              <>
                {getUuid() === product.user_uuid && (
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
              </>
            )}
          </Stack>

          <Stack direction={'row'} alignItems={'center'} mt={2} gap={1}>
            <LocalShipping />
            <Typography>Shipping calculated at checkout</Typography>
          </Stack>

          <Box mt={2}>
            {product?.options &&
              product.options.length > 0 &&
              product.options.map((item, index) => (
                <Box key={index}>
                  <Stack direction={'row'} alignItems={'center'} gap={2}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography>Bubblegum</Typography>
                  </Stack>

                  <Box pt={1} pb={2}>
                    <Grid container spacing={10}>
                      {item.value &&
                        item.value.split(',').length > 0 &&
                        item.value.split(',').map((innerItem, innerIndex) => (
                          <Grid size={{ xs: 2, md: 2 }} key={innerIndex}>
                            <Button size="small" variant={'contained'} color={'inherit'}>
                              {innerItem}
                            </Button>
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                  <Divider />
                </Box>
              ))}
          </Box>

          {product?.product_status === 1 && (
            <>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                <Typography>Quantity</Typography>
                <Box width={100}>
                  <Input
                    startAdornment={
                      <IconButton>
                        <Remove />
                      </IconButton>
                    }
                    endAdornment={
                      <IconButton>
                        <Add />
                      </IconButton>
                    }
                    value={0}
                  />
                </Box>
              </Stack>

              <Box mt={4}>
                <Button variant={'contained'} fullWidth>
                  Add to cart
                </Button>
                <Button variant={'contained'} fullWidth style={{ background: '#000', marginTop: 10 }}>
                  Buy now
                </Button>
              </Box>
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
            <ProductVariant />
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
