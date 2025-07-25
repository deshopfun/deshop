export enum CHAINIDS {
  NONE = 0,

  BITCOIN = 2,

  LITECOIN = 6,

  XRP = 8,

  BITCOINCASH = 11,

  ETHEREUM = 1,

  TRON = 728126428,

  SOLANA = 101,

  BSC = 56,

  ARBITRUM_ONE = 42161,
  ARBITRUM_NOVA = 42170,

  AVALANCHE = 43114,

  POLYGON = 137,

  BASE = 8453,

  OPTIMISM = 10,

  TON = 1100,
}

export enum INNERCHAINNAMES {
  BITCOIN = 'bitcoin',

  LITECOIN = 'litecoin',

  XRP = 'xrp',

  BITCOINCASH = 'bitcoincash',

  ETHEREUM = 'ethereum',

  TRON = 'tron',

  SOLANA = 'solana',

  BSC = 'bsc',

  ARBITRUM_ONE = 'arbitrum',
  ARBITRUM_NOVA = 'arbitrumnova',

  AVALANCHE = 'avalanche',

  POLYGON = 'polygon',

  BASE = 'base',

  OPTIMISM = 'optimism',

  TON = 'ton',
}

export enum CHAINNAMES {
  BITCOIN = 'Bitcoin',
  LITECOIN = 'Litecoin',
  XRP = 'XRP',
  BITCOINCASH = 'Bitcoin Cash',
  ETHEREUM = 'Ethereum',
  TRON = 'Tron',
  SOLANA = 'Solana',
  BSC = 'Binance smart chain',
  ARBITRUM = 'Arbitrum',
  ARBITRUMNOVA = 'Arbitrum Nova',
  AVALANCHE = 'Avalanche',
  POLYGON = 'Polygon',
  BASE = 'Base',
  OPTIMISM = 'Optimism',
  TON = 'Ton',
}

export enum CHAINPATHNAMES {
  BITCOIN = 'bitcoin',
  LITECOIN = 'litecoin',
  XRP = 'xrp',
  BITCOINCASH = 'bitcoincash',
  ETHEREUM = 'ethereum',
  TRON = 'tron',
  SOLANA = 'solana',
  BSC = 'bsc',
  ARBITRUM = 'arbitrum',
  ARBITRUMNOVA = 'arbitrumnova',
  AVALANCHE = 'avalanche',
  POLYGON = 'polygon',
  BASE = 'base',
  OPTIMISM = 'optimism',
  TON = 'ton',
}

export const ETHEREUM_CATEGORY_CHAINIDS: CHAINIDS[] = [
  CHAINIDS.ETHEREUM,
  CHAINIDS.BSC,
  CHAINIDS.ARBITRUM_NOVA,
  CHAINIDS.AVALANCHE,
  CHAINIDS.ARBITRUM_NOVA,
  CHAINIDS.POLYGON,
  CHAINIDS.BASE,
  CHAINIDS.OPTIMISM,
];
