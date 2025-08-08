import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import ExploreCard from 'components/Card/ExploreCard';
import { PRODUCT_TYPE } from 'packages/constants';
import { useState } from 'react';
import { GetImgSrcByProductType } from 'utils/image';

const Explore = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container>
      <Grid container spacing={2}>
        {PRODUCT_TYPE &&
          Object.entries(PRODUCT_TYPE).map((item, index) => (
            <Grid size={{ xs: 12, md: 2 }} key={index} display={index > 7 && !open ? 'none' : ''}>
              <Card>
                <CardActionArea>
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
    </Container>
  );
};

export default Explore;
