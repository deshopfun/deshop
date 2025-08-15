import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { PRODUCT_TYPE } from 'packages/constants';
import { useEffect, useState } from 'react';
import { GetImgSrcByProductType } from 'utils/image';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useSnackPresistStore } from 'lib';
import { useRouter } from 'next/router';

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
  variants: ProductVariant[];
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
  image: string;
  price: string;
  option: string;
  inventory_quantity: number;
};

const Explore = () => {
  const router = useRouter();
  const { type } = router.query;

  const [open, setOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType[]>();
  const [currentProductType, setCurrentProductType] = useState<string>(PRODUCT_TYPE.WOMEN);

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const init = async (productType: string) => {
    try {
      const response: any = await axios.get(Http.product_list, {
        params: {
          product_type: productType,
        },
      });

      if (response.result) {
        setProduct(response.data);
      } else {
        setProduct([]);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    if (type && Object.entries(PRODUCT_TYPE).find((item) => item[0] === type)?.[1]) {
      setCurrentProductType(String(Object.entries(PRODUCT_TYPE).find((item) => item[0] === type)?.[1]));
      init(String(Object.entries(PRODUCT_TYPE).find((item) => item[0] === type)?.[1]));
    } else {
      init(PRODUCT_TYPE.WOMEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <Container>
      <Grid container spacing={2}>
        {PRODUCT_TYPE &&
          Object.entries(PRODUCT_TYPE).map((item, index) => (
            <Grid size={{ xs: 12, md: 2 }} key={index} display={index > 7 && !open ? 'none' : ''}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    setCurrentProductType(item[1]);
                    init(item[1]);
                  }}
                >
                  <CardMedia component="img" height="140" image={GetImgSrcByProductType(item[1])} alt="image" />
                  <CardContent>
                    <Typography textAlign={'center'}>{item[1]}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Box textAlign={'center'} mt={2}>
        {open ? (
          <Button
            variant={'contained'}
            onClick={() => {
              setOpen(false);
            }}
          >
            Less
          </Button>
        ) : (
          <Button
            variant={'contained'}
            onClick={() => {
              setOpen(true);
            }}
          >
            More
          </Button>
        )}
      </Box>

      <Box mt={2}>
        <Typography variant="h6">{currentProductType}</Typography>
        <Box mt={2}>
          {product && product.length > 0 ? (
            <Grid container spacing={2}>
              {product.map((item, index) => (
                <Grid size={{ xs: 12, md: 2 }} key={index}>
                  <div
                    onClick={() => {
                      window.location.href = `/products/${item.product_id}`;
                    }}
                  >
                    <Card>
                      <CardActionArea>
                        <CardMedia component="img" width={100} height={150} image={item.images[0].src} alt="image" />
                        <CardContent>
                          <Typography fontWeight={'bold'}>{item.title}</Typography>
                          {item.variants && item.variants.length > 0 && (
                            <Box>
                              <Typography>{item.variants[0].option}</Typography>
                              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
                                <Typography
                                  color={'error'}
                                  fontWeight={'bold'}
                                >{`US$${item.variants[0].price}`}</Typography>
                                <Typography>{`RM:${item.variants[0].inventory_quantity}`}</Typography>
                              </Stack>
                            </Box>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card>
              <CardContent>
                <Box py={2} textAlign={'center'}>
                  <Typography variant="h6">{currentProductType} type is empty</Typography>
                  <Typography mt={2}>More products will be displayed here in the future.</Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Explore;
