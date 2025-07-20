import { Add, FavoriteBorder, Remove, Star } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Container, Grid, IconButton, Input, Stack, Typography } from '@mui/material';

const Cart = () => {
  return (
    <Container>
      <Grid container spacing={8}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Stack direction={'row'} alignItems={'center'}>
                <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={60} height={40} />
                <Box pl={1}>
                  <Typography variant="h6">Comfrt</Typography>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Typography>4.8</Typography>
                    <Star />
                    <Typography>(156k)</Typography>
                  </Stack>
                </Box>
              </Stack>
              <Stack direction={'row'} my={4}>
                <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={100} height={100} />
                <Box pl={2} width={'100%'}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                      <Typography>Pastel Hoodie</Typography>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography>Bubblegum</Typography>
                        <Typography>/</Typography>
                        <Typography>M</Typography>
                      </Stack>
                    </Box>
                    <Box>
                      <Typography>US$45.00</Typography>
                      <Typography>US$120.00</Typography>
                    </Box>
                  </Stack>

                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
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
                    <Button startIcon={<FavoriteBorder />}>Move to saved</Button>
                  </Stack>
                </Box>
              </Stack>
              <Stack direction={'row'} my={4}>
                <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={100} height={100} />
                <Box pl={2} width={'100%'}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                      <Typography>Pastel Hoodie</Typography>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography>Bubblegum</Typography>
                        <Typography>/</Typography>
                        <Typography>M</Typography>
                      </Stack>
                    </Box>
                    <Box>
                      <Typography>US$45.00</Typography>
                      <Typography>US$120.00</Typography>
                    </Box>
                  </Stack>

                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
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
                    <Button startIcon={<FavoriteBorder />}>Move to saved</Button>
                  </Stack>
                </Box>
              </Stack>
              <Stack direction={'row'} my={4}>
                <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={100} height={100} />
                <Box pl={2} width={'100%'}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                      <Typography>Pastel Hoodie</Typography>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography>Bubblegum</Typography>
                        <Typography>/</Typography>
                        <Typography>M</Typography>
                      </Stack>
                    </Box>
                    <Box>
                      <Typography>US$45.00</Typography>
                      <Typography>US$120.00</Typography>
                    </Box>
                  </Stack>

                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
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
                    <Button startIcon={<FavoriteBorder />}>Move to saved</Button>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mb={2}>
                <Typography>Subtotal</Typography>
                <Typography fontWeight={'bold'}>US$90.00</Typography>
              </Stack>
              <Button
                variant={'contained'}
                size="large"
                color="success"
                fullWidth
                onClick={() => {
                  window.location.href = '/checkout/123456';
                }}
              >
                Continue to checkout
              </Button>
              <Typography mt={2} textAlign={'center'}>
                Taxes & shipping calculated at checkout
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
