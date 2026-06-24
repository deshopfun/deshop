// import { useCartPresistStore } from 'lib';
// import { CURRENCYS } from 'packages/constants/currency';
// import { useEffect, useState } from 'react';

// const Cart = () => {
//   const [total, setTotal] = useState<string>('0');

//   const { getCart, setCart, resetCart } = useCartPresistStore((state) => state);

//   useEffect(() => {
//     if (getCart()) {
//       const cart = getCart();
//       if (cart.length > 0) {
//         const newTotal = cart.reduce((total, cartItem) => {
//           const cartItemTotal = cartItem.variant.reduce((itemTotal, variant) => {
//             const price = parseFloat(variant.price);
//             return Number((itemTotal + price * variant.quantity).toFixed(2));
//           }, 0);
//           return total + cartItemTotal;
//         }, 0);
//         setTotal(String(newTotal));
//       }
//     }
//   }, [getCart()]);

//   const onClickMove = (uuid: string, productId: number, option: string) => {
//     const cart = getCart();

//     setCart(
//       cart
//         .map((cartItem) =>
//           cartItem.uuid === uuid
//             ? {
//                 ...cartItem,
//                 variant: cartItem.variant.filter(
//                   (vItem) => !(vItem.productId === productId && vItem.option === option),
//                 ),
//               }
//             : cartItem,
//         )
//         .filter((cartItem) => cartItem.variant.length > 0),
//     );
//   };

//   const onClickSub = (uuid: string, productId: number, option: string) => {
//     const cart = getCart();

//     setCart(
//       cart
//         .map((cartItem) =>
//           cartItem.uuid === uuid
//             ? {
//                 ...cartItem,
//                 variant: cartItem.variant
//                   .map((vItem) =>
//                     vItem.productId === productId && vItem.option === option
//                       ? { ...vItem, quantity: vItem.quantity - 1 }
//                       : vItem,
//                   )
//                   .filter((vItem) => vItem.quantity > 0),
//               }
//             : cartItem,
//         )
//         .filter((cartItem) => cartItem.variant.length > 0),
//     );
//   };

//   const onClickAdd = (uuid: string, productId: number, option: string) => {
//     const cart = getCart();

//     setCart(
//       cart
//         .map((cartItem) =>
//           cartItem.uuid === uuid
//             ? {
//                 ...cartItem,
//                 variant: cartItem.variant.map((vItem) =>
//                   vItem.productId === productId && vItem.option === option
//                     ? { ...vItem, quantity: vItem.quantity + 1 }
//                     : vItem,
//                 ),
//               }
//             : cartItem,
//         )
//         .filter((cartItem) => cartItem.variant.length > 0),
//     );
//   };

//   return (
//     <Container>
//       {getCart() && getCart().length > 0 ? (
//         <Grid container spacing={8}>
//           <Grid size={{ xs: 12, md: 8 }}>
//             {getCart().map((item, index) => (
//               <Box key={index} mb={2}>
//                 <Card>
//                   <CardContent>
//                     <div
//                       onClick={() => {
//                         window.location.href = `/profile/${item.username}`;
//                       }}
//                     >
//                       <Stack direction={'row'} alignItems={'center'}>
//                         {item.avatarUrl ? (
//                           <img src={item.avatarUrl} alt={'image'} loading="lazy" width={40} height={40} />
//                         ) : (
//                           <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={40} height={40} />
//                         )}
//                         <Typography variant="h6" pl={1}>
//                           {item.username}
//                         </Typography>
//                       </Stack>
//                     </div>
//                     {item.variant.length > 0 &&
//                       item.variant.map((vitem, vindex) => (
//                         <Stack direction={'row'} my={4} key={vindex}>
//                           <img src={vitem.image} alt={'image'} loading="lazy" width={100} height={100} />
//                           <Box pl={2} width={'100%'}>
//                             <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                               <Box>
//                                 <div
//                                   onClick={() => {
//                                     window.location.href = `/products/${vitem.productId}`;
//                                   }}
//                                 >
//                                   <Typography variant="h6">{vitem.title}</Typography>
//                                 </div>
//                                 <Stack direction={'row'} alignItems={'center'}>
//                                   {vitem.option.split(',').map((optionItem, optionIndex) => (
//                                     <Stack direction={'row'} alignItems={'center'} key={optionIndex}>
//                                       <Typography>{optionItem}</Typography>
//                                       {optionIndex + 1 !== vitem.option.split(',').length && (
//                                         <Typography px={1}>/</Typography>
//                                       )}
//                                     </Stack>
//                                   ))}
//                                 </Stack>
//                               </Box>
//                               <Box>
//                                 <Typography fontWeight={'bold'}>{`${
//                                   CURRENCYS.find((c) => c.name === item.currency)?.code
//                                 }${vitem.price}`}</Typography>
//                               </Box>
//                             </Stack>

