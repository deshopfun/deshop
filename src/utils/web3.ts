import { BLOCKCHAINNAMES, CHAINIDS, CHAINNAMES, CHAINS, COIN } from 'packages/constants';

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

export function FindChainNamesByChains(chains: CHAINS): CHAINNAMES {
  switch (chains) {
    case CHAINS.BITCOIN:
      return CHAINNAMES.BITCOIN;
    case CHAINS.LITECOIN:
      return CHAINNAMES.LITECOIN;
    case CHAINS.XRP:
      return CHAINNAMES.XRP;
    case CHAINS.BITCOINCASH:
      return CHAINNAMES.BITCOINCASH;
    case CHAINS.ETHEREUM:
      return CHAINNAMES.ETHEREUM;
    case CHAINS.TRON:
      return CHAINNAMES.TRON;
    case CHAINS.SOLANA:
      return CHAINNAMES.SOLANA;
    case CHAINS.BSC:
      return CHAINNAMES.BSC;
    case CHAINS.ARBITRUM:
      return CHAINNAMES.ARBITRUM;
    case CHAINS.ARBITRUMNOVA:
      return CHAINNAMES.ARBITRUMNOVA;
    case CHAINS.AVALANCHE:
      return CHAINNAMES.AVALANCHE;
    case CHAINS.POLYGON:
      return CHAINNAMES.POLYGON;
    case CHAINS.BASE:
      return CHAINNAMES.BASE;
    case CHAINS.OPTIMISM:
      return CHAINNAMES.OPTIMISM;
    case CHAINS.TON:
      return CHAINNAMES.TON;
  }
}
