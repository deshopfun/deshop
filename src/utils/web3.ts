import { BLOCKCHAINNAMES, CHAINIDS, CHAINNAMES, COIN, COINS } from 'packages/constants';
import {
  bitcoin,
  mainnet,
  tron,
  solana,
  bsc,
  arbitrum,
  arbitrumNova,
  avalanche,
  polygon,
  base,
  optimism,
  AppKitNetwork,
} from '@reown/appkit/networks';

export function FindTokenByChainIdsAndContractAddress(chainIds: CHAINIDS, contractAddress: string): COIN {
  const coins = BLOCKCHAINNAMES.find((item) => item.chainId === chainIds)?.coins;
  const token = coins?.find((item) => item.contractAddress?.toLowerCase() === contractAddress.toLowerCase());
  return token as COIN;
}

export function FindTokenByChainIdsAndSymbol(chainIds: CHAINIDS, symbol: COINS): COIN {
  const coins = BLOCKCHAINNAMES.find((item) => item.chainId === chainIds)?.coins;
  const token = coins?.find((item) => item.symbol?.toLowerCase() === symbol.toLowerCase());
  return token as COIN;
}

export function FindChainNamesByChainids(chainIds: CHAINIDS): CHAINNAMES {
  switch (chainIds) {
    case CHAINIDS.BITCOIN:
      return CHAINNAMES.BITCOIN;
    case CHAINIDS.LITECOIN:
      return CHAINNAMES.LITECOIN;
    case CHAINIDS.XRP:
      return CHAINNAMES.XRP;
    case CHAINIDS.BITCOINCASH:
      return CHAINNAMES.BITCOINCASH;
    case CHAINIDS.ETHEREUM:
      return CHAINNAMES.ETHEREUM;
    case CHAINIDS.TRON:
      return CHAINNAMES.TRON;
    case CHAINIDS.SOLANA:
      return CHAINNAMES.SOLANA;
    case CHAINIDS.BSC:
      return CHAINNAMES.BSC;
    case CHAINIDS.ARBITRUM_ONE:
      return CHAINNAMES.ARBITRUM;
    case CHAINIDS.ARBITRUM_NOVA:
      return CHAINNAMES.ARBITRUMNOVA;
    case CHAINIDS.AVALANCHE:
      return CHAINNAMES.AVALANCHE;
    case CHAINIDS.POLYGON:
      return CHAINNAMES.POLYGON;
    case CHAINIDS.BASE:
      return CHAINNAMES.BASE;
    case CHAINIDS.OPTIMISM:
      return CHAINNAMES.OPTIMISM;
    case CHAINIDS.TON:
      return CHAINNAMES.TON;
    default:
      return CHAINNAMES.BITCOIN;
  }
}

export function GetAllSupportAppKitNetwork(): [AppKitNetwork, ...AppKitNetwork[]] {
  return [bitcoin, mainnet, tron, solana, bsc, arbitrum, arbitrumNova, avalanche, polygon, base, optimism];
}

export function GetWalletConnectNetworkByChainids(chainIds: CHAINIDS): AppKitNetwork {
  switch (chainIds) {
    case CHAINIDS.BITCOIN:
      return bitcoin;
    case CHAINIDS.LITECOIN:
      break;
    case CHAINIDS.XRP:
      break;
    case CHAINIDS.BITCOINCASH:
      break;
    case CHAINIDS.ETHEREUM:
      return mainnet;
    case CHAINIDS.TRON:
      return tron;
    case CHAINIDS.SOLANA:
      return solana;
    case CHAINIDS.BSC:
      return bsc;
    case CHAINIDS.ARBITRUM_ONE:
      return arbitrum;
    case CHAINIDS.ARBITRUM_NOVA:
      return arbitrumNova;
    case CHAINIDS.AVALANCHE:
      return avalanche;
    case CHAINIDS.POLYGON:
      return polygon;
    case CHAINIDS.BASE:
      return base;
    case CHAINIDS.OPTIMISM:
      return optimism;
    case CHAINIDS.TON:
      break;
  }

  return mainnet;
}
