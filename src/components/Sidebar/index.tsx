import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu, menuClasses, MenuItem, MenuItemStyles, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Box, Button, Icon, Link, Stack, SvgIcon, Typography } from '@mui/material';
import {
  Home,
  VideoCall,
  Chat,
  AccountCircle,
  SupportAgent,
  MoreVert,
  Explore,
  CurrencyBitcoin,
} from '@mui/icons-material';
import SidebarHeader from './SidebarHeader';

type Theme = 'light' | 'dark';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#000000',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const HomeSidebar = () => {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: 14,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      [`&.ps-active`]: {
        color: '#0098e5',
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0 ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1) : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: 'none',
        color: themes[theme].menu.hover.color,
        fontWeight: 'bold',
      },
      [`&.ps-active`]: {
        color: '#0098e5',
        backgroundColor: 'rgba(197, 228, 255, 1)',
        fontWeight: 'bold',
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <Sidebar
      collapsed={false}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      onBreakPoint={setBroken}
      breakPoint="md"
      rtl={false}
      style={{ height: '100%' }}
    >
      <Stack
        direction={'column'}
        height={'100%'}
        position={'fixed'}
        width={240}
        style={{ backgroundColor: '#fff', overflowY: 'auto', overflowX: 'hidden' }}
        borderRight={1}
        borderColor={'#efefef'}
      >
        <SidebarHeader />
        <Box flex={1}>
          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem icon={<Home />} active={router.pathname === '/' ? true : false} component={<Link href={'/'} />}>
              Home
            </MenuItem>
            <MenuItem
              icon={<Explore />}
              active={router.pathname === '/explore' ? true : false}
              component={<Link href={'/explore'} />}
            >
              Explore
            </MenuItem>
            <MenuItem
              icon={<CurrencyBitcoin />}
              active={router.pathname === '/blockchain' ? true : false}
              component={<Link href={'/blockchain'} />}
            >
              Blockchain
            </MenuItem>
            <MenuItem
              icon={<VideoCall />}
              active={router.pathname === '/live' ? true : false}
              component={<Link href={'/live'} />}
            >
              Livestreams
            </MenuItem>
            <MenuItem
              icon={<Chat />}
              active={router.pathname === '/chat' ? true : false}
              component={<Link href={'/chat'} />}
            >
              Chat
            </MenuItem>
            <MenuItem
              icon={<SupportAgent />}
              active={router.pathname === '/support' ? true : false}
              component={<Link href={'/support'} />}
            >
              Support
            </MenuItem>
            <MenuItem
              icon={<MoreVert />}
              active={router.pathname === '/more' ? true : false}
              component={<Link href={'#'} />}
            >
              More
            </MenuItem>
          </Menu>

          <Box mt={2} px={1}>
            <Button
              variant={'contained'}
              onClick={() => {
                window.location.href = '/create';
              }}
              fullWidth
              color={'success'}
            >
              Create product
            </Button>
          </Box>
        </Box>
        {/* <SidebarFooter collapsed={collapsed} /> */}
      </Stack>
    </Sidebar>
  );
};

export default HomeSidebar;
