import ForgotPassword from 'components/ForgotPassword';
import Home from 'components/Home';
import Login from 'components/Login';
import Register from 'components/Register';

export type RouteType = {
  path: string;
  name: string;
  title: string;
  component: any;
  enableSidebar: boolean;
  needLogin: boolean;
};

export const routes: RouteType[] = [
  {
    path: '/',
    name: 'Home',
    title: 'Home',
    component: <Home />,
    enableSidebar: true,
    needLogin: false,
  },
  {
    path: '/login',
    name: 'Login',
    title: 'Login',
    component: <Login />,
    enableSidebar: false,
    needLogin: false,
  },
  {
    path: '/register',
    name: 'Register',
    title: 'Register',
    component: <Register />,
    enableSidebar: false,
    needLogin: false,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    title: 'ForgotPassword',
    component: <ForgotPassword />,
    enableSidebar: false,
    needLogin: false,
  },
];
