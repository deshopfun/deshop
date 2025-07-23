import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, ContentCopy } from '@mui/icons-material';

const steps = [
  'Payment section',
  'Waiting for payment',
  'Blockchain network confirmation',
  'Order status change',
  'Email confirmation',
];

const PaymentDetails = () => {
  const [page, setPage] = useState<number>(1);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Container>
      {page === 1 && (
        <Box>
          <Typography variant="h4" textAlign={'center'}>
            Choose YourPayment Method
          </Typography>
          <Grid container spacing={2} mt={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Card>
                <Box p={3}>
                  <Box pb={1}>
                    <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={80} height={80} />
                  </Box>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                    <Typography fontWeight={'bold'}>Sub Total(USD)</Typography>
                    <Typography>2.50</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                    <Typography fontWeight={'bold'}>Others(USD)</Typography>
                    <Typography>0</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={1}>
                    <Typography fontWeight={'bold'}>Total(USD)</Typography>
                    <Typography>2.50</Typography>
                  </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <Typography textAlign={'center'} variant="h6" py={2}>
                  Choose Your Coin
                </Typography>
              </Card>

              <Box mt={2}>
                <List sx={{ width: '100%', bgcolor: 'background.paper', height: 400, overflow: 'auto' }}>
                  <ListItem disablePadding>
                    <ListItemButton
                      style={{ padding: 0 }}
                      onClick={() => {
                        setPage(2);
                      }}
                    >
                      <Stack direction={'row'} alignItems={'center'} p={2}>
                        <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={50} height={50} />
                        <Box pl={4}>
                          <Typography variant="h6">USDT TRC20</Typography>
                          <Typography mt={1} fontWeight={'bold'}>
                            2.5 USDT
                          </Typography>
                          <Typography>including Fee of 0 USDT</Typography>
                        </Box>
                      </Stack>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton style={{ padding: 0 }}>
                      <Stack direction={'row'} alignItems={'center'} p={2}>
                        <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={50} height={50} />
                        <Box pl={4}>
                          <Typography variant="h6">USDT TRC20</Typography>
                          <Typography mt={1} fontWeight={'bold'}>
                            2.5 USDT
                          </Typography>
                          <Typography>including Fee of 0 USDT</Typography>
                        </Box>
                      </Stack>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton style={{ padding: 0 }}>
                      <Stack direction={'row'} alignItems={'center'} p={2}>
                        <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={50} height={50} />
                        <Box pl={4}>
                          <Typography variant="h6">USDT TRC20</Typography>
                          <Typography mt={1} fontWeight={'bold'}>
                            2.5 USDT
                          </Typography>
                          <Typography>including Fee of 0 USDT</Typography>
                        </Box>
                      </Stack>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton style={{ padding: 0 }}>
                      <Stack direction={'row'} alignItems={'center'} p={2}>
                        <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={50} height={50} />
                        <Box pl={4}>
                          <Typography variant="h6">USDT TRC20</Typography>
                          <Typography mt={1} fontWeight={'bold'}>
                            2.5 USDT
                          </Typography>
                          <Typography>including Fee of 0 USDT</Typography>
                        </Box>
                      </Stack>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton style={{ padding: 0 }}>
                      <Stack direction={'row'} alignItems={'center'} p={2}>
                        <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={50} height={50} />
                        <Box pl={4}>
                          <Typography variant="h6">USDT TRC20</Typography>
                          <Typography mt={1} fontWeight={'bold'}>
                            2.5 USDT
                          </Typography>
                          <Typography>including Fee of 0 USDT</Typography>
                        </Box>
                      </Stack>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {page === 2 && (
        <Box>
          <Typography variant="h4" textAlign={'center'}>
            Payment Page
          </Typography>
          <Grid container spacing={2} mt={4}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Card>
                <Box p={3}>
                  <Box pb={1}>
                    <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={80} height={80} />
                  </Box>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                    <Typography fontWeight={'bold'}>Sub Total(USD)</Typography>
                    <Typography>2.50</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} py={1}>
                    <Typography fontWeight={'bold'}>Others(USD)</Typography>
                    <Typography>0</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={1}>
                    <Typography fontWeight={'bold'}>Total(USD)</Typography>
                    <Typography>2.50</Typography>
                  </Stack>
                </Box>
              </Card>

              <Box mt={2}>
                <Card>
                  <Box p={1}>
                    <LinearProgress
                      color={'success'}
                      variant="determinate"
                      value={20}
                      style={{
                        borderRadius: 5,
                        height: 10,
                      }}
                    />
                    <Typography textAlign={'center'} py={1} fontWeight={'bold'}>
                      Transaction recheck in 2:24
                    </Typography>
                  </Box>
                </Card>
              </Box>

              <Box mt={2}>
                <Card>
                  <Box p={2}>
                    <Divider />
                    <Box pt={2}>
                      <Typography>
                        Paste/Write your Chain transaction id(Txid) to manual payment confirmation
                      </Typography>
                      <Link href="#">Paste Chain Txid</Link>
                    </Box>
                    <Box py={2}>
                      <Typography>
                        However, If your money still does not appear to have been received, please contact us. With
                        your,
                      </Typography>
                      <Typography>1 Transaction hash/link</Typography>
                      <Typography>2 order id: 2853</Typography>
                      <Typography>
                        at <Link href="#">Contact telegram</Link>
                      </Typography>
                    </Box>
                    <Divider />
                    <Box mt={2}>
                      <Typography>Once your payment status will change, we will send you an email</Typography>
                      <Typography>
                        Your email: <b>example@gmail.com</b>
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Card>
                <Box p={2}>
                  <FormControl hiddenLabel fullWidth>
                    <Select
                      value={'10'}
                      onChange={() => {}}
                      size={'small'}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={10}>
                        <Stack direction={'row'} alignItems={'center'}>
                          <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={40} height={40} />
                          <Box pl={2}>
                            <Typography fontWeight={'bold'}>USDT-ERC20(USDT-ERC20)</Typography>
                            <Typography>2.50</Typography>
                          </Box>
                        </Stack>
                      </MenuItem>
                      <MenuItem value={20}>
                        <Stack direction={'row'} alignItems={'center'}>
                          <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={40} height={40} />
                          <Box pl={2}>
                            <Typography fontWeight={'bold'}>USDT-ERC20(USDT-ERC20)</Typography>
                            <Typography>2.50</Typography>
                          </Box>
                        </Stack>
                      </MenuItem>
                      <MenuItem value={30}>
                        <Stack direction={'row'} alignItems={'center'}>
                          <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={40} height={40} />
                          <Box pl={2}>
                            <Typography fontWeight={'bold'}>USDT-ERC20(USDT-ERC20)</Typography>
                            <Typography>2.50</Typography>
                          </Box>
                        </Stack>
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2} px={4}>
                    <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={100} height={100} />
                    <Paper style={{ padding: 14 }}>
                      <QRCodeSVG
                        value={'qrCode'}
                        width={160}
                        height={160}
                        imageSettings={{
                          src: '',
                          width: 35,
                          height: 35,
                          excavate: false,
                        }}
                      />
                      <Typography textAlign={'center'} pt={1}>
                        Scan to pay
                      </Typography>
                    </Paper>
                  </Stack>

                  <Box mt={4} textAlign={'center'}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
                      <Typography>Send</Typography>
                      <Typography variant="h4">2.50 USDT</Typography>
                      <Typography>by single transaction</Typography>
                    </Stack>
                    <Typography py={1}>Transaction to address:</Typography>
                  </Box>

                  <Divider />
                  <Box pt={1} pb={2}>
                    <FormControl size="small" hiddenLabel fullWidth>
                      <OutlinedInput
                        disabled
                        value={'0x0000000000000'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={() => {}}>
                              <ContentCopy />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <Divider />
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={2}>
                    <Typography>Order Descriptions</Typography>
                    <Typography>OrderId-1234</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>Price</Typography>
                    <Typography>2.50 USD</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>Fee</Typography>
                    <Typography>0.00 USDT</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>1 USDT:</Typography>
                    <Typography>1.00 USD</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>Page Expires in:</Typography>
                    <Typography>0h 14m 24s</Typography>
                  </Stack>

                  <Box mt={2}>
                    <Button
                      fullWidth
                      variant={'contained'}
                      color={'success'}
                      onClick={() => {
                        setPage(1);
                      }}
                    >
                      Back
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {page === 3 && (
        <Box>
          <Typography variant="h4" textAlign={'center'}>
            Payment Completed
          </Typography>

          <Box mt={4}>
            <Card>
              <Box display={'flex'} p={4} justifyContent={'center'}>
                <Box width={400} textAlign={'center'}>
                  <CheckCircle color={'success'} fontSize={'large'} />
                  <Typography variant="h6">Thank you</Typography>

                  <Box mt={2}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} pb={1}>
                      <Typography>Order Status</Typography>
                      <Chip label={'Settled'} color={'success'} />
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} pb={1}>
                      <Typography>Hash</Typography>
                      <Link href="#">0x00000</Link>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} pb={1}>
                      <Typography>From Address</Typography>
                      <Link href="#">0x00000</Link>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
                      <Typography>To Address</Typography>
                      <Link href="#">0x00000</Link>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      )}

      <Box mt={4}>
        <Card>
          <Box p={1}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    <Typography fontWeight={'bold'} textAlign={'left'}>
                      Step {index + 1}
                    </Typography>
                    <Typography fontSize={14}>{label}</Typography>
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Card>
      </Box>

      <Box my={4}>
        <Card>
          <Box p={2}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6">FAQ</Typography>
                <Typography>
                  Q: I made a payment and tried to contact the store owner/merchant, but they haven't responded. What
                  should I do?
                </Typography>
                <Typography>A: Please reach out to our telegram support for assistance.</Typography>
                <Typography mt={1}>@Deshop</Typography>
                <Typography>Fait to crypto exchange rate(Live)</Typography>
                <Typography>Deshop privacy policy</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6">QUESTIONS ABOUT YOUR PRODUCT</Typography>
                <Typography>
                  Deshop is a decentralized cryptocurrency exchange, if you have any question regarding your
                  products/goods/services please contact here.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack direction={'row'} alignItems={'center'} gap={2}>
                  <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={80} height={80} />
                  <img src={'/images/default_avatar.png'} alt={'image'} loading="lazy" width={80} height={80} />
                </Stack>
                <Typography mt={1}>Serial Number: 123123123123123</Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default PaymentDetails;
