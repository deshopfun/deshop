import { CHAINIDS } from '@/packages/constants'

export type RouteType = {
  path: string
  name: string
  title: string
  component: any
  enableSidebar: boolean
  enableHomeHeader: boolean
  enableHomeFooter: boolean
  needLogin: boolean
}

export type SearchType = {
  profiles: ProfileType[]
  products: ProductType[]
  total_product: number
  total_profile: number
}

export type UserType = {
  profile: ProfileType
  products: ProductType[]
  followers: ProfileType[]
  followings: ProfileType[]
}

export type ProfileType = {
  uuid: string
  avatar_url: string
  bio: string
  username: string
  email: string
  invitation_code: string
  currency: string
  create_time: number
}

export type ProductType = {
  product_id: number
  user_uuid: string
  user_email: string
  username: string
  user_avatar_url: string
  title: string
  slug: string
  body_html: string
  render_body_html: string
  product_type: string
  tags: string
  vendor: string
  website: string
  video: string
  currency: string
  product_status: string
  collect_status: string
  images: ProductImageType[]
  options: ProductOptionType[]
  variants: ProductVariantType[]
  ratings: RatingType[]
}

export type ProductImageType = {
  src: string
  width: number
  height: number
}

export type ProductOptionType = {
  name: string
  value: string
}

export type ProductVariantType = {
  title: string
  barcode: string
  compare_at_price: string
  image: string
  inventory_policy: string
  inventory_quantity: number
  position: number
  price: string
  option: string
  discounts: string
  taxable: string
  tax: string
  tip: string
  // shippable: string;
  // shipping: string;
  is_virtual: string
  sku: string
  weight: string
  weight_unit: string
}

export type ProductItemType = {
  product_id: number
  option: string
  quantity: number
}

export type CartSkuInfo = {
  product_id: number
  option: string
  user_uuid: string
  username: string
  user_avatar_url: string
  currency: string
  slug: string
  title: string
  image: string
  price: string
  discounts: string
  taxable: string
  tax: string
  tip: string
  weight: string
  weight_unit: string
  is_virtual: string
  inventory_quantity: number
  product_status: string
}

export type OrderType = {
  order_id: number
  customer_uuid: string
  customer_email: string
  customer_username: string
  customer_avatar_url: string
  user_uuid: string
  user_email: string
  username: string
  user_avatar_url: string
  order_status_url: string
  total_discounts: string
  sub_total_price: string
  total_price: string
  total_tax: string
  total_tip: string
  // total_shipping: string;
  currency: string
  confirmed: string
  confirmed_number: string
  payment_confirmed: string
  payment_confirmed_number: string
  // shipping_confirmed: string;
  // shipping_confirmed_number: string;
  financial_status: string
  process_time: number
  create_time: number
  update_time: number
  items: OrderItemType[]
  ratings: RatingType[]
  wallets: WalletType[]
  transactions: TransactionType[]
  // shipping: AddressType;
  detect_transaction: string
}

export type OrderItemType = {
  product_id: number
  slug: string
  option: string
  quantity: number
  price: string
  title: string
  image: string
}

export type WalletType = {
  chain_id: number
  chain_name: string
  address: string
  disable_coin: string
}

export type TransactionType = {
  select: string
  transaction_id: number
  amount: string
  currency: number
  gateway: string
  message: string
  source_name: string
  transaction_status: string
  blockchain: BlockchainType
}

export type BlockchainType = {
  rate: string
  chain_id: number
  hash: string
  address: string
  from_address: string
  to_address: string
  token: string
  crypto_amount: string
  block_timestamp: number
}

export type BlockchainOrderType = {
  chain_id: number
  latest_block: string
  cache_block: string
  sweep_block: string
  orders: OrderType[]
}

export type WalletConnectType = {
  chainIds: CHAINIDS
  address: string
  contractAddress?: string
  decimals?: number
  value: string
  buttonSize?: 'small' | 'medium' | 'large'
  buttonVariant?: 'text' | 'outlined' | 'contained'
  fullWidth?: boolean
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}

export type StatType = {
  product_number: number
  order_number: number
  trading_volume: number
  currency: string
  transaction_number: number
  variant_number: number
}

export type AddressType = {
  address_id: number
  first_name: string
  last_name: string
  phone: string
  email: string
  company: string
  country: string
  country_code: string
  city: string
  province: string
  province_code: string
  address_one: string
  address_two: string
  zip: string
  // shipping_type: string
  is_default: string
}

export type CollectType = {
  bind_id: number
  slug: string
  collect_type: string
  title: string
  description: string
  image_srcs: string[]
}

export type RatingType = {
  username: string
  rating_id: number
  product_option: string
  number: number
  image: string
  body: string
  create_time: number
}

export type PostRatingType = {
  product_id: number
  option: string
  quantity: number
  price: string
  title: string
  image: string
  rating_number?: number
  rating_image?: string
  rating_body?: string
}

export type NotificationType = {
  notification_id: number
  title: string
  description: string
  content: string
  url: string
  notification_type: string
  is_read: string
  create_time: number
}

export type ReplyType = {}

export type TabPanelType = {
  children?: React.ReactNode
  index: number
  value: number
}

export type Chat = {
  chat_id: number
  title: string
  description: string
}

export type Conversation = {
  conversation_id: number
  peer_uuid: string
  peer_username: string
  peer_avatar_url: string
  peer_online: string
  last_message: string
  last_message_time: number
  unread_count: number
}

export type ConversationMessage = {
  conversation_id: number
  message_id: number
  client_message_id: string
  sender_uuid: string
  content: string
  create_time: number
  message_status: string
  // message_status: 'sending' | 'sent' | 'read' | 'unread' | 'delete' | 'failed'
}
