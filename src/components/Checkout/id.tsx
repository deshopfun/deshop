import { CartType, useCartPresistStore, useSnackPresistStore, useUserPresistStore } from 'lib';
import { useRouter } from 'next/router';
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Radio,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useEffect, useState } from 'react';
import {
  Adjust,
  Album,
  ConfirmationNumber,
  LocalMall,
  LocalShipping,
  LocationOnOutlined,
  Lock,
} from '@mui/icons-material';
import { COUNTRYPROVINCES } from 'packages/constants/countryState';
import { SHIPPING_TYPE } from 'packages/constants';

type AddressType = {
  address_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  company: string;
  country: string;
  country_code: string;
  country_name: string;
  city: string;
  province: string;
  province_code: string;
  address_one: string;
  address_two: string;
  zip: string;
  is_default: number;
};

type ProductItem = {
  product_id: number;
  option: string;
  quantity: number;
};

const CheckoutDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [cartList, setCartList] = useState<CartType>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [addressOne, setAddressOne] = useState<string>('');
  const [addressTwo, setAddressTwo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [sellerAddresses, setSellerAddresses] = useState<AddressType[]>([]);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [subTotal, setSubTotal] = useState<string>('0');
  const [shipping, setShipping] = useState<string>('0');
  const [discount, setDiscount] = useState<string>('0');
  const [total, setTotal] = useState<string>('0');

  const [ship, setShip] = useState<boolean>(true);
  const [selectDeliveryAddress, setSelectDeliveryAddress] = useState<number>(0);
  const [selectPickupAddress, setSelectPickupAddress] = useState<number>(0);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getUuid } = useUserPresistStore((state) => state);
  const { getCart, setCart } = useCartPresistStore((state) => state);

  const getAddress = async () => {
    try {
      if (!getUuid()) return;

      const response: any = await axios.get(Http.address);

      if (response.result) {
        setAddresses(response.data);
      } else {
        setAddresses([]);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  const getSellerAddress = async (uuid: string) => {
    try {
      if (!getUuid() || !uuid) return;

      const response: any = await axios.get(Http.address_by_uuid, {
        params: {
          uuid: uuid,
        },
      });

      if (response.result) {
        setSellerAddresses(response.data);
      } else {
        setSellerAddresses([]);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  const init = async (uuid: any) => {
    await getSellerAddress(uuid);
    await getAddress();
  };

  useEffect(() => {
    if (id) {
      const cart = getCart();
      const cartItem = cart.find((item) => item.uuid === id);
      if (cartItem) {
        setCartList(cartItem);
        init(id);

        const total = cartItem.variant.reduce((total, item) => {
          const price = parseFloat(item.price) || 0;
          return total + price * item.quantity;
        }, 0);
        setSubTotal(String(total));
        setShipping('0');
        setDiscount('0');
        setTotal(String(total));
      } else {
        setSnackSeverity('error');
        setSnackMessage('Something wrong');
        setSnackOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onClickPayNow = async () => {
    try {
      let items: ProductItem[] = [];
      cartList?.variant.forEach((item) => {
        items.push({
          product_id: item.productId,
          option: item.option,
          quantity: item.quantity,
        });
      });

      if (!items || items.length <= 0) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect item of product');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.post(Http.order, {
        seller_uuid: id,
        items: items,
        currency: 'USD',
        landing_site: window.location.origin,
        shipping_type: ship ? SHIPPING_TYPE.DELIVERY : SHIPPING_TYPE.PICKUP,
        shipping_address_id: ship ? selectDeliveryAddress : selectPickupAddress,
      });

      if (response.result) {
        if (response.data.order_id) {
          const cart = getCart();
          setCart(cart.filter((cartItem) => cartItem.uuid !== id));
          window.location.href = `/payment/${response.data.order_id}`;
        }
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message);
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  return (
    <Container>
      <Grid container spacing={8} mt={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5">Checkout</Typography>
          <Box mt={4}>
            <Typography variant="h6">Shipping Information</Typography>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} mt={3}>
              <Button
                startIcon={<Album />}
                variant={ship ? 'contained' : 'outlined'}
                size="large"
                fullWidth
                onClick={() => {
                  setShip(true);
                }}
              >
                <LocalShipping />
                <Typography pl={1}>Delivery</Typography>
              </Button>
              <Button
                startIcon={<Adjust />}
                variant={ship ? 'outlined' : 'contained'}
                size="large"
                fullWidth
                onClick={() => {
                  setShip(false);
                }}
              >
                <LocalMall />
                <Typography pl={1}>Pick up</Typography>
              </Button>
            </Stack>
            {ship ? (
              <Box mt={3}>
                {addresses &&
                  addresses.length > 0 &&
                  addresses.map((item, index) => (
                    <Box key={index} mb={2}>
                      <Card>
                        <CardContent>
                          <Stack direction={'row'} alignItems={'start'} gap={1}>
                            <Radio
                              checked={selectDeliveryAddress === item.address_id ? true : false}
                              onClick={() => {
                                setSelectDeliveryAddress(item.address_id);
                              }}
                            />
                            <Box>
                              <Typography
                                fontWeight={'bold'}
                              >{`${item.first_name} ${item.last_name} , ${item.phone}`}</Typography>
                              <Typography>{`${item.country} ${item.province} ${item.address_one}`}</Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                <Box mb={2}>
                  <Card>
                    <CardContent>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Radio
                          checked={selectDeliveryAddress === 0 ? true : false}
                          onClick={() => {
                            setSelectDeliveryAddress(0);
                          }}
                        />
                        <Typography fontWeight={'bold'}>Add new </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
                {selectDeliveryAddress === 0 && (
                  <>
                    <Stack direction={'row'} alignItems={'center'} gap={2} mt={4}>
                      <Box width={'100%'}>
                        <Typography mb={1}>First name</Typography>
                        <TextField
                          hiddenLabel
                          size="small"
                          fullWidth
                          value={firstName}
                          onChange={(e: any) => {
                            setFirstName(e.target.value);
                          }}
                          placeholder="Enter first name"
                        />
                      </Box>
                      <Box width={'100%'}>
                        <Typography mb={1}>Last name</Typography>
                        <TextField
                          hiddenLabel
                          size="small"
                          fullWidth
                          value={lastName}
                          onChange={(e: any) => {
                            setLastName(e.target.value);
                          }}
                          placeholder="Enter last name"
                        />
                      </Box>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} gap={2} mt={3}>
                      <Box width={'100%'}>
                        <Typography mb={1}>Email address</Typography>
                        <TextField
                          hiddenLabel
                          size="small"
                          fullWidth
                          value={email}
                          onChange={(e: any) => {
                            setEmail(e.target.value);
                          }}
                          placeholder="Enter email address"
                        />
                      </Box>
                      <Box width={'100%'}>
                        <Typography mb={1}>Company</Typography>
                        <TextField
                          hiddenLabel
                          size="small"
                          fullWidth
                          value={company}
                          onChange={(e: any) => {
                            setCompany(e.target.value);
                          }}
                          placeholder="Enter company"
                        />
                      </Box>
                    </Stack>
                    <Box mt={3}>
                      <Typography mb={1}>Phone number</Typography>
                      <TextField
                        hiddenLabel
                        size="small"
                        fullWidth
                        value={phone}
                        onChange={(e: any) => {
                          setPhone(e.target.value);
                        }}
                        placeholder="Enter phone number"
                      />
                    </Box>
                    <Box mt={3}>
                      <Typography mb={1}>Address line 1</Typography>
                      <TextField
                        hiddenLabel
                        size="small"
                        fullWidth
                        value={addressOne}
                        onChange={(e: any) => {
                          setAddressOne(e.target.value);
                        }}
                        placeholder="Enter address"
                      />
                    </Box>
                    <Box mt={3}>
                      <Typography mb={1}>Address line 2</Typography>
                      <TextField
                        hiddenLabel
                        size="small"
                        fullWidth
                        value={addressTwo}
                        onChange={(e: any) => {
                          setAddressTwo(e.target.value);
                        }}
                        placeholder="Enter address"
                      />
                    </Box>
                    <Box mt={3}>
                      <Typography mb={1}>Country/Region</Typography>
                      <FormControl hiddenLabel fullWidth>
                        <Select
                          displayEmpty
                          value={country}
                          onChange={(e: any) => {
                            setProvince('');
                            setCountry(e.target.value);
                          }}
                          size={'small'}
                          inputProps={{ 'aria-label': 'Without label' }}
                          renderValue={(selected: any) => {
                            if (selected.length === 0) {
                              return <em>Choose country</em>;
                            }

                            return selected;
                          }}
                        >
                          {COUNTRYPROVINCES &&
                            COUNTRYPROVINCES.map((item, index) => (
                              <MenuItem value={item.name} key={index}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Stack mt={3} direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                      <Box>
                        <Typography mb={1}>City</Typography>
                        <TextField
                          hiddenLabel
                          size="small"
                          fullWidth
                          value={city}
                          onChange={(e: any) => {
                            setCity(e.target.value);
                          }}
                          placeholder="Enter city"
                        />
                      </Box>
                      <Box>
                        <Typography mb={1}>State/Province</Typography>
                        <FormControl hiddenLabel fullWidth>
                          <Select
                            displayEmpty
                            value={province}
                            onChange={(e: any) => {
                              setProvince(e.target.value);
                            }}
                            size={'small'}
                            inputProps={{ 'aria-label': 'Without label' }}
                            renderValue={(selected: any) => {
                              if (selected.length === 0) {
                                return <em>Choose state</em>;
                              }

                              return selected;
                            }}
                          >
                            {country &&
                              COUNTRYPROVINCES &&
                              COUNTRYPROVINCES.find((item) => item.name === country)?.provinces.map((item, index) => (
                                <MenuItem value={item.name} key={index}>
                                  {item.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box>
                        <Typography mb={1}>ZIP/Postal code</Typography>
                        <TextField
                          hiddenLabel
                          size="small"
                          fullWidth
                          value={zip}
                          onChange={(e: any) => {
                            setZip(e.target.value);
                          }}
                          placeholder="Enter ZIP"
                        />
                      </Box>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} mt={3}>
                      <Checkbox defaultChecked size={'small'} />
                      <Typography>I have read and agree to te Terms and Conditions.</Typography>
                    </Stack>
                  </>
                )}
              </Box>
            ) : (
              <Box mt={3}>
                {sellerAddresses && sellerAddresses.length > 0 ? (
                  <>
                    {sellerAddresses.map((item, index) => (
                      <Box key={index} mb={2}>
                        <Card>
                          <CardContent>
                            <Stack direction={'row'} alignItems={'center'}>
                              <Radio
                                checked={selectPickupAddress === item.address_id ? true : false}
                                onClick={() => {
                                  setSelectPickupAddress(item.address_id);
                                }}
                              />
                              <Stack
                                direction={'row'}
                                alignItems={'center'}
                                justifyContent={'space-between'}
                                width={'100%'}
                              >
                                <Box>
                                  <Typography
                                    fontWeight={'bold'}
                                    pl={1}
                                  >{`${item.first_name} ${item.last_name} , ${item.phone}`}</Typography>
                                  <Stack direction={'row'} alignItems={'center'} mt={1} gap={1}>
                                    <LocationOnOutlined />
                                    <Typography>{`${item.country} ${item.province} ${item.address_one}`}</Typography>
                                  </Stack>
                                </Box>
                                <Typography variant="h6">FREE</Typography>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </>
                ) : (
                  <Card>
                    <CardContent>
                      <Box py={2} textAlign={'center'}>
                        <Typography variant="h6">Not support</Typography>
                        <Typography mt={2}>You can contact the seller to obtain a pick up address</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Box>
            )}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" mb={4}>
            Review your cart
          </Typography>
          {cartList &&
            cartList.variant.length > 0 &&
            cartList.variant.map((item, index) => (
              <Stack direction={'row'} mt={2} key={index}>
                <Badge badgeContent={item.quantity} color={'info'}>
                  <img src={item.image} alt={'image'} loading="lazy" width={100} height={100} />
                </Badge>
                <Box pl={4}>
                  <Typography fontWeight={'bold'}>{item.title}</Typography>
                  <Typography mt={1}>{`$${item.price}`}</Typography>
                  <Typography variant="h6" mt={2}>
                    $
                    {cartList.variant.reduce((total, item) => {
                      const price = parseFloat(item.price) || 0;
                      return total + price * item.quantity;
                    }, 0)}
                  </Typography>
                </Box>
              </Stack>
            ))}

          <Box mt={4}>
            <Input
              fullWidth
              startAdornment={
                <IconButton>
                  <ConfirmationNumber />
                </IconButton>
              }
              endAdornment={<Button>Apply</Button>}
              value={discountCode}
              placeholder="Discount code"
              onChange={(e) => {
                setDiscountCode(e.target.value);
              }}
            />
          </Box>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={4}>
            <Typography>Subtotal</Typography>
            <Typography fontWeight={'bold'}>{`$${subTotal}`}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Typography>Shipping</Typography>
            <Typography fontWeight={'bold'}>{`$${shipping}`}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Typography>Discount</Typography>
            <Typography fontWeight={'bold'}>{`$${discount}`}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Typography variant="h6">Total</Typography>
            <Typography fontWeight={'bold'}>{`$${total}`}</Typography>
          </Stack>

          <Box mt={4}>
            <Button
              variant={'contained'}
              color={'success'}
              size="large"
              fullWidth
              onClick={() => {
                onClickPayNow();
              }}
            >
              Pay Now
            </Button>
          </Box>

          <Stack direction={'row'} alignItems={'center'} gap={1} mt={4}>
            <Lock />
            <Typography fontWeight={'bold'}>Secure Checkout - SSL Encrypted</Typography>
          </Stack>
          <Typography mt={2}>
            Ensuring your financial and personal details are secure during every transaction.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutDetails;
