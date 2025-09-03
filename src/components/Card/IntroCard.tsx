import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { CustomLogo } from 'components/Logo/CustomLogo';
import { useSnackPresistStore } from 'lib';
import { CURRENCYS } from 'packages/constants/currency';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type StatType = {
  product_number: number;
  order_number: number;
  trading_volume: number;
  currency: string;
  transaction_number: number;
  variant_number: number;
};

const IntroCard = () => {
  const [stats, setStats] = useState<StatType>();

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const init = async () => {
    try {
      const response: any = await axios.get(Http.home_stat);

      if (response.result) {
        setStats(response.data);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Card>
        <CardContent>
          <Card>
            <CardContent>
              <Box textAlign={'center'}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
                  <CustomLogo>D</CustomLogo>
                  <Typography variant="h4">Decentralized cryptocurrency trading platform</Typography>
                </Stack>
                <Typography mt={2}>
                  Deshop allows anyone to list their products and conduct online transactions using cryptocurrency.
                </Typography>
                <Typography mt={2}>
                  Trading on Deshop is completely free, and you can receive all the profits from the products you sell.
                </Typography>
                <Box mt={2}>
                  <Button
                    variant={'contained'}
                    onClick={() => {
                      window.location.href = '/create';
                    }}
                    color={'success'}
                  >
                    Go to create product
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Grid container mt={6}>
            <Grid size={{ xs: 12, md: 2.4 }} textAlign={'center'}>
              <Typography variant="h6">{stats?.order_number}</Typography>
              <Typography>Order Number</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 2.4 }} textAlign={'center'}>
              <Typography variant="h6">
                {CURRENCYS.find((item) => item.name === stats?.currency)?.code}
                {stats?.trading_volume}
              </Typography>
              <Typography>Trading Volume</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 2.4 }} textAlign={'center'}>
              <Typography variant="h6">{stats?.transaction_number}</Typography>
              <Typography>Transaction Number</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 2.4 }} textAlign={'center'}>
              <Typography variant="h6">{stats?.product_number}</Typography>
              <Typography>Product Number</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 2.4 }} textAlign={'center'}>
              <Typography variant="h6">{stats?.variant_number}</Typography>
              <Typography>Product Variant Number</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IntroCard;
