import { CHAINIDS } from 'packages/constants';

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

export type UserType = {
  profile: ProfileType;
  products: ProductType[];
};

export type ProfileType = {
  uuid: string;
  avatar_url: string;
  bio: string;
  username: string;
  email: string;
  invitation_code: string;
  currency: string;
  created_time: number;
};

export type ProductType = {
  product_id: number;
  user_uuid: string;
  user_email: string;
  username: string;
  user_avatar_url: string;
  title: string;
  body_html: string;
  render_body_html: string;
  product_type: string;
  tags: string;
  vendor: string;
  currency: string;
  product_status: number;
  collect_status: number;
  images: ProductImageType[];
  options: ProductOptionType[];
  variants: ProductVariantType[];
  ratings: RatingType[];
};

export type ProductImageType = {
  src: string;
  width: number;
  height: number;
};

export type ProductOptionType = {
  name: string;
  value: string;
};

export type ProductVariantType = {
  title: string;
  barcode: string;
  compare_at_price: string;
  image: string;
  inventory_policy: boolean;
  inventory_quantity: number;
  position: number;
  price: string;
  option: string;
  discounts: string;
  taxable: boolean;
  tax: string;
  tip: string;
  shippable: boolean;
  shipping: string;
  sku: string;
  weight: string;
  weight_unit: string;
};

export type ProductItemType = {
  product_id: number;
  option: string;
  quantity: number;
};

export type OrderType = {
  order_id: number;
  customer_uuid: string;
  customer_email: string;
  customer_username: string;
  customer_avatar_url: string;
  user_uuid: string;
  user_email: string;
  username: string;
  user_avatar_url: string;
  order_status_url: string;
  total_discounts: string;
  sub_total_price: string;
  total_price: string;
  total_tax: string;
  total_tip: string;
  total_shipping: string;
  currency: string;
  confirmed: number;
  confirmed_number: string;
  payment_confirmed: number;
  payment_confirmed_number: string;
  shipping_confirmed: number;
  shipping_confirmed_number: string;
  financial_status: number;
  process_time: number;
  create_time: number;
  update_time: number;
  items: OrderItemType[];
  ratings: RatingType[];
  wallets: WalletType[];
  transactions: TransactionType[];
  shipping: AddressType;
};

export type OrderItemType = {
  product_id: number;
  option: string;
  quantity: number;
  price: string;
  title: string;
  image: string;
};

export type WalletType = {
  chain_id: number;
  chain_name: string;
  address: string;
  disable_coin: string;
};

export type TransactionType = {
  select: number;
  transaction_id: number;
  amount: string;
  currency: number;
  gateway: string;
  message: string;
  source_name: number;
  transaction_status: number;
  blockchain: BlockchainType;
};

export type BlockchainType = {
  rate: string;
  chain_id: number;
  hash: string;
  address: string;
  from_address: string;
  to_address: string;
  token: string;
  crypto_amount: string;
  block_timestamp: number;
};

export type BlockchainOrderType = {
  chain_id: number;
  latest_block: string;
  cache_block: string;
  sweep_block: string;
  orders: OrderType[];
};

export type WalletConnectType = {
  chainIds: CHAINIDS;
  address: string;
  contractAddress?: string;
  decimals?: number;
  value: string;
  buttonSize?: 'small' | 'medium' | 'large';
  buttonVariant?: 'text' | 'outlined' | 'contained';
  fullWidth?: boolean;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
};

export type StatType = {
  product_number: number;
  order_number: number;
  trading_volume: number;
  currency: string;
  transaction_number: number;
  variant_number: number;
};

export type AddressType = {
  address_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  company: string;
  country: string;
  country_code: string;
  city: string;
  province: string;
  province_code: string;
  address_one: string;
  address_two: string;
  zip: string;
  shipping_type: number;
  is_default: number;
};

export type CollectType = {
  bind_id: number;
  collect_type: number;
  title: string;
  description: string;
  image_srcs: string[];
};

export type RatingType = {
  username: string;
  rating_id: number;
  product_option: string;
  number: number;
  image: string;
  body: string;
  create_time: number;
};

export type PostRatingType = {
  product_id: number;
  option: string;
  quantity: number;
  price: string;
  title: string;
  image: string;
  rating_number?: number;
  rating_image?: string;
  rating_body?: string;
};

export type NotificationType = {
  notification_id: number;
  title: string;
  description: string;
  content: string;
  url: string;
  notification_type: number;
  is_read: number;
  create_time: number;
};

export type FollowType = {};

export type ReplyType = {};

export type TabPanelType = {
  children?: React.ReactNode;
  index: number;
  value: number;
};
