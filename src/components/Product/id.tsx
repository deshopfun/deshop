import { useSnackPresistStore } from 'lib';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
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

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import {
  Add,
  ChevronRight,
  FavoriteBorder,
  LocalShipping,
  MoreHoriz,
  Remove,
  Star,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import ExploreCard from 'components/Card/ExploreCard';
import RecentViewCard from 'components/Card/RecentViewCard';

type ProductType = {
  product_id: number;
  title: string;
  body_html: string;
  product_type: string;
  tags: string;
  vendor: string;
  product_status: number;
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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMore = Boolean(anchorEl);

  const handleClickMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

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

  return (
    <Container>
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
              <Link href="#" color="#000" fontSize={14}>
                4.6K ratings
              </Link>

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
                  <Rating
                    size="small"
                    value={5}
                    onChange={(event, newValue) => {
                      //   setValue(newValue);
                    }}
                  />
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
                  <Rating
                    size="small"
                    value={5}
                    onChange={(event, newValue) => {
                      //   setValue(newValue);
                    }}
                  />
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
                  <Rating
                    size="small"
                    value={5}
                    onChange={(event, newValue) => {
                      //   setValue(newValue);
                    }}
                  />
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
                <Button fullWidth variant={'contained'} color={'inherit'}>
                  Read more reviews
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={30} height={30} />
              <Typography fontWeight={'bold'}>Comfrt</Typography>
            </Stack>
            <IconButton onClick={handleClickMore}>
              <MoreHoriz />
            </IconButton>
            <Menu open={openMore} anchorEl={anchorEl} onClose={handleCloseMore}>
              <MenuItem>Contact me</MenuItem>
            </Menu>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Box>
              <Typography variant="h6">Pastel Hoodie</Typography>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Rating
                  size="small"
                  value={5}
                  onChange={(event, newValue) => {
                    //   setValue(newValue);
                  }}
                />
                <Link href="#" color="#000" fontSize={14}>
                  4.6K ratings
                </Link>
              </Stack>
            </Box>
            <IconButton>
              <FavoriteBorder />
            </IconButton>
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

          <Box mt={2} overflow={'auto'}>
            <Typography variant="h6">Description</Typography>
            {product?.body_html && <Box mt={1} dangerouslySetInnerHTML={{ __html: product?.body_html }}></Box>}
          </Box>

          <Box mt={2}>
            <Button fullWidth variant={'contained'} color={'inherit'}>
              More details at Comfrt
            </Button>
            <Box mt={1}>
              <Button fullWidth variant={'contained'} color={'inherit'}>
                Refund Policy
              </Button>
            </Box>
          </Box>

          <Box mt={4}>
            <img src={'/images/test.png'} alt={'image'} loading="lazy" width={'100%'} />
          </Box>
        </Grid>
      </Grid>

      <Box mt={10} mb={8}>
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
    </Container>
  );
};

export default ProductDetails;
