import { BLOCKCHAINNAMES, CHAINIDS, CHAINNAMES, COIN } from 'packages/constants';

export function FindTokenByChainIdsAndContractAddress(chainIds: CHAINIDS, contractAddress: string): COIN {
  const coins = BLOCKCHAINNAMES.find((item) => item.chainId === chainIds)?.coins;
  const token = coins?.find((item) => item.contractAddress?.toLowerCase() === contractAddress.toLowerCase());
  return token as COIN;
}

export function FindChainNamesByChainids(chains: CHAINIDS): CHAINNAMES {
  switch (chains) {
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
