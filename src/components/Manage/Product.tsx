import { ChevronRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Stack,
  Step,
  StepButton,
  Stepper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import BlockchainDialog from 'components/Dialog/BlockchainDialog';
import ConfirmOrderDialog from 'components/Dialog/ConfirmOrderDialog';
import ConfirmPaymentDialog from 'components/Dialog/ConfirmPaymentDialog';
import ConfirmShippingDialog from 'components/Dialog/ConfirmShippingDialog';
import OrderDetailsDialog from 'components/Dialog/OrderDetailsDialog';
import OrderRatingDialog from 'components/Dialog/OrderRatingDialog';
import PostOrderRateDialog from 'components/Dialog/PostOrderRateDialog';
import ShippingDialog from 'components/Dialog/ShippingDialog';
import { useSnackPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { OrderStatusText } from 'utils/strings';

type ProductType = {
  product_id: number;
  title: string;
  body_html: string;
  product_type: string;
  tags: string;
  vendor: string;
  currency: string;
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

const ManageProduct = () => {
  const [products, setProducts] = useState<ProductType[]>();

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async () => {
    try {
      const response: any = await axios.get(Http.product);

      if (response.result) {
        setProducts(response.data);
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

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Typography variant="h6">All products</Typography>

      <Box mt={2}>
        {products && products.length > 0 ? (
          <Grid container spacing={2}>
            {products.map((item, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
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
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1}>
                          <Stack direction={'row'} alignItems={'center'} gap={1}>
                            <Typography variant="h6">{item.title}</Typography>
                            <Chip label={item.product_type} color="primary" size="small" />
                          </Stack>
                          <Typography>{item.product_type}</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
                          {item.tags &&
                            item.tags.split(',').map((item, index) => <Chip size="small" label={item} key={index} />)}
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} mt={1} gap={1} justifyContent={'right'}>
                          {item.product_status === 1 && <Chip label={'Active'} color={'success'} size="small" />}
                          {item.product_status === 2 && <Chip label={'Archived'} size="small" />}
                          {item.product_status === 3 && <Chip label={'Draft'} color={'warning'} size="small" />}
                        </Stack>
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
                <Typography variant="h6">Your product is empty</Typography>
                <Typography mt={2}>When there is a new product, it will be displayed here.</Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default ManageProduct;
