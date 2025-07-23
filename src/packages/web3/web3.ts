import { ChainAccountType, QRCodeText, WalletAccountType } from './types';
import { Bip39 } from './bip39';
import { CHAINIDS, CHAINS } from 'packages/constants';
import { BTC } from './chain/btc';
import { ETH } from './chain/eth';
import { SOLANA } from './chain/solana';
import { LTC } from './chain/ltc';
import { TRON } from './chain/tron';
import { TON } from './chain/ton';
import { BITCOINCASH } from './chain/bitcoincash';
import { XRP } from './chain/xrp';
import { BSC } from './chain/bsc';
import { ARB } from './chain/arb';
import { AVAX } from './chain/avalanche';
import { POL } from './chain/pol';
import { BASE } from './chain/base';
import { OP } from './chain/op';
import { ARBNOVA } from './chain/arbnova';

export class WEB3 {
  // support: Import and generate wallet
  static async generateWallet(mnemonic: string = ''): Promise<WalletAccountType> {
    const isGenerate = mnemonic === '' ? true : false;

    if (mnemonic !== '' && !Bip39.validateMnemonic(mnemonic)) throw new Error('Invalid mnemonic');
    mnemonic = mnemonic === '' ? Bip39.generateMnemonic() : mnemonic;

    const seed = await Bip39.generateSeed(mnemonic);

    // mainnet
    const mainnetAccount = await this.createAccountBySeed(seed, mnemonic);

    return {
      isGenerate: isGenerate,
      mnemonic: mnemonic,
      account: [...mainnetAccount],
    };
  }

  static async createAccountBySeed(seed: Buffer, mnemonic: string): Promise<Array<ChainAccountType>> {
    return await Promise.all([
      ...BTC.createAccountBySeed(seed),
      ETH.createAccountBySeed(seed),
      SOLANA.createAccountBySeed(seed),
      LTC.createAccountBySeed(seed),
      TRON.createAccountBySeed(seed),
      await TON.createAccountBySeed(seed, mnemonic),
      await BITCOINCASH.createAccountBySeed(seed, mnemonic),
      XRP.createAccountBySeed(seed, mnemonic),
    ]);
  }

