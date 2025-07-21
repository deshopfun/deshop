import Cart from 'components/Cart';
import Chat from 'components/Chat';
import CheckoutDetails from 'components/Checkout/id';
import Create from 'components/Create';
import EmailConfirm from 'components/EmailConfirm';
import Explore from 'components/Explore';
import ForgotPassword from 'components/ForgotPassword';
import Home from 'components/Home';
import Live from 'components/Live';
import Login from 'components/Login';
import PaymentDetails from 'components/Payment/id';
import ProductDetails from 'components/Product/id';
import Profile from 'components/Profile';
import ProfileDetails from 'components/Profile/id';
import Register from 'components/Register';
import Support from 'components/Support';

export type RouteType = {
  path: string;
  name: string;
  title: string;
  component: any;
  enableSidebar: boolean;
  enableHomeHeader: boolean;
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
    needLogin: false,
  },
  {
    path: '/login',
    name: 'Login',
    title: 'Login',
    component: <Login />,
    enableSidebar: false,
    enableHomeHeader: false,
    needLogin: false,
  },
  {
    path: '/register',
    name: 'Register',
    title: 'Register',
    component: <Register />,
    enableSidebar: false,
    enableHomeHeader: false,
    needLogin: false,
  },
  {
    path: '/confirm',
    name: 'Confirm',
    title: 'Email confirm',
    component: <EmailConfirm />,
    enableSidebar: false,
    enableHomeHeader: false,
    needLogin: false,
  },
  {
    path: '/explore',
    name: 'Explore',
    title: 'Explore',
    component: <Explore />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: false,
  },
  {
    path: '/live',
    name: 'Live',
    title: 'Live',
    component: <Live />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: false,
  },
  {
    path: '/chat',
    name: 'Chat',
    title: 'Chat',
    component: <Chat />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    title: 'Profile',
    component: <Profile />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: true,
  },
  {
    path: '/profile/[id]',
    name: 'Profile',
    title: 'Profile',
    component: <ProfileDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: false,
  },
  {
    path: '/support',
    name: 'Support',
    title: 'Support',
    component: <Support />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: false,
  },
  {
    path: '/create',
    name: 'Create',
    title: 'Create',
    component: <Create />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: false,
  },
  {
    path: '/products/[id]',
    name: 'Product',
    title: 'Product',
    component: <ProductDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: false,
  },
  {
    path: '/cart',
    name: 'Cart',
    title: 'Cart',
    component: <Cart />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: false,
  },
  {
    path: '/checkout/[id]',
    name: 'Checkout',
    title: 'Checkout',
    component: <CheckoutDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: false,
  },
  {
    path: '/payment/[id]',
    name: 'PaymentDetails',
    title: 'PaymentDetails',
    component: <PaymentDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    needLogin: false,
  },
];
