import { AccountCircle, AddShoppingCart, FavoriteBorder, KeyboardArrowDown } from '@mui/icons-material';
import { Avatar, Badge, Box, Button, Divider, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Search from 'components/Search';
import { useCartPresistStore, useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { OmitMiddleString } from 'utils/strings';

const HomeHeader = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [collectNumber, setCollectNumber] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsLogin, resetUser } = useUserPresistStore((state) => state);
  const { getCart } = useCartPresistStore((state) => state);

  const onClickLogout = async () => {
    resetUser();
    window.location.reload();
  };

  const init = async () => {
    try {
      if (!getIsLogin()) {
        return;
      }

      const response: any = await axios.get(Http.user_setting);

      if (response.result) {
        setAvatarUrl(response.data.avatar_url);
        setUsername(response.data.username);
        response.data.collects && setCollectNumber(response.data.collects.length);
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message);
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box p={2}>
      <Grid container>
        <Grid size={{ xs: 12, md: 4 }}></Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Search />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'right'} gap={2}>
            <IconButton
              onClick={() => {
                window.location.href = '/cart';
              }}
            >
              <Badge badgeContent={getCart().length} color={'info'}>
                <AddShoppingCart color="action" />
              </Badge>
            </IconButton>
            {getIsLogin() && (
              <>
                <IconButton
                  onClick={() => {
                    window.location.href = '/collect';
                  }}
                >
                  <Badge badgeContent={collectNumber} color={'info'}>
                    <FavoriteBorder color="action" />
                  </Badge>
                </IconButton>
              </>
            )}

            <Button
              onClick={() => {
                window.location.href = '/create';
              }}
              variant="contained"
              color={'success'}
            >
              Create Product
            </Button>
            {getIsLogin() ? (
              <>
                <Button
                  variant={'outlined'}
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDown />}
                  style={{ width: 180 }}
                >
                  {avatarUrl ? (
                    <Avatar sx={{ width: 25, height: 25 }} alt="Avatar" src={avatarUrl} />
                  ) : (
                    <Avatar sx={{ width: 25, height: 25 }} alt="Avatar" src={'/images/default_avatar.png'} />
                  )}
                  <Typography pl={1} fontSize={16}>
                    {OmitMiddleString(String(username), 3)}
                  </Typography>
                </Button>
                <Menu
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    style={{ width: 180 }}
                    onClick={() => {
                      window.location.href = `/profile/${username}`;
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.location.href = `/manage/${username}`;
                    }}
                  >
                    Manage
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={onClickLogout}>
                    <Typography color={'error'}>Log out</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => {
                  window.location.href = '/login';
                }}
                variant="contained"
              >
                Log in
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeHeader;
