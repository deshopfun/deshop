import Cart from 'components/Cart';
import Chat from 'components/Chat';
import CheckoutDetails from 'components/Checkout/id';
import Collect from 'components/Collect';
import Create from 'components/Create';
import DocsFees from 'components/Docs/Fees';
import DocsPrivacyPolicy from 'components/Docs/PrivacyPolicy';
import DocsTermsAndConditions from 'components/Docs/TermsAndConditions';
import EmailConfirm from 'components/EmailConfirm';
import Explore from 'components/Explore';
import ForgotPassword from 'components/ForgotPassword';
import Home from 'components/Home';
import Live from 'components/Live';
import Login from 'components/Login';
import ManageDetails from 'components/Manage/id';
import Notification from 'components/Notification';
import OrderDetails from 'components/Order/id';
import PaymentDetails from 'components/Payment/id';
import ProductDetails from 'components/Product/id';
import ProfileDetails from 'components/Profile/id';
import Register from 'components/Register';
import ReportProductDetails from 'components/Report/Products/id';
import Support from 'components/Support';

export type RouteType = {
  path: string;
  name: string;
  title: string;
  component: any;
  enableSidebar: boolean;
  enableHomeHeader: boolean;
  enableHomeFooter: boolean;
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
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/login',
    name: 'Login',
    title: 'Login',
    component: <Login />,
    enableSidebar: false,
    enableHomeHeader: false,
    enableHomeFooter: false,
    needLogin: false,
  },
  {
    path: '/register',
    name: 'Register',
    title: 'Register',
    component: <Register />,
    enableSidebar: false,
    enableHomeHeader: false,
    enableHomeFooter: false,
    needLogin: false,
  },
  {
    path: '/confirm',
    name: 'Confirm',
    title: 'Email confirm',
    component: <EmailConfirm />,
    enableSidebar: false,
    enableHomeHeader: false,
    enableHomeFooter: false,
    needLogin: false,
  },
  {
    path: '/explore',
    name: 'Explore',
    title: 'Explore',
    component: <Explore />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/live',
    name: 'Live',
    title: 'Live',
    component: <Live />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/notification',
    name: 'Notification',
    title: 'Notification',
    component: <Notification />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/chat',
    name: 'Chat',
    title: 'Chat',
    component: <Chat />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/profile/[id]',
    name: 'Profile',
    title: 'Profile',
    component: <ProfileDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/support',
    name: 'Support',
    title: 'Support',
    component: <Support />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/create',
    name: 'Create',
    title: 'Create',
    component: <Create />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/products/[id]',
    name: 'Product',
    title: 'Product',
    component: <ProductDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/cart',
    name: 'Cart',
    title: 'Cart',
    component: <Cart />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/checkout/[id]',
    name: 'Checkout',
    title: 'Checkout',
    component: <CheckoutDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/payment/[id]',
    name: 'PaymentDetails',
    title: 'PaymentDetails',
    component: <PaymentDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/collect',
    name: 'Collect',
    title: 'Collect',
    component: <Collect />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/order/[id]',
    name: 'OrderDetails',
    title: 'OrderDetails',
    component: <OrderDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/manage/[id]',
    name: 'Manage',
    title: 'Manage',
    component: <ManageDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/docs/fees',
    name: 'Fees',
    title: 'Fees',
    component: <DocsFees />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/docs/privacy-policy',
    name: 'Privacy policy',
    title: 'Privacy policy',
    component: <DocsPrivacyPolicy />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/docs/terms-and-conditions',
    name: 'Terms and conditions',
    title: 'Terms and conditions',
    component: <DocsTermsAndConditions />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/report/products/[id]',
    name: 'ReportProductDetails',
    title: 'ReportProductDetails',
    component: <ReportProductDetails />,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
];
