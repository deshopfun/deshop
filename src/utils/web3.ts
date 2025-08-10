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
import {
  GetBlockchainAddressUrl as GetBTCBlockchainAddressUrl,
  GetBlockchainTxUrl as GetBTCBlockchainTxUrl,
} from './chain/btc';
import {
  GetBlockchainAddressUrl as GetLtcBlockchainAddressUrl,
  GetBlockchainTxUrl as GetLtcBlockchainTxUrl,
} from './chain/ltc';
import {
  GetBlockchainAddressUrl as GetXrpBlockchainAddressUrl,
  GetBlockchainTxUrl as GetXrpBlockchainTxUrl,
} from './chain/xrp';
import {
  GetBlockchainAddressUrl as GetBchBlockchainAddressUrl,
  GetBlockchainTxUrl as GetBchBlockchainTxUrl,
} from './chain/bch';
import {
  GetBlockchainAddressUrl as GetETHBlockchainAddressUrl,
  GetBlockchainTxUrl as GetETHBlockchainTxUrl,
} from './chain/eth';
import {
  GetBlockchainAddressUrl as GetTronBlockchainAddressUrl,
  GetBlockchainTxUrl as GetTronBlockchainTxUrl,
} from './chain/tron';
import {
  GetBlockchainAddressUrl as GetSolanaBlockchainAddressUrl,
  GetBlockchainTxUrl as GetSolanaBlockchainTxUrl,
} from './chain/solana';
import {
  GetBlockchainAddressUrl as GetBscBlockchainAddressUrl,
  GetBlockchainTxUrl as GetBscBlockchainTxUrl,
} from './chain/bsc';
import {
  GetBlockchainAddressUrl as GetArbNovaBlockchainAddressUrl,
  GetBlockchainTxUrl as GetArbNovaBlockchainTxUrl,
} from './chain/arbnova';
import {
  GetBlockchainAddressUrl as GetArbBlockchainAddressUrl,
  GetBlockchainTxUrl as GetArbBlockchainTxUrl,
} from './chain/arb';
import {
  GetBlockchainAddressUrl as GetAvaxBlockchainAddressUrl,
  GetBlockchainTxUrl as GetAvaxBlockchainTxUrl,
} from './chain/avax';
import {
  GetBlockchainAddressUrl as GetPolBlockchainAddressUrl,
  GetBlockchainTxUrl as GetPolBlockchainTxUrl,
} from './chain/pol';
import {
  GetBlockchainAddressUrl as GetBaseBlockchainAddressUrl,
  GetBlockchainTxUrl as GetBaseBlockchainTxUrl,
} from './chain/base';
import {
  GetBlockchainAddressUrl as GetOpBlockchainAddressUrl,
  GetBlockchainTxUrl as GetOpBlockchainTxUrl,
} from './chain/op';
import {
  GetBlockchainAddressUrl as GetTonBlockchainAddressUrl,
  GetBlockchainTxUrl as GetTonBlockchainTxUrl,
} from './chain/ton';

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

export function GetBlockchainTxUrlByChainIds(chainids: CHAINIDS, hash: string): string {
  switch (chainids) {
    case CHAINIDS.BITCOIN:
      return GetBTCBlockchainTxUrl(hash);
    case CHAINIDS.LITECOIN:
      return GetLtcBlockchainTxUrl(hash);
    case CHAINIDS.XRP:
      return GetXrpBlockchainTxUrl(hash);
    case CHAINIDS.BITCOINCASH:
      return GetBchBlockchainTxUrl(hash);
    case CHAINIDS.ETHEREUM:
      return GetETHBlockchainTxUrl(hash);
    case CHAINIDS.TRON:
      return GetTronBlockchainTxUrl(hash);
    case CHAINIDS.SOLANA:
      return GetSolanaBlockchainTxUrl(hash);
    case CHAINIDS.BSC:
      return GetBscBlockchainTxUrl(hash);
    case CHAINIDS.ARBITRUM_ONE:
      return GetArbBlockchainTxUrl(hash);
    case CHAINIDS.ARBITRUM_NOVA:
      return GetArbNovaBlockchainTxUrl(hash);
    case CHAINIDS.AVALANCHE:
      return GetAvaxBlockchainTxUrl(hash);
    case CHAINIDS.POLYGON:
      return GetPolBlockchainTxUrl(hash);
    case CHAINIDS.BASE:
      return GetBaseBlockchainTxUrl(hash);
    case CHAINIDS.OPTIMISM:
      return GetOpBlockchainTxUrl(hash);
    case CHAINIDS.TON:
      return GetTonBlockchainTxUrl(hash);
    default:
      return '';
  }
}

export function GetBlockchainAddressUrlByChainIds(chainids: CHAINIDS, address: string): string {
  switch (chainids) {
    case CHAINIDS.BITCOIN:
      return GetBTCBlockchainAddressUrl(address);
    case CHAINIDS.LITECOIN:
      return GetLtcBlockchainAddressUrl(address);
    case CHAINIDS.XRP:
      return GetXrpBlockchainAddressUrl(address);
    case CHAINIDS.BITCOINCASH:
      return GetBchBlockchainAddressUrl(address);
    case CHAINIDS.ETHEREUM:
      return GetETHBlockchainAddressUrl(address);
    case CHAINIDS.TRON:
      return GetTronBlockchainAddressUrl(address);
    case CHAINIDS.SOLANA:
      return GetSolanaBlockchainAddressUrl(address);
    case CHAINIDS.BSC:
      return GetBscBlockchainAddressUrl(address);
    case CHAINIDS.ARBITRUM_ONE:
      return GetArbBlockchainAddressUrl(address);
    case CHAINIDS.ARBITRUM_NOVA:
      return GetArbNovaBlockchainAddressUrl(address);
    case CHAINIDS.AVALANCHE:
      return GetAvaxBlockchainAddressUrl(address);
    case CHAINIDS.POLYGON:
      return GetPolBlockchainAddressUrl(address);
    case CHAINIDS.BASE:
      return GetBaseBlockchainAddressUrl(address);
    case CHAINIDS.OPTIMISM:
      return GetOpBlockchainAddressUrl(address);
    case CHAINIDS.TON:
      return GetTonBlockchainAddressUrl(address);
    default:
      return '';
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
