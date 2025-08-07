import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

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

const NowTrendingCard = () => {
  const [product, setProduct] = useState<ProductType[]>();

  const init = async () => {
    try {
      const response: any = await axios.get(Http.product_list, {});

      if (response.result) {
        setProduct(response.data);
      } else {
        setProduct([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      {product &&
        product.length > 0 &&
        product.map((item, index) => (
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
                          <Typography color={'error'} fontWeight={'bold'}>{`US$${item.variants[0].price}`}</Typography>
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
  );
};

export default NowTrendingCard;
