export const PRODUCT_TYPE = {
  WOMEN: 'Women',
  MEN: 'Men',
  BEAUTY: 'Beauty',
  FOOD: 'Food & drinks',
  BABY: 'Baby & toddler',
  HOME: 'Home',
  FITNESS: 'Fitness & nutrition',
  ACCESSORIES: 'Accessories',
  PET: 'Pet supplies',
  GAMES: 'Toys & games',
  ELECTRONICS: 'Electronics',
  ARTS: 'Arts & crafts',
  LUGGAGE: 'Luggage & bags',
  SPORTING: 'Sporting goods',
};

export const COLLECT_TYPE = {
  PRODUCT: 1,
  LIVE: 2,
  CHAT: 3,
};

export const REPORT_TYPE = {
  PRODUCT: 1,
  LIVE: 2,
  CHAT: 3,
};

export const SHIPPING_TYPE = {
  DELIVERY: 1,
  PICKUP: 2,
};

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
};

export type TAB_DATA = {
  id: number;
  title: string;
  tabId: string;
};

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
];

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
    title: 'Rating',
    tabId: 'rating',
  },
];

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
    title: 'Wallets',
    tabId: 'wallets',
  },
  {
    id: 3,
    title: 'Addresses',
    tabId: 'Addresses',
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
];

export const FILE_TYPE = {
  Image: 'Image',
  Document: 'Document',
  Audio: 'Audio',
  Video: 'Video',
  Compressed: 'Compressed',
  Dev: 'Dev',
  Other: 'Other',
};

export const SORT_BY_TYPE = {
  MOST_RELEVABT: 'Most relevant',
  NEWEST: 'Newest',
  OLDEST: 'Oldest',
  RATING_LOW_HIGH: 'Rating: Low -> High',
  RATING_HIGH_LOW: 'Rating: High -> Low',
};

export const RATING_TYPE = {
  5: '5',
  4: '4',
  3: '3',
  2: '2',
  1: '1',
  0: 'RESET',
};
