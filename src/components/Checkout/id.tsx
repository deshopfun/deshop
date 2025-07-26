import { useSnackPresistStore } from 'lib';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useEffect, useState } from 'react';
import { Adjust, Album, ConfirmationNumber, LocalMall, LocalShipping, Lock } from '@mui/icons-material';

const CheckoutDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const init = async (id: any) => {};

  useEffect(() => {
    if (id) {
      init(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Container>
      <Grid container spacing={8} mt={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5">Checkout</Typography>
          <Box mt={4}>
            <Typography variant="h6">Shipping Information</Typography>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} mt={3}>
              <Button startIcon={<Album />} variant={'contained'} size="large" fullWidth>
                <LocalShipping />
                <Typography pl={1}>Delivery</Typography>
              </Button>
              <Button startIcon={<Adjust />} variant={'outlined'} size="large" fullWidth>
                <LocalMall />
                <Typography pl={1}>Pick up</Typography>
              </Button>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={2} mt={3}>
              <Box width={'100%'}>
                <Typography mb={1}>First name</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  value={''}
                  onChange={(e) => {}}
                  placeholder="Enter first name"
                />
              </Box>
              <Box width={'100%'}>
                <Typography mb={1}>Last name</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  value={''}
                  onChange={(e) => {}}
                  placeholder="Enter last name"
                />
              </Box>
            </Stack>

            <Box mt={3}>
              <Typography mb={1}>Email address</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                value={''}
                onChange={(e) => {}}
                placeholder="Enter email address"
              />
            </Box>
            <Box mt={3}>
              <Typography mb={1}>Phone number</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                value={''}
                onChange={(e) => {}}
                placeholder="Enter phone number"
              />
            </Box>
            <Box mt={3}>
              <Typography mb={1}>Country</Typography>
              <FormControl hiddenLabel fullWidth>
                <Select
                  displayEmpty
                  value={''}
                  onChange={() => {}}
                  size={'small'}
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected: any) => {
                    if (selected.length === 0) {
                      return <em>Choose state</em>;
                    }

                    return selected.join(', ');
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
                  value={''}
                  onChange={(e) => {}}
                  placeholder="Enter city"
                />
              </Box>
              <Box>
                <Typography mb={1}>State</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  value={''}
                  onChange={(e) => {}}
                  placeholder="Enter state"
                />
              </Box>
              <Box>
                <Typography mb={1}>ZIP Code</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  value={''}
                  onChange={(e) => {}}
                  placeholder="Enter ZIP code"
                />
              </Box>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} mt={3}>
              <Checkbox defaultChecked />
              <Typography>I have read and agree to te Terms and Conditions.</Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5">Review your cart</Typography>
          <Stack direction={'row'} mt={5}>
            <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={100} height={100} />
            <Box pl={2}>
              <Typography>Duocontact Sofa</Typography>
              <Typography mt={1}>1x</Typography>
              <Typography variant="h6" mt={2}>
                $20.00
              </Typography>
            </Box>
          </Stack>
          <Stack direction={'row'} mt={5}>
            <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={100} height={100} />
            <Box pl={2}>
              <Typography>Duocontact Sofa</Typography>
              <Typography mt={1}>1x</Typography>
              <Typography variant="h6" mt={2}>
                $20.00
              </Typography>
            </Box>
          </Stack>
          <Box mt={4}>
            <Input
              fullWidth
              startAdornment={
                <IconButton>
                  <ConfirmationNumber />
                </IconButton>
              }
              endAdornment={<Button>Apply</Button>}
              value={''}
              placeholder="Discount code"
            />
          </Box>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={4}>
            <Typography>Subtotal</Typography>
            <Typography fontWeight={'bold'}>$45.00</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Typography>Shipping</Typography>
            <Typography fontWeight={'bold'}>$5.00</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Typography>Discount</Typography>
            <Typography fontWeight={'bold'}>-$10.00</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Typography variant="h6">Total</Typography>
            <Typography fontWeight={'bold'}>$40.00</Typography>
          </Stack>

          <Box mt={4}>
            <Button
              variant={'contained'}
              color={'success'}
              size="large"
              fullWidth
              onClick={() => {
                window.location.href = '/payment/123456';
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
