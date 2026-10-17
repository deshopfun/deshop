import { CHAINIDS } from '@/packages/constants/blockchain'

export interface WalletAccountType {
  isGenerate: boolean
  mnemonic: string
  account: Array<ChainAccountType>
}

export interface ChainAccountType {
  chain: CHAINIDS
  address: string
  privateKey?: string
  note?: string
}

export enum BTCTYPE {
  NATIVESEGWIT = 'NATIVESEGWIT',
  NESTEDSEGWIT = 'NESTEDSEGWIT',
  TAPROOT = 'TAPROOT',
  LEGACY = 'LEGACY',
}

export interface QRCodeText {
  networkString: string
  address: string
  token?: string
  tokenAddress?: string
  amount: string
}
