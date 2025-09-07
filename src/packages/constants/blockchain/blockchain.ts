import { CHAINNAMES, CHAINIDS } from './chain';
import { COINS } from './coin';

export type COIN = {
  chainId: CHAINIDS;
  name: COINS;
  isMainCoin: boolean;
  symbol: COINS;
  contractAddress?: string;
  decimals: number;
  displayDecimals: number;
  icon: any;
};

export const BITCOIN_COINS: COIN[] = [
  {
    chainId: CHAINIDS.BITCOIN,
    name: COINS.BTC,
    isMainCoin: true,
    symbol: COINS.BTC,
    decimals: 8,
    displayDecimals: 8,
    icon: require('assets/coin/btc.svg'),
  },
];

export const LITECOIN_COINS: COIN[] = [
  {
    chainId: CHAINIDS.LITECOIN,
    name: COINS.LTC,
    isMainCoin: true,
    symbol: COINS.LTC,
    decimals: 8,
    displayDecimals: 8,
    icon: require('assets/coin/ltc.svg'),
  },
];

export const XRP_COINS: COIN[] = [
  {
    chainId: CHAINIDS.XRP,
    name: COINS.XRP,
    isMainCoin: true,
    symbol: COINS.XRP,
    decimals: 18,
    displayDecimals: 8,
    icon: require('assets/coin/xrp.svg'),
  },
];

export const BITCOINCASH_COINS: COIN[] = [
  {
    chainId: CHAINIDS.BITCOINCASH,
    name: COINS.BCH,
    isMainCoin: true,
    symbol: COINS.BCH,
    decimals: 8,
    displayDecimals: 8,
    icon: require('assets/coin/bch.svg'),
  },
];

export const ETHEREUM_COINS: COIN[] = [
  {
    chainId: CHAINIDS.ETHEREUM,
    name: COINS.ETH,
    isMainCoin: true,
    symbol: COINS.ETH,
    decimals: 18,
    displayDecimals: 8,
    icon: require('assets/coin/eth.svg'),
  },
  {
    chainId: CHAINIDS.ETHEREUM,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    icon: require('assets/coin/usdt.svg'),
  },
  {
    chainId: CHAINIDS.ETHEREUM,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    icon: require('assets/coin/usdc.svg'),
  },
  {
    chainId: CHAINIDS.ETHEREUM,
    name: COINS.DAI,
    isMainCoin: false,
    symbol: COINS.DAI,
    decimals: 18,
    displayDecimals: 2,
    contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    icon: require('assets/coin/dai.svg'),
  },
];

export const TRON_COINS: COIN[] = [
  {
    chainId: CHAINIDS.TRON,
    name: COINS.TRX,
    isMainCoin: true,
    symbol: COINS.TRX,
    decimals: 6,
    displayDecimals: 4,
    icon: require('assets/coin/trx.svg'),
  },
  {
    chainId: CHAINIDS.TRON,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 4,
    contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    icon: require('assets/coin/usdt.svg'),
  },
  {
    chainId: CHAINIDS.TRON,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 4,
    contractAddress: 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8',
    icon: require('assets/coin/usdc.svg'),
  },
];

export const SOLANA_COINS: COIN[] = [
  {
    chainId: CHAINIDS.SOLANA,
    name: COINS.SOL,
    isMainCoin: true,
    symbol: COINS.SOL,
    decimals: 9,
    displayDecimals: 6,
    icon: require('assets/coin/sol.svg'),
  },
  {
    chainId: CHAINIDS.SOLANA,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    icon: require('assets/coin/usdt.svg'),
  },
  {
    chainId: CHAINIDS.SOLANA,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    icon: require('assets/coin/usdc.svg'),
  },
];

export const BSC_COINS: COIN[] = [
  {
    chainId: CHAINIDS.BSC,
    name: COINS.BNB,
    isMainCoin: true,
    symbol: COINS.BNB,
    decimals: 18,
    displayDecimals: 8,
    icon: require('assets/coin/bnb.svg'),
  },
  {
    chainId: CHAINIDS.BSC,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 18,
    displayDecimals: 8,
    contractAddress: '0x55d398326f99059ff775485246999027b3197955',
    icon: require('assets/coin/usdt.svg'),
  },
  {
    chainId: CHAINIDS.BSC,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 18,
    displayDecimals: 8,
    contractAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    icon: require('assets/coin/usdc.svg'),
  },
];

