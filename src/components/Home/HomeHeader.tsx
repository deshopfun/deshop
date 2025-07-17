import { AccountCircle, KeyboardArrowDown } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, Menu, MenuItem, Typography } from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

const HomeHeader = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [username, setUsername] = useState<string>();
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

  const onClickLogout = async () => {
    resetUser();
    window.location.reload();
  };

  const init = async () => {
    try {
      const response: any = await axios.get(Http.user_setting);

      if (response.result) {
        setAvatarUrl(response.data.avatar_url);
        setUsername(response.data.username);
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
      <Box display={'flex'} justifyContent={'right'} gap={1}>
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
            <Button variant={'outlined'} onClick={handleClick} endIcon={<KeyboardArrowDown />}>
              {avatarUrl ? (
                <Avatar alt="Avatar" src={avatarUrl} />
              ) : (
                <Avatar sx={{ width: 20, height: 20 }} alt="Avatar" src={'/images/default_avatar.png'} />
              )}
              <Typography pl={1}>{username}</Typography>
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  window.location.href = `/profile/${username}`;
                }}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={() => {}}>View wallet</MenuItem>
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
    </Box>
  );
};

export default HomeHeader;
