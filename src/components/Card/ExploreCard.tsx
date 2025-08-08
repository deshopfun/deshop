import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { PRODUCT_TYPE } from 'packages/constants';
import { GetImgSrcByProductType } from 'utils/image';

const ExploreCard = () => {
  return (
    <Grid container spacing={2}>
      {PRODUCT_TYPE &&
        Object.entries(PRODUCT_TYPE).map((item, index) => (
          <Grid size={{ xs: 12, md: 2 }} key={index}>
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
  );
};

export default ExploreCard;
