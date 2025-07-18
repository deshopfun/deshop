import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';

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

type Props = {
  product: ProductType[];
};

const ProfileProduct = (props: Props) => {
  return (
    <Box>
      <Typography>All products</Typography>

      <Box mt={2}>
        {props.product.length > 0 ? (
          <Grid container spacing={2}>
            {props.product.map((item, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
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
                            <Chip label={item.product_type} color="primary" size="small" />
                          </Stack>
                          <Typography>{item.product_type}</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
                          {item.tags &&
                            item.tags.split(',').map((item, index) => <Chip size="small" label={item} key={index} />)}
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} mt={1} gap={1} justifyContent={'right'}>
                          <Typography fontWeight={'bold'}>Status:</Typography>
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
          <Box>Not found</Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileProduct;
