import Chat from 'components/Chat';
import Create from 'components/Create';
import Explore from 'components/Explore';
import ForgotPassword from 'components/ForgotPassword';
import Home from 'components/Home';
import Live from 'components/Live';
import Login from 'components/Login';
import Profile from 'components/Profile';
import Register from 'components/Register';
import Support from 'components/Support';

export type RouteType = {
  path: string;
  name: string;
  title: string;
  component: any;
  enableSidebar: boolean;
  enableHomeHeader: boolean;
  enableSearch: boolean;
  needLogin: boolean;
};

export const routes: RouteType[] = [
  {
    path: '/',
    name: 'Home',
    title: 'Home',
    component: <Home />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableSearch: true,
    needLogin: false,
  },
  {
    path: '/login',
    name: 'Login',
    title: 'Login',
    component: <Login />,
    enableSidebar: false,
    enableHomeHeader: false,
    enableSearch: false,
    needLogin: false,
  },
  {
    path: '/register',
    name: 'Register',
    title: 'Register',
    component: <Register />,
    enableSidebar: false,
    enableHomeHeader: false,
    enableSearch: false,
    needLogin: false,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    title: 'ForgotPassword',
    component: <ForgotPassword />,
    enableSidebar: false,
    enableHomeHeader: false,
    enableSearch: false,
    needLogin: false,
  },
  {
    path: '/explore',
    name: 'Explore',
    title: 'Explore',
    component: <Explore />,
    enableSidebar: true,
    enableHomeHeader: false,
    enableSearch: false,
    needLogin: false,
  },
  {
    path: '/live',
    name: 'Live',
    title: 'Live',
    component: <Live />,
    enableSidebar: true,
    enableHomeHeader: false,
    enableSearch: false,
    needLogin: false,
  },
  {
    path: '/chat',
    name: 'Chat',
    title: 'Chat',
    component: <Chat />,
    enableSidebar: true,
    enableHomeHeader: false,
    enableSearch: false,
    needLogin: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    title: 'Profile',
    component: <Profile />,
    enableSidebar: true,
    enableHomeHeader: false,
    enableSearch: false,
    needLogin: true,
  },
  {
    path: '/support',
    name: 'Support',
    title: 'Support',
    component: <Support />,
    enableSidebar: true,
    enableHomeHeader: false,
    enableSearch: false,
    needLogin: false,
  },
  {
    path: '/create',
    name: 'Create',
    title: 'Create',
    component: <Create />,
    enableSidebar: true,
    enableHomeHeader: false,
    enableSearch: false,
    needLogin: false,
  },
];
