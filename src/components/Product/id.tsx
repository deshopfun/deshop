import { useSnackPresistStore } from 'lib';
import { useRouter } from 'next/router';
import { Avatar, Box, Button, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useEffect, useState } from 'react';

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
        <Grid size={{ xs: 12, md: 8 }}></Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6">Who to follow</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