export const ARBITRUM_COINS: COIN[] = [
  {
    chainId: CHAINIDS.ARBITRUM_ONE,
    name: COINS.ETH,
    isMainCoin: true,
    symbol: COINS.ETH,
    decimals: 18,
    displayDecimals: 8,
    icon: require('assets/coin/eth.svg'),
  },
  {
    chainId: CHAINIDS.ARBITRUM_ONE,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    icon: require('assets/coin/usdt.svg'),
  },
  {
    chainId: CHAINIDS.ARBITRUM_ONE,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    icon: require('assets/coin/usdc.svg'),
  },
  {
    chainId: CHAINIDS.ARBITRUM_ONE,
    name: COINS.DAI,
    isMainCoin: false,
    symbol: COINS.DAI,
    decimals: 18,
    displayDecimals: 2,
    contractAddress: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    icon: require('assets/coin/dai.svg'),
  },
];

export const ARBITRUM_NOVA_COINS: COIN[] = [
  {
    chainId: CHAINIDS.ARBITRUM_ONE,
    name: COINS.ETH,
    isMainCoin: true,
    symbol: COINS.ETH,
    decimals: 18,
    displayDecimals: 8,
    icon: require('assets/coin/eth.svg'),
  },
  {
    chainId: CHAINIDS.ARBITRUM_ONE,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0x750ba8b76187092b0d1e87e28daaf484d1b5273b',
    icon: require('assets/coin/usdc.svg'),
  },
  {
    chainId: CHAINIDS.ARBITRUM_ONE,
    name: COINS.DAI,
    isMainCoin: false,
    symbol: COINS.DAI,
    decimals: 18,
    displayDecimals: 2,
    contractAddress: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    icon: require('assets/coin/dai.svg'),
  },
];

export const AVALANCHE_COINS: COIN[] = [
  {
    chainId: CHAINIDS.AVALANCHE,
    name: COINS.AVAX,
    isMainCoin: true,
    symbol: COINS.AVAX,
    decimals: 18,
    displayDecimals: 8,
    icon: require('assets/coin/avax.svg'),
  },
  {
    chainId: CHAINIDS.AVALANCHE,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    icon: require('assets/coin/usdt.svg'),
  },
  {
    chainId: CHAINIDS.AVALANCHE,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    icon: require('assets/coin/usdc.svg'),
  },
];

export const POLYGON_COINS: COIN[] = [
  {
    chainId: CHAINIDS.POLYGON,
    name: COINS.POL,
    isMainCoin: true,
    symbol: COINS.POL,
    decimals: 18,
    displayDecimals: 8,
    icon: require('assets/coin/pol.svg'),
  },
  {
    chainId: CHAINIDS.POLYGON,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    icon: require('assets/coin/usdt.svg'),
  },
  {
    chainId: CHAINIDS.POLYGON,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    icon: require('assets/coin/usdc.svg'),
  },
];

export const BASE_COINS: COIN[] = [
  {
    chainId: CHAINIDS.BASE,
    name: COINS.ETH,
    isMainCoin: true,
    symbol: COINS.ETH,
    decimals: 18,
    displayDecimals: 8,
    icon: require('assets/coin/eth.svg'),
  },
  {
    chainId: CHAINIDS.BASE,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    icon: require('assets/coin/usdc.svg'),
  },
];

export const OPTIMISM_COINS: COIN[] = [
  {
    chainId: CHAINIDS.OPTIMISM,
    name: COINS.ETH,
    isMainCoin: true,
    symbol: COINS.ETH,
    decimals: 18,
    displayDecimals: 8,
    icon: require('assets/coin/eth.svg'),
  },
  {
    chainId: CHAINIDS.OPTIMISM,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 4,
    contractAddress: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    icon: require('assets/coin/usdt.svg'),
  },
  {
    chainId: CHAINIDS.OPTIMISM,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 4,
    contractAddress: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
    icon: require('assets/coin/usdc.svg'),
  },
  {
    chainId: CHAINIDS.OPTIMISM,
    name: COINS.DAI,
    isMainCoin: false,
    symbol: COINS.DAI,
    decimals: 18,
    displayDecimals: 2,
    contractAddress: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    icon: require('assets/coin/dai.svg'),
  },
];

export const TON_COINS: COIN[] = [
  {
    chainId: CHAINIDS.TON,
    name: COINS.TON,
    isMainCoin: true,
    symbol: COINS.TON,
    decimals: 9,
    displayDecimals: 9,
    icon: require('assets/coin/ton.svg'),
  },
  {
    chainId: CHAINIDS.TON,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 4,
    contractAddress: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs',
    icon: require('assets/coin/usdt.svg'),
  },
];

