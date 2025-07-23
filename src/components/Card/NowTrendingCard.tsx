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
          <Grid size={{ xs: 12, md: 3 }} key={index}>
            <div
              onClick={() => {
                window.location.href = `/products/${item.product_id}`;
              }}
            >
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    width={item.images[0].width}
                    height={item.images[0].height}
                    image={item.images[0].src}
                    alt="image"
                  />
                  <CardContent>
                    {item.product_id}
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography variant="h6">{item.title}</Typography>
                      </Stack>
                    </Stack>
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
