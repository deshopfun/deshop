import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const RecentViewCard = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={2}>
        <Card>
          <CardActionArea>
            <CardMedia component="img" height="140" image="/images/test.png" alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid size={2}>
        <Card>
          <CardActionArea>
            <CardMedia component="img" height="140" image="/images/test.png" alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid size={2}>
        <Card>
          <CardActionArea>
            <CardMedia component="img" height="140" image="/images/test.png" alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid size={2}>
        <Card>
          <CardActionArea>
            <CardMedia component="img" height="140" image="/images/test.png" alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid size={2}>
        <Card>
          <CardActionArea>
            <CardMedia component="img" height="140" image="/images/test.png" alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RecentViewCard;
