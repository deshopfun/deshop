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
    title: 'Wallets',
    tabId: 'wallets',
  },
  {
    id: 2,
    title: 'Replies',
    tabId: 'replies',
  },
  {
    id: 3,
    title: 'Notifications',
    tabId: 'notifications',
  },
  {
    id: 4,
    title: 'Following',
    tabId: 'following',
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
