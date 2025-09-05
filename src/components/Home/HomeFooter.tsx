import { Container, Link, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const HomeFooter = () => {
  const router = useRouter();

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={4}>
      <Typography width={200}>© deshop.fun 2025</Typography>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
        <Link color={'textPrimary'} href="/docs/privacy-policy">
          Privacy policy
        </Link>
        <Typography>|</Typography>
        <Link color={'textPrimary'} href="/docs/terms-and-conditions">
          Terms of service
        </Link>
        <Typography>|</Typography>
        <Link color={'textPrimary'} href="/docs/fees">
          Fees
        </Link>
        <Typography>|</Typography>
        <Link color={'textPrimary'} href="#">
          Revenue
        </Link>
        <Typography>|</Typography>
        <Link color={'textPrimary'} href="https://t.me/deshop_tech_updates" target="_blank">
          Tech updates
        </Link>
      </Stack>
      <Stack width={200}>
        {router.pathname === '/products/[id]' && router.query.id && (
          <Link underline={'none'} color={'textPrimary'} href={`/report/products/${router.query.id}`} textAlign={'right'}>
            Report
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

export default HomeFooter;
