import { CHAINIDS, CHAINS, COIN, COINS } from 'packages/constants/blockchain';

export type WalletAccountType = {
  isGenerate: boolean;
  mnemonic: string;
  account: Array<ChainAccountType>;
};

export type ChainAccountType = {
  chain: CHAINS;
  address: string;
  privateKey?: string;
  note?: string;
};

export enum BTCTYPE {
  NATIVESEGWIT = 'NATIVESEGWIT',
  NESTEDSEGWIT = 'NESTEDSEGWIT',
  TAPROOT = 'TAPROOT',
  LEGACY = 'LEGACY',
}

export type QRCodeText = {
  networkString: string;
  address: string;
  token?: string;
  tokenAddress?: string;
  amount: string;
};
