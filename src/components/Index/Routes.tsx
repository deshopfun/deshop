import ForgotPassword from 'components/ForgotPassword';
import Home from 'components/Home';
import Login from 'components/Login';
import Register from 'components/Register';

export type RouteType = {
  path: string;
  name: string;
  title: string;
  component: any;
  needLogin: boolean;
};

export const routes: RouteType[] = [
  {
    path: '/',
    name: 'Home',
    title: 'Home',
    component: <Home />,
    needLogin: false,
  },
  {
    path: '/login',
    name: 'Login',
    title: 'Login',
    component: <Login />,
    needLogin: false,
  },
  {
    path: '/register',
    name: 'Register',
    title: 'Register',
    component: <Register />,
    needLogin: false,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    title: 'ForgotPassword',
    component: <ForgotPassword />,
    needLogin: false,
  },
];
