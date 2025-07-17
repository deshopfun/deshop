import { AccountCircle, KeyboardArrowDown } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, Menu, MenuItem, Typography } from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useState } from 'react';

const HomeHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsLogin, setIsLogin, setAuth, username, userAvatar, setUserEmail, resetUser } = useUserPresistStore(
    (state) => state,
  );

  const onClickLogout = async () => {
    resetUser();
    window.location.reload();
  };

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
            <Button style={{ width: 150 }} variant={'outlined'} onClick={handleClick} endIcon={<KeyboardArrowDown />}>
              {userAvatar ? (
                <Avatar alt="Avatar" src={userAvatar} />
              ) : (
                <Avatar sx={{ width: 20, height: 20 }} alt="Avatar" src={'/images/default_avatar.png'} />
              )}
              <Typography pl={1}>{username}</Typography>
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
              <MenuItem
                style={{ width: 150 }}
                onClick={() => {
                  window.location.href = `/profile/${username}`;
                }}
              >
                Profile
              </MenuItem>
              <MenuItem style={{ width: 150 }} onClick={() => {}}>
                View wallet
              </MenuItem>
              <Divider />
              <MenuItem style={{ width: 150 }} onClick={onClickLogout}>
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
