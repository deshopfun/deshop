import { Badge, Box, Button, FormControl, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import { CustomLogo } from 'components/Logo/CustomLogo';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useUserPresistStore } from 'lib';

const SidebarHeader = () => {
  const { getIsLogin } = useUserPresistStore((state) => state);

  return (
    <Box paddingLeft={3} paddingRight={1} paddingY={3} overflow={'hidden'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Button
          style={{ padding: 0 }}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <CustomLogo>D</CustomLogo>
            <Typography fontWeight={'bold'} color="#0098e5" fontSize={'large'}>
              Deshop
            </Typography>
          </Stack>
        </Button>

        {getIsLogin() && (
          <Box>
            <IconButton
              size="small"
              onClick={() => {
                window.location.href = '/notification';
              }}
            >
              <Badge badgeContent={0} color="error">
                <NotificationsNoneIcon color="action" />
              </Badge>
            </IconButton>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default SidebarHeader;
