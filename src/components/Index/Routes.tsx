import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import { RouteType } from '@/utils/types'

// SSR pages: static import so server HTML matches the first client render.
import Home from '@/components/Home'
import Welcome from '../Welcome'
import Explore from '@/components/Explore'
import Live from '@/components/Live'
import ProfileDetails from '@/components/Profile/id'
import Support from '@/components/Support'
import ProductDetails from '@/components/Product/id'
import DocsFees from '@/components/Docs/Fees'
import DocsPrivacyPolicy from '@/components/Docs/PrivacyPolicy'
import DocsTermsAndConditions from '@/components/Docs/TermsAndConditions'
import Blockchain from '@/components/Blockchain'
import Search from '@/components/Search'
import StoryDetails from '@/components/Story/id'

const PageLoading = () => (
  <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
    Loading…
  </div>
)

function lazyPage(loader: () => Promise<{ default: ComponentType<object> }>) {
  return dynamic(loader, {
    ssr: false,
    loading: () => <PageLoading />,
  })
}

// Auth / app pages: client-only chunks (no SSR HTML to mismatch).
const Login = lazyPage(() => import('@/components/Login'))
const Register = lazyPage(() => import('@/components/Register'))
const EmailConfirm = lazyPage(() => import('@/components/EmailConfirm'))
const ForgotPassword = lazyPage(() => import('@/components/ForgotPassword'))
const Notification = lazyPage(() => import('@/components/Notification'))
const Chat = lazyPage(() => import('@/components/Chat'))
const Create = lazyPage(() => import('@/components/Create'))
const Cart = lazyPage(() => import('@/components/Cart'))
const Checkout = lazyPage(() => import('@/components/Checkout'))
const CheckoutDetails = lazyPage(() => import('@/components/Checkout/id'))
const PaymentDetails = lazyPage(() => import('@/components/Payment/id'))
const Collect = lazyPage(() => import('@/components/Collect'))
const OrderDetails = lazyPage(() => import('@/components/Order/id'))
const Manage = lazyPage(() => import('@/components/Manage'))
const ManageDetails = lazyPage(() => import('@/components/Manage/id'))
const ReportProductDetails = lazyPage(() => import('@/components/Report/Products/id'))

export const routes: RouteType[] = [
  {
    path: '/',
    name: 'Home',
    title: 'Home',
    Component: Home,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/welcome',
    name: 'Welcome',
    title: 'Welcome',
    Component: Welcome,
    enableSidebar: false,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/login',
    name: 'Login',
    title: 'Login',
    Component: Login,
    enableSidebar: false,
    enableHomeHeader: false,
    enableHomeFooter: false,
    needLogin: false,
  },
  {
    path: '/register',
    name: 'Register',
    title: 'Register',
    Component: Register,
    enableSidebar: false,
    enableHomeHeader: false,
    enableHomeFooter: false,
    needLogin: false,
  },
  {
    path: '/confirm',
    name: 'Confirm',
    title: 'Email confirm',
    Component: EmailConfirm,
    enableSidebar: false,
    enableHomeHeader: false,
    enableHomeFooter: false,
    needLogin: false,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    title: 'Forgot password',
    Component: ForgotPassword,
    enableSidebar: false,
    enableHomeHeader: false,
    enableHomeFooter: false,
    needLogin: false,
  },
  {
    path: '/explore',
    name: 'Explore',
    title: 'Explore',
    Component: Explore,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/live',
    name: 'Live',
    title: 'Live',
    Component: Live,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/notification',
    name: 'Notification',
    title: 'Notification',
    Component: Notification,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/chat',
    name: 'Chat',
    title: 'Chat',
    Component: Chat,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/profile/[id]',
    name: 'Profile',
    title: 'Profile',
    Component: ProfileDetails,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/support',
    name: 'Support',
    title: 'Support',
    Component: Support,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/create',
    name: 'Create',
    title: 'Create',
    Component: Create,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/products/[id]',
    name: 'Product',
    title: 'Product',
    Component: ProductDetails,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/cart',
    name: 'Cart',
    title: 'Cart',
    Component: Cart,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    title: 'Checkout',
    Component: Checkout,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/checkout/[id]',
    name: 'CheckoutDetails',
    title: 'Checkout',
    Component: CheckoutDetails,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/payment/[id]',
    name: 'PaymentDetails',
    title: 'PaymentDetails',
    Component: PaymentDetails,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/collect',
    name: 'Collect',
    title: 'Collect',
    Component: Collect,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/order/[id]',
    name: 'OrderDetails',
    title: 'OrderDetails',
    Component: OrderDetails,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/manage',
    name: 'Manage',
    title: 'Manage',
    Component: Manage,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/manage/[id]',
    name: 'ManageDetails',
    title: 'Manage',
    Component: ManageDetails,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/docs/fees',
    name: 'Fees',
    title: 'Fees',
    Component: DocsFees,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/docs/privacy-policy',
    name: 'Privacy policy',
    title: 'Privacy policy',
    Component: DocsPrivacyPolicy,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/docs/terms-and-conditions',
    name: 'Terms and conditions',
    title: 'Terms and conditions',
    Component: DocsTermsAndConditions,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/report/products/[id]',
    name: 'ReportProductDetails',
    title: 'ReportProductDetails',
    Component: ReportProductDetails,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: true,
  },
  {
    path: '/blockchain',
    name: 'Blockchain',
    title: 'Blockchain',
    Component: Blockchain,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/search',
    name: 'Search',
    title: 'Search',
    Component: Search,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
  {
    path: '/story/[id]',
    name: 'Story',
    title: 'Story',
    Component: StoryDetails,
    enableSidebar: true,
    enableHomeHeader: true,
    enableHomeFooter: true,
    needLogin: false,
  },
]