//                             <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
//                               <Box width={120}>
//                                 <Input
//                                   startAdornment={
//                                     <IconButton
//                                       onClick={() => {
//                                         onClickSub(item.uuid, vitem.productId, vitem.option);
//                                       }}
//                                     >
//                                       {/* <Remove /> */}
//                                     </IconButton>
//                                   }
//                                   endAdornment={
//                                     <IconButton
//                                       onClick={() => {
//                                         onClickAdd(item.uuid, vitem.productId, vitem.option);
//                                       }}
//                                     >
//                                       {/* <Add /> */}
//                                     </IconButton>
//                                   }
//                                   value={vitem.quantity}
//                                 />
//                               </Box>
//                               <Button
//                                 size="small"
//                                 // startIcon={<FavoriteBorder />}
//                                 variant={'contained'}
//                                 color="error"
//                                 onClick={() => {
//                                   onClickMove(item.uuid, vitem.productId, vitem.option);
//                                 }}
//                               >
//                                 Move to saved
//                               </Button>
//                             </Stack>
//                           </Box>
//                         </Stack>
//                       ))}
//                     <Box textAlign={'right'} mt={6}>
//                       <Typography fontWeight={'bold'} mb={1}>
//                         {`Total: ${CURRENCYS.find((c) => c.name === item.currency)?.code}${item.variant.reduce(
//                           (itemTotal, variant) => {
//                             const price = parseFloat(variant.price);
//                             return Number((itemTotal + price * variant.quantity).toFixed(2));
//                           },
//                           0,
//                         )}`}
//                       </Typography>
//                       <Button
//                         variant={'contained'}
//                         color="success"
//                         onClick={() => {
//                           window.location.href = `/checkout/${item.uuid}`;
//                         }}
//                       >
//                         Continue to checkout
//                       </Button>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Box>
//             ))}
//           </Grid>
//           <Grid size={{ xs: 12, md: 4 }}>
//             <Card>
//               <CardContent>
//                 <Button
//                   fullWidth
//                   variant={'contained'}
//                   color={'error'}
//                   onClick={() => {
//                     resetCart();
//                   }}
//                 >
//                   Clear Cart
//                 </Button>
//                 <Typography mt={2} textAlign={'center'} fontWeight={'bold'}>
//                   Tax & tip & discounts
//                 </Typography>
//                 <Typography textAlign={'center'}>calculated at checkout page</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       ) : (
//         <Card>
//           <CardContent>
//             <Box py={2} textAlign={'center'}>
//               <Typography variant="h6">Your cart is empty</Typography>
//               <Typography mt={2}>Add products while you shop, so they'll be ready for checkout later.</Typography>
//             </Box>
//           </CardContent>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default Cart;

import { useCartPresistStore } from 'lib';
import { CURRENCYS } from 'packages/constants/currency';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import { Plus, Minus, Trash2, ShoppingCart, User } from 'lucide-react';