export type BLOCKCHAIN = {
  name: CHAINNAMES;
  desc: string;
  chainId: CHAINIDS;
  explorerUrl?: string;
  websiteUrl?: string;
  rpc?: string[];
  icon?: any;

  coins: COIN[];

  time?: number;
};

export const BLOCKCHAINNAMES: BLOCKCHAIN[] = [
  {
    name: CHAINNAMES.BITCOIN,
    desc: 'Bitcoin is a decentralized digital currency that operates on a peer-to-peer network, enabling secure, anonymous transactions worldwide.',
    chainId: CHAINIDS.BITCOIN,
    explorerUrl: 'https://mempool.space',
    websiteUrl: 'https://bitcoin.org',
    coins: BITCOIN_COINS,
    rpc: ['https://mempool.space'],
    icon: require('assets/chain/bitcoin.svg'),
  },
  {
    name: CHAINNAMES.LITECOIN,
    desc: 'Litecoin is a peer-to-peer cryptocurrency created as a faster, more scalable alternative to Bitcoin, with lower transaction fees.',
    chainId: CHAINIDS.LITECOIN,
    explorerUrl: 'https://litecoinspace.org',
    websiteUrl: 'https://litecoin.org',
    coins: LITECOIN_COINS,
    rpc: ['https://litecoinspace.org'],
    icon: require('assets/chain/litecoin.svg'),
  },
  {
    name: CHAINNAMES.XRP,
    desc: 'The XRP Ledger (XRPL) is a decentralized, public blockchain led by a global community of businesses and developers looking to solve problems and create value.',
    chainId: CHAINIDS.XRP,
    explorerUrl: 'livenet.xrpl.org',
    websiteUrl: 'https://xrpl.org',
    coins: XRP_COINS,
    rpc: [],
    icon: require('assets/chain/xrp.svg'),
  },
  {
    name: CHAINNAMES.BITCOINCASH,
    desc: "Bitcoin Cash is the money of the future. It's borderless. It's secure. It's electronic cash! Info about Bitcoin Cash (BCH) for users, developers, and businesses.",
    chainId: CHAINIDS.BITCOINCASH,
    explorerUrl: 'https://blockexplorer.one/bitcoin-cash/mainnet',
    websiteUrl: 'https://bitcoincash.org',
    coins: BITCOINCASH_COINS,
    rpc: [],
    icon: require('assets/chain/bitcoincash.svg'),
  },
  {
    name: CHAINNAMES.ETHEREUM,
    desc: 'Ethereum is a decentralized blockchain platform that supports smart contracts and decentralized applications (dApps), enabling programmable transactions.',
    chainId: CHAINIDS.ETHEREUM,
    explorerUrl: 'https://etherscan.io',
    websiteUrl: 'https://ethereum.org/en',
    coins: ETHEREUM_COINS,
    rpc: ['https://ethereum-rpc.publicnode.com'],
    icon: require('assets/chain/ethereum.svg'),
  },
  {
    name: CHAINNAMES.TRON,
    desc: 'Tron is dedicated to accelerating the decentralization of the Internet via blockchain technology and decentralized applications (DApps).',
    chainId: CHAINIDS.TRON,
    explorerUrl: 'https://tronscan.org',
    websiteUrl: 'https://tron.network',
    coins: TRON_COINS,
    rpc: [],
    icon: require('assets/chain/tron.svg'),
  },
  {
    name: CHAINNAMES.SOLANA,
    desc: 'Solana is a high-performance blockchain platform designed for fast, secure, and scalable decentralized applications and cryptocurrency transactions.',
    chainId: CHAINIDS.SOLANA,
    explorerUrl: 'https://explorer.solana.com',
    websiteUrl: 'https://solana.com',
    coins: SOLANA_COINS,
    rpc: [],
    icon: require('assets/chain/solana.svg'),
  },
  {
    name: CHAINNAMES.BSC,
    desc: 'Binance Smart Chain (BSC) is a high-speed, low-cost blockchain platform for building decentralized applications and executing smart contracts.',
    chainId: CHAINIDS.BSC,
    explorerUrl: 'https://bscscan.com',
    websiteUrl: 'https://binance.com',
    coins: BSC_COINS,
    rpc: [
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed4.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed2.defibit.io',
      'https://bsc-dataseed3.defibit.io',
      'https://bsc-dataseed4.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed2.ninicoin.io',
      'https://bsc-dataseed3.ninicoin.io',
      'https://bsc-dataseed4.ninicoin.io',
    ],
    icon: require('assets/chain/bsc.svg'),
  },
  {
    name: CHAINNAMES.ARBITRUM,
    desc: 'The ultimate Layer 2 scaling solution designed to enhance your Ethereum experience. Build faster, scale seamlessly, and unlock the full potential of the leading Layer 1 ecosystem.',
    chainId: CHAINIDS.ARBITRUM_ONE,
    explorerUrl: 'https://arbiscan.io',
    websiteUrl: 'https://arbitrum.io',
    coins: ARBITRUM_COINS,
    rpc: [
      'https://arb1.arbitrum.io/rpc',
      // 'https://arbitrum.llamarpc.com',
      // 'https://arbitrum.meowrpc.com',
      'https://arbitrum.drpc.org',
      'https://arbitrum-one.publicnode.com',
      'https://arbitrum-one-rpc.publicnode.com',
      'https://1rpc.io/arb',
    ],
    icon: require('assets/chain/arbitrum.svg'),
  },
  {
    name: CHAINNAMES.ARBITRUMNOVA,
    desc: 'The list of ERC-20 Tokens and their Prices, Market Capitalizations and the Number of Holders in the Arbitrum Nova Blockchain on Arbitrum Nova.',
    chainId: CHAINIDS.ARBITRUM_NOVA,
    explorerUrl: 'https://nova.arbiscan.io',
    websiteUrl: 'https://nova.arbitrum.io',
    coins: ARBITRUM_NOVA_COINS,
    rpc: ['https://nova.arbitrum.io/rpc'],
    icon: require('assets/chain/arbitrumnova.svg'),
  },
  {
    name: CHAINNAMES.AVALANCHE,
    desc: 'Avalanche is a smart contracts platform that scales infinitely and regularly finalizes transactions in less than one second. Build anything you want, any way you want, on the eco-friendly blockchain designed for Web3 developers.',
    chainId: CHAINIDS.AVALANCHE,
    explorerUrl: 'https://snowtrace.io',
    websiteUrl: 'https://www.avax.network',
    coins: AVALANCHE_COINS,
    rpc: [
      'https://avalanche-c-chain-rpc.publicnode.com',
      'https://avalanche.drpc.org',
      // 'https://avax.meowrpc.com',
      'https://1rpc.io/avax/c',
    ],
    icon: require('assets/chain/avalanche.svg'),
  },
  {
    name: CHAINNAMES.POLYGON,
    desc: 'Enabling an infinitely scalable web of sovereign blockchains that feels like a single chain. Powered by ZK tech.',
    chainId: CHAINIDS.POLYGON,
    explorerUrl: 'https://polygonscan.com',
    websiteUrl: 'https://polygon.technology',
    coins: POLYGON_COINS,
    rpc: ['https://polygon-bor-rpc.publicnode.com', 'https://polygon-pokt.nodies.app', 'https://1rpc.io/matic'],
    icon: require('assets/chain/polygon.svg'),
  },
  {
    name: CHAINNAMES.BASE,
    desc: 'Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.',
    chainId: CHAINIDS.BASE,
    explorerUrl: 'https://basescan.org',
    websiteUrl: 'https://www.base.org',
    coins: BASE_COINS,
    rpc: [
      // 'https://base.llamarpc.com',
      'https://mainnet.base.org',
      'https://developer-access-mainnet.base.org',
      'https://1rpc.io/base',
      'https://base-pokt.nodies.app',
      // 'https://base.meowrpc.com',
      'https://base-rpc.publicnode.com',
      // 'https://base.drpc.org',
    ],
    icon: require('assets/chain/base.svg'),
  },
  {
    name: CHAINNAMES.OPTIMISM,
    desc: 'Optimism is a Collective of companies, communities, and citizens working together to reward public goods and build a sustainable future for Ethereum.',
    chainId: CHAINIDS.OPTIMISM,
    explorerUrl: 'https://optimistic.etherscan.io',
    websiteUrl: 'https://www.optimism.io',
    coins: OPTIMISM_COINS,
    rpc: [
      'https://mainnet.optimism.io',
      'https://optimism-rpc.publicnode.com',
      'https://op-pokt.nodies.app',
      'https://1rpc.io/op',
    ],
    icon: require('assets/chain/optimism.svg'),
  },
  {
    name: CHAINNAMES.TON,
    desc: 'A decentralized and open internet, created by the community using a technology designed by Telegram.',
    chainId: CHAINIDS.TON,
    explorerUrl: 'https://tonscan.org',
    websiteUrl: 'https://ton.org',
    coins: TON_COINS,
    rpc: ['https://tonscan.org'],
    icon: require('assets/chain/ton.svg'),
  },
];