  static async createAccountByPrivateKey(chain: CHAINS, privateKey: string): Promise<Array<ChainAccountType>> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.createAccountByPrivateKey(privateKey);
      case CHAINS.LITECOIN:
        return Array<ChainAccountType>(LTC.createAccountByPrivateKey(privateKey));
      case CHAINS.XRP:
        // return Array<ChainAccountType>(XRP.createAccountByPrivateKey( privateKey));
        return [];
      case CHAINS.BITCOINCASH:
        return Array<ChainAccountType>(await BITCOINCASH.createAccountByPrivateKey(privateKey));
      case CHAINS.ETHEREUM:
      case CHAINS.BSC:
      case CHAINS.ARBITRUM:
      case CHAINS.ARBITRUMNOVA:
      case CHAINS.AVALANCHE:
      case CHAINS.POLYGON:
      case CHAINS.BASE:
      case CHAINS.OPTIMISM:
        return Array<ChainAccountType>(ETH.createAccountByPrivateKey(privateKey));
      case CHAINS.TRON:
        return Array<ChainAccountType>(TRON.createAccountByPrivateKey(privateKey));
      case CHAINS.SOLANA:
        return Array<ChainAccountType>(SOLANA.createAccountByPrivateKey(privateKey));
      case CHAINS.TON:
        return Array<ChainAccountType>(await TON.createAccountByPrivateKey(privateKey));
      default:
        return [];
    }
  }

  static async checkAccountStatus(chain: CHAINS, address: string): Promise<number> {
    switch (chain) {
      case CHAINS.XRP:
        return (await XRP.checkAccountStatus(address)) ? 1 : 2;
      default:
        return 0;
    }
  }

  static async checkAddress(chain: CHAINS, address: string): Promise<boolean> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.checkAddress(address);
      case CHAINS.LITECOIN:
        return LTC.checkAddress(address);
      case CHAINS.XRP:
        return XRP.checkAddress(address);
      case CHAINS.BITCOINCASH:
        return await BITCOINCASH.checkAddress(address);
      case CHAINS.ETHEREUM:
      case CHAINS.BSC:
      case CHAINS.ARBITRUM:
      case CHAINS.ARBITRUMNOVA:
      case CHAINS.AVALANCHE:
      case CHAINS.POLYGON:
      case CHAINS.BASE:
      case CHAINS.OPTIMISM:
        return ETH.checkAddress(address);
      case CHAINS.TRON:
        return TRON.checkAddress(address);
      case CHAINS.SOLANA:
        return SOLANA.checkAddress(address);
      case CHAINS.TON:
        return TON.checkAddress(address);
      default:
        return false;
    }
  }

  static checkQRCodeText(chain: CHAINS, text: string): boolean {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.checkQRCodeText(text);
      case CHAINS.LITECOIN:
        return LTC.checkQRCodeText(text);
      case CHAINS.XRP:
        return XRP.checkQRCodeText(text);
      case CHAINS.BITCOINCASH:
        return BITCOINCASH.checkQRCodeText(text);
      case CHAINS.ETHEREUM:
        return ETH.checkQRCodeText(text);
      case CHAINS.TRON:
        return TRON.checkQRCodeText(text);
      case CHAINS.SOLANA:
        return SOLANA.checkQRCodeText(text);
      case CHAINS.BSC:
        return BSC.checkQRCodeText(text);
      case CHAINS.ARBITRUM:
        return ARB.checkQRCodeText(text);
      case CHAINS.AVALANCHE:
        return AVAX.checkQRCodeText(text);
      case CHAINS.POLYGON:
        return POL.checkQRCodeText(text);
      case CHAINS.BASE:
        return BASE.checkQRCodeText(text);
      case CHAINS.OPTIMISM:
        return OP.checkQRCodeText(text);
      case CHAINS.TON:
        return TON.checkQRCodeText(text);
      case CHAINS.ARBITRUMNOVA:
        return ARBNOVA.checkQRCodeText(text);
      default:
        return false;
    }
  }

  static parseQRCodeText(chain: CHAINS, text: string): QRCodeText {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.parseQRCodeText(text);
      case CHAINS.LITECOIN:
        return LTC.parseQRCodeText(text);
      case CHAINS.XRP:
        return XRP.parseQRCodeText(text);
      case CHAINS.BITCOINCASH:
        return BITCOINCASH.parseQRCodeText(text);
      case CHAINS.ETHEREUM:
        return ETH.parseQRCodeText(text);
      case CHAINS.TRON:
        return TRON.parseQRCodeText(text);
      case CHAINS.SOLANA:
        return SOLANA.parseQRCodeText(text);
      case CHAINS.BSC:
        return BSC.parseQRCodeText(text);
      case CHAINS.ARBITRUM:
        return ARB.parseQRCodeText(text);
      case CHAINS.AVALANCHE:
        return AVAX.parseQRCodeText(text);
      case CHAINS.POLYGON:
        return POL.parseQRCodeText(text);
      case CHAINS.BASE:
        return BASE.parseQRCodeText(text);
      case CHAINS.OPTIMISM:
        return OP.parseQRCodeText(text);
      case CHAINS.TON:
        return TON.parseQRCodeText(text);
      case CHAINS.ARBITRUMNOVA:
        return ARBNOVA.parseQRCodeText(text);
      default:
        return {} as QRCodeText;
    }
  }

  static generateQRCodeText(chain: CHAINS, address: string, contractAddress?: string, amount?: string): string {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.generateQRCodeText(address, amount);
      case CHAINS.LITECOIN:
        return LTC.generateQRCodeText(address, amount);
      case CHAINS.XRP:
        return XRP.generateQRCodeText(address, amount);
      case CHAINS.BITCOINCASH:
        return BITCOINCASH.generateQRCodeText(address, amount);
      case CHAINS.ETHEREUM:
        return ETH.generateQRCodeText(address, contractAddress, amount);
      case CHAINS.TRON:
        return TRON.generateQRCodeText(address, contractAddress, amount);
      case CHAINS.SOLANA:
        return SOLANA.generateQRCodeText(address, contractAddress, amount);
      case CHAINS.BSC:
        return BSC.generateQRCodeText(address, contractAddress, amount);
      case CHAINS.ARBITRUM:
        return ARB.generateQRCodeText(address, contractAddress, amount);
      case CHAINS.AVALANCHE:
        return AVAX.generateQRCodeText(address, contractAddress, amount);
      case CHAINS.POLYGON:
        return POL.generateQRCodeText(address, contractAddress, amount);
      case CHAINS.BASE:
        return BASE.generateQRCodeText(address, contractAddress, amount);
      case CHAINS.OPTIMISM:
        return OP.generateQRCodeText(address, contractAddress, amount);
      case CHAINS.TON:
        return TON.generateQRCodeText(address, contractAddress, amount);
      case CHAINS.ARBITRUMNOVA:
        return ARBNOVA.generateQRCodeText(address, contractAddress, amount);
      default:
        return '';
    }
  }

  static getChainIds(chain: CHAINS): CHAINIDS {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.getChainIds();
      case CHAINS.LITECOIN:
        return LTC.getChainIds();
      case CHAINS.XRP:
        return XRP.getChainIds();
      case CHAINS.BITCOINCASH:
        return BITCOINCASH.getChainIds();
      case CHAINS.ETHEREUM:
        return ETH.getChainIds();
      case CHAINS.TRON:
        return TRON.getChainIds();
      case CHAINS.SOLANA:
        return SOLANA.getChainIds();
      case CHAINS.BSC:
        return BSC.getChainIds();
      case CHAINS.ARBITRUM:
        return ARB.getChainIds();
      case CHAINS.ARBITRUMNOVA:
        return ARBNOVA.getChainIds();
      case CHAINS.AVALANCHE:
        return AVAX.getChainIds();
      case CHAINS.POLYGON:
        return POL.getChainIds();
      case CHAINS.BASE:
        return BASE.getChainIds();
      case CHAINS.OPTIMISM:
        return OP.getChainIds();
      case CHAINS.TON:
        return TON.getChainIds();
      default:
        return CHAINIDS.NONE;
    }
  }
}