const Cart = () => {
  const [total, setTotal] = useState('0');

  const { getCart, setCart, resetCart } = useCartPresistStore((state) => state);

  // 计算总价
  useEffect(() => {
    const cart = getCart();
    if (!cart || cart.length === 0) {
      setTotal('0');
      return;
    }

    const newTotal = cart.reduce((acc, cartItem) => {
      const itemTotal = cartItem.variant.reduce((itemAcc, variant) => {
        const price = parseFloat(variant.price || '0');
        return Number((itemAcc + price * variant.quantity).toFixed(2));
      }, 0);
      return acc + itemTotal;
    }, 0);

    setTotal(String(newTotal));
  }, [getCart]);

  const onClickMove = (uuid: string, productId: number, option: string) => {
    const cart = getCart();
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.uuid === uuid
          ? {
              ...cartItem,
              variant: cartItem.variant.filter((v) => !(v.productId === productId && v.option === option)),
            }
          : cartItem,
      )
      .filter((cartItem) => cartItem.variant.length > 0);

    setCart(updatedCart);
  };

  const onClickSub = (uuid: string, productId: number, option: string) => {
    const cart = getCart();
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.uuid === uuid
          ? {
              ...cartItem,
              variant: cartItem.variant
                .map((v) =>
                  v.productId === productId && v.option === option
                    ? { ...v, quantity: Math.max(1, v.quantity - 1) }
                    : v,
                )
                .filter((v) => v.quantity > 0),
            }
          : cartItem,
      )
      .filter((cartItem) => cartItem.variant.length > 0);

    setCart(updatedCart);
  };

  const onClickAdd = (uuid: string, productId: number, option: string) => {
    const cart = getCart();
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.uuid === uuid
          ? {
              ...cartItem,
              variant: cartItem.variant.map((v) =>
                v.productId === productId && v.option === option ? { ...v, quantity: v.quantity + 1 } : v,
              ),
            }
          : cartItem,
      )
      .filter((cartItem) => cartItem.variant.length > 0);

    setCart(updatedCart);
  };

  const cartItems = getCart() || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" />
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        </div>
        {cartItems.length > 0 && (
          <Button variant="destructive" onClick={resetCart}>
            Clear Cart
          </Button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted/50 pb-4">
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:underline"
                    onClick={() => (window.location.href = `/profile/${item.username}`)}
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={item.avatarUrl} />
                      <AvatarFallback>
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{item.username}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                  {item.variant.map((vitem, vindex) => (
                    <div key={vindex} className="flex gap-5">
                      {/* Product Image */}
                      <img
                        src={vitem.image}
                        alt={vitem.title}
                        className="w-24 h-24 object-cover rounded-lg border"
                        loading="lazy"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div
                            className="cursor-pointer hover:underline"
                            onClick={() => (window.location.href = `/products/${vitem.productId}`)}
                          >
                            <p className="font-semibold text-lg leading-tight">{vitem.title}</p>
                          </div>
                          <p className="font-bold text-lg">
                            {CURRENCYS.find((c) => c.name === item.currency)?.code}
                            {vitem.price}
                          </p>
                        </div>

                        {/* Options */}
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {vitem.option.split(',').map((opt, i) => (
                            <Badge key={i} variant="secondary">
                              {opt.trim()}
                            </Badge>
                          ))}
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onClickSub(item.uuid, vitem.productId, vitem.option)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>

                            <Input className="w-16 text-center" value={vitem.quantity} readOnly />

                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onClickAdd(item.uuid, vitem.productId, vitem.option)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => onClickMove(item.uuid, vitem.productId, vitem.option)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  {/* Seller Subtotal */}
                  <div className="flex justify-end">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Subtotal</p>
                      <p className="text-xl font-bold">
                        {CURRENCYS.find((c) => c.name === item.currency)?.code}
                        {item.variant.reduce((sum, v) => {
                          const price = parseFloat(v.price || '0');
                          return Number((sum + price * v.quantity).toFixed(2));
                        }, 0)}
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => (window.location.href = `/checkout/${item.uuid}`)}
                  >
                    Continue to Checkout
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span className="font-bold">
                    {CURRENCYS.find((c) => c.name === (getCart()[0]?.currency || ''))?.code}
                    {total}
                  </span>
                </div>

                <Separator />

                <p className="text-sm text-muted-foreground text-center">
                  Tax, shipping, and discounts will be calculated at checkout.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="py-20">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-20 h-20 text-muted-foreground mb-6" />
            <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground max-w-sm">
              Add products while you shop, so they&apos;ll be ready for checkout later.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Cart;
