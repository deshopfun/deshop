import { Add, FavoriteBorder, Remove, Star } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Container, Grid, IconButton, Input, Stack, Typography } from '@mui/material';
import { useCartPresistStore } from 'lib';
import { CURRENCYS } from 'packages/constants/currency';
import { useEffect, useState } from 'react';

const Cart = () => {
  const [total, setTotal] = useState<string>('0');

  const { getCart, setCart, resetCart } = useCartPresistStore((state) => state);

  useEffect(() => {
    if (getCart()) {
      const cart = getCart();
      if (cart.length > 0) {
        const newTotal = cart.reduce((total, cartItem) => {
          const cartItemTotal = cartItem.variant.reduce((itemTotal, variant) => {
            const price = parseFloat(variant.price) || 0;
            return itemTotal + price * variant.quantity;
          }, 0);
          return total + cartItemTotal;
        }, 0);
        setTotal(String(newTotal));
      }
    }
  }, [getCart()]);

  const onClickMove = (uuid: string, productId: number, option: string) => {
    const cart = getCart();

    setCart(
      cart
        .map((cartItem) =>
          cartItem.uuid === uuid
            ? {
                ...cartItem,
                variant: cartItem.variant.filter(
                  (vItem) => !(vItem.productId === productId && vItem.option === option),
                ),
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.variant.length > 0),
    );
  };

  const onClickSub = (uuid: string, productId: number, option: string) => {
    const cart = getCart();

    setCart(
      cart
        .map((cartItem) =>
          cartItem.uuid === uuid
            ? {
                ...cartItem,
                variant: cartItem.variant
                  .map((vItem) =>
                    vItem.productId === productId && vItem.option === option
                      ? { ...vItem, quantity: vItem.quantity - 1 }
                      : vItem,
                  )
                  .filter((vItem) => vItem.quantity > 0),
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.variant.length > 0),
    );
  };

  const onClickAdd = (uuid: string, productId: number, option: string) => {
    const cart = getCart();

    setCart(
      cart
        .map((cartItem) =>
          cartItem.uuid === uuid
            ? {
                ...cartItem,
                variant: cartItem.variant.map((vItem) =>
                  vItem.productId === productId && vItem.option === option
                    ? { ...vItem, quantity: vItem.quantity + 1 }
                    : vItem,
                ),
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.variant.length > 0),
    );
  };

  return (
    <Container>
      {getCart() && getCart().length > 0 ? (
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 8 }}>
            {getCart().map((item, index) => (
              <Box key={index} mb={2}>
                <Card>
                  <CardContent>
                    <div
                      onClick={() => {
                        window.location.href = `/profile/${item.username}`;
                      }}
                    >
                      <Stack direction={'row'} alignItems={'center'}>
                        {item.avatarUrl ? (
                          <img src={item.avatarUrl} alt={'image'} loading="lazy" width={40} height={40} />
                        ) : (
                          <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={40} height={40} />
                        )}
                        <Typography variant="h6" pl={1}>
                          {item.username}
                        </Typography>
                      </Stack>
                    </div>
                    {item.variant.length > 0 &&
                      item.variant.map((vitem, vindex) => (
                        <Stack direction={'row'} my={4} key={vindex}>
                          <img src={vitem.image} alt={'image'} loading="lazy" width={100} height={100} />
                          <Box pl={2} width={'100%'}>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                              <Box>
                                <div
                                  onClick={() => {
                                    window.location.href = `/products/${vitem.productId}`;
                                  }}
                                >
                                  <Typography variant="h6">{vitem.title}</Typography>
                                </div>
                                <Stack direction={'row'} alignItems={'center'}>
                                  {vitem.option.split(',').map((optionItem, optionIndex) => (
                                    <Stack direction={'row'} alignItems={'center'} key={optionIndex}>
                                      <Typography>{optionItem}</Typography>
                                      {optionIndex + 1 !== vitem.option.split(',').length && (
                                        <Typography px={1}>/</Typography>
                                      )}
                                    </Stack>
                                  ))}
                                </Stack>
                              </Box>
                              <Box>
                                <Typography fontWeight={'bold'}>{`${
                                  CURRENCYS.find((c) => c.name === item.currency)?.code
                                }${vitem.price}`}</Typography>
                              </Box>
                            </Stack>

                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                              <Box width={120}>
                                <Input
                                  startAdornment={
                                    <IconButton
                                      onClick={() => {
                                        onClickSub(item.uuid, vitem.productId, vitem.option);
                                      }}
                                    >
                                      <Remove />
                                    </IconButton>
                                  }
                                  endAdornment={
                                    <IconButton
                                      onClick={() => {
                                        onClickAdd(item.uuid, vitem.productId, vitem.option);
                                      }}
                                    >
                                      <Add />
                                    </IconButton>
                                  }
                                  value={vitem.quantity}
                                />
                              </Box>
                              <Button
                                size="small"
                                startIcon={<FavoriteBorder />}
                                variant={'contained'}
                                color="error"
                                onClick={() => {
                                  onClickMove(item.uuid, vitem.productId, vitem.option);
                                }}
                              >
                                Move to saved
                              </Button>
                            </Stack>
                          </Box>
                        </Stack>
                      ))}
                    <Box textAlign={'right'} mt={6}>
                      <Typography fontWeight={'bold'} mb={1}>
                        {`Total: ${CURRENCYS.find((c) => c.name === item.currency)?.code}${item.variant.reduce(
                          (itemTotal, variant) => {
                            const price = parseFloat(variant.price) || 0;
                            return itemTotal + price * variant.quantity;
                          },
                          0,
                        )}`}
                      </Typography>
                      <Button
                        variant={'contained'}
                        color="success"
                        onClick={() => {
                          window.location.href = `/checkout/${item.uuid}`;
                        }}
                      >
                        Continue to checkout
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Button
                  fullWidth
                  variant={'contained'}
                  color={'error'}
                  onClick={() => {
                    resetCart();
                  }}
                >
                  Clear Cart
                </Button>
                <Typography mt={2} textAlign={'center'} fontWeight={'bold'}>
                  Shipping & tax & tip & discounts & weight
                </Typography>
                <Typography textAlign={'center'}>calculated at checkout page</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Card>
          <CardContent>
            <Box py={2} textAlign={'center'}>
              <Typography variant="h6">Your cart is empty</Typography>
              <Typography mt={2}>Add products while you shop, so they'll be ready for checkout later.</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Cart;
