export const PRODUCT_TYPE = {
  OPENSOURCE: 'Open Source',
  AI: 'AI',
  INFRASTRUCTURE: 'Infrastructure',
  DEVTOOLS: 'Developer Tools',
  DEFI: 'DeFi',
  EXCHANGE: 'Trading & Exchange',
  WALLET: 'Wallet',
  PAYMENTS: 'Payments',
  NFT: 'NFT',
  RWA: 'RWA',
  GAMING: 'Gaming',
  SOCIAL: 'Social',
  MEDIA: 'Media',
  EDUCATION: 'Education',
  PRODUCTIVITY: 'Productivity',
  DAO: 'DAO',
  IDENTITY: 'Identity',
  SECURITY: 'Security & Privacy',
  DATA: 'Data & Analytics',
  OTHER: 'Other',
}

export const COLLECT_TYPE = {
  PRODUCT: 'product',
  LIVE: 'live',
  CHAT: 'chat',
}

export const REPORT_TYPE = {
  PRODUCT: 'product',
  LIVE: 'live',
  CHAT: 'chat',
}

export const SHIPPING_TYPE = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
}

export const WEIGHT_UNIT_TYPE = {
  G: 'g',
  KG: 'kg',
  OZ: 'oz',
  LB: 'lb',
  MG: 'mg',
  T: 't',
  CT: 'ct',
  GR: 'gr',
  ST: 'st',
  TROY: 'troy_oz',
  SHORT: 'short_ton',
  LONG: 'long_ton',
  DAN: 'dan',
  JIN: 'jin',
  LIANG: 'liang',
}

export type TAB_DATA = {
  id: number
  title: string
  tabId: string
}

export const PROFILE_TAB_DATAS: TAB_DATA[] = [
  {
    id: 0,
    title: 'Products',
    tabId: 'products',
  },
  {
    id: 1,
    title: 'Replies',
    tabId: 'replies',
  },
  {
    id: 2,
    title: 'Followers',
    tabId: 'followers',
  },
]

export const PRODUCT_TAB_DATAS: TAB_DATA[] = [
  {
    id: 0,
    title: 'Product',
    tabId: 'product',
  },
  {
    id: 1,
    title: 'Variant',
    tabId: 'variant',
  },
  {
    id: 2,
    title: 'Story',
    tabId: 'story',
  },
  {
    id: 3,
    title: 'Rating',
    tabId: 'rating',
  },
]

export const MANAGE_TAB_DATAS: TAB_DATA[] = [
  {
    id: 0,
    title: 'Products',
    tabId: 'products',
  },
  {
    id: 1,
    title: 'Orders',
    tabId: 'orders',
  },
  {
    id: 2,
    title: 'Transactions',
    tabId: 'transactions',
  },
  {
    id: 3,
    title: 'Wallets',
    tabId: 'wallets',
  },
  {
    id: 4,
    title: 'Notifications',
    tabId: 'notifications',
  },
  {
    id: 5,
    title: 'Settings',
    tabId: 'settings',
  },
  // {
  //   id: 666,
  //   title: 'Addresses',
  //   tabId: 'Addresses',
  // },
]

export const FILE_TYPE = {
  Image: 'Image',
  Document: 'Document',
  Audio: 'Audio',
  Video: 'Video',
  Compressed: 'Compressed',
  Dev: 'Dev',
  Other: 'Other',
}

export const SORT_BY_TYPE = {
  MOST_RELEVABT: 'Most relevant',
  NEWEST: 'Newest',
  OLDEST: 'Oldest',
  RATING_LOW_HIGH: 'Rating: Low -> High',
  RATING_HIGH_LOW: 'Rating: High -> Low',
}

export const RATING_TYPE = {
  5: '5',
  4: '4',
  3: '3',
  2: '2',
  1: '1',
  0: 'RESET',
}

// 'sending' | 'sent' | 'read' | 'unread' | 'delete' | 'failed'
export const CHAT_MESSAGE_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  READ: 'read',
  UNREAD: 'unread',
  DELETE: 'delete',
  FAILED: 'failed',
}

export const FINANCIAL_STATUS = {
  PAID: 'paid',
  PENDING: 'pending',
  AUTHORIZED: 'authorized',
  PARTIALLY_PAID: 'partially_paid',
  PARTIALLY_REFUNDED: 'partially_refunded',
  REFUNDED: 'refunded',
  VOIDED: 'voided',
}

export const CANCEL_REASON_TYPE = {
  MERCHANT: 'merchant',
  CUSTOMER: 'customer',
  FRAUD: 'fraud',
  INVENTORY: 'inventory',
  PAYMENT_TIMEOUT: 'payment_timeout',
  OTHER: 'other',
}
