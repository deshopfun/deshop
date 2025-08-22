import { Container, Link, Stack, Typography } from '@mui/material';

const HomeFooter = () => {
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={4}>
      <Typography>© deshop.fun 2025</Typography>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
        <Link color={'textPrimary'} href="#">
          Privacy policy
        </Link>
        <Typography>|</Typography>
        <Link color={'textPrimary'} href="#">
          Terms of service
        </Link>
        <Typography>|</Typography>
        <Link color={'textPrimary'} href="#">
          Fees
        </Link>
        <Typography>|</Typography>
        <Link color={'textPrimary'} href="#">
          Revenue
        </Link>
        <Typography>|</Typography>
        <Link color={'textPrimary'} href="#">
          Tech updates
        </Link>
      </Stack>
      <Link underline={'none'} color={'textPrimary'} href="">
        Report
      </Link>
    </Stack>
  );
};

export default HomeFooter;
