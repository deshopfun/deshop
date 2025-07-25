import { ChainAccountType, QRCodeText, WalletAccountType } from './types';
import { Bip39 } from './bip39';
import { CHAINIDS } from 'packages/constants';
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

  static async createAccountByPrivateKey(chain: CHAINIDS, privateKey: string): Promise<Array<ChainAccountType>> {
    switch (chain) {
      case CHAINIDS.BITCOIN:
        return BTC.createAccountByPrivateKey(privateKey);
      case CHAINIDS.LITECOIN:
        return Array<ChainAccountType>(LTC.createAccountByPrivateKey(privateKey));
      case CHAINIDS.XRP:
        // return Array<ChainAccountType>(XRP.createAccountByPrivateKey( privateKey));
        return [];
      case CHAINIDS.BITCOINCASH:
        return Array<ChainAccountType>(await BITCOINCASH.createAccountByPrivateKey(privateKey));
      case CHAINIDS.ETHEREUM:
      case CHAINIDS.BSC:
      case CHAINIDS.ARBITRUM_ONE:
      case CHAINIDS.ARBITRUM_NOVA:
      case CHAINIDS.AVALANCHE:
      case CHAINIDS.POLYGON:
      case CHAINIDS.BASE:
      case CHAINIDS.OPTIMISM:
        return Array<ChainAccountType>(ETH.createAccountByPrivateKey(privateKey));
      case CHAINIDS.TRON:
        return Array<ChainAccountType>(TRON.createAccountByPrivateKey(privateKey));
      case CHAINIDS.SOLANA:
        return Array<ChainAccountType>(SOLANA.createAccountByPrivateKey(privateKey));
      case CHAINIDS.TON:
        return Array<ChainAccountType>(await TON.createAccountByPrivateKey(privateKey));
      default:
        return [];
    }
  }

  static async checkAccountStatus(chain: CHAINIDS, address: string): Promise<number> {
    switch (chain) {
      case CHAINIDS.XRP:
        return (await XRP.checkAccountStatus(address)) ? 1 : 2;
      default:
        return 0;
    }
  }

  static async checkAddress(chain: CHAINIDS, address: string): Promise<boolean> {
    switch (chain) {
      case CHAINIDS.BITCOIN:
        return BTC.checkAddress(address);
      case CHAINIDS.LITECOIN:
        return LTC.checkAddress(address);
      case CHAINIDS.XRP:
        return XRP.checkAddress(address);
      case CHAINIDS.BITCOINCASH:
        return await BITCOINCASH.checkAddress(address);
      case CHAINIDS.ETHEREUM:
      case CHAINIDS.BSC:
      case CHAINIDS.ARBITRUM_ONE:
      case CHAINIDS.ARBITRUM_NOVA:
      case CHAINIDS.AVALANCHE:
      case CHAINIDS.POLYGON:
      case CHAINIDS.BASE:
      case CHAINIDS.OPTIMISM:
        return ETH.checkAddress(address);
      case CHAINIDS.TRON:
        return TRON.checkAddress(address);
      case CHAINIDS.SOLANA:
        return SOLANA.checkAddress(address);
      case CHAINIDS.TON:
        return TON.checkAddress(address);
      default:
        return false;
    }
  }

  static checkQRCodeText(chain: CHAINIDS, text: string): boolean {
    switch (chain) {
      case CHAINIDS.BITCOIN:
        return BTC.checkQRCodeText(text);
      case CHAINIDS.LITECOIN:
        return LTC.checkQRCodeText(text);
      case CHAINIDS.XRP:
        return XRP.checkQRCodeText(text);
      case CHAINIDS.BITCOINCASH:
        return BITCOINCASH.checkQRCodeText(text);
      case CHAINIDS.ETHEREUM:
        return ETH.checkQRCodeText(text);
      case CHAINIDS.TRON:
        return TRON.checkQRCodeText(text);
      case CHAINIDS.SOLANA:
        return SOLANA.checkQRCodeText(text);
      case CHAINIDS.BSC:
        return BSC.checkQRCodeText(text);
      case CHAINIDS.ARBITRUM_ONE:
        return ARB.checkQRCodeText(text);
      case CHAINIDS.AVALANCHE:
        return AVAX.checkQRCodeText(text);
      case CHAINIDS.POLYGON:
        return POL.checkQRCodeText(text);
      case CHAINIDS.BASE:
        return BASE.checkQRCodeText(text);
      case CHAINIDS.OPTIMISM:
        return OP.checkQRCodeText(text);
      case CHAINIDS.TON:
        return TON.checkQRCodeText(text);
      case CHAINIDS.ARBITRUM_NOVA:
        return ARBNOVA.checkQRCodeText(text);
      default:
        return false;
    }
  }

  static parseQRCodeText(chain: CHAINIDS, text: string): QRCodeText {
    switch (chain) {
      case CHAINIDS.BITCOIN:
        return BTC.parseQRCodeText(text);
      case CHAINIDS.LITECOIN:
        return LTC.parseQRCodeText(text);
      case CHAINIDS.XRP:
        return XRP.parseQRCodeText(text);
      case CHAINIDS.BITCOINCASH:
        return BITCOINCASH.parseQRCodeText(text);
      case CHAINIDS.ETHEREUM:
        return ETH.parseQRCodeText(text);
      case CHAINIDS.TRON:
        return TRON.parseQRCodeText(text);
      case CHAINIDS.SOLANA:
        return SOLANA.parseQRCodeText(text);
      case CHAINIDS.BSC:
        return BSC.parseQRCodeText(text);
      case CHAINIDS.ARBITRUM_ONE:
        return ARB.parseQRCodeText(text);
      case CHAINIDS.AVALANCHE:
        return AVAX.parseQRCodeText(text);
      case CHAINIDS.POLYGON:
        return POL.parseQRCodeText(text);
      case CHAINIDS.BASE:
        return BASE.parseQRCodeText(text);
      case CHAINIDS.OPTIMISM:
        return OP.parseQRCodeText(text);
      case CHAINIDS.TON:
        return TON.parseQRCodeText(text);
      case CHAINIDS.ARBITRUM_NOVA:
        return ARBNOVA.parseQRCodeText(text);
      default:
        return {} as QRCodeText;
    }
  }

  static generateQRCodeText(chain: CHAINIDS, address: string, contractAddress?: string, amount?: string): string {
    switch (chain) {
      case CHAINIDS.BITCOIN:
        return BTC.generateQRCodeText(address, amount);
      case CHAINIDS.LITECOIN:
        return LTC.generateQRCodeText(address, amount);
      case CHAINIDS.XRP:
        return XRP.generateQRCodeText(address, amount);
      case CHAINIDS.BITCOINCASH:
        return BITCOINCASH.generateQRCodeText(address, amount);
      case CHAINIDS.ETHEREUM:
        return ETH.generateQRCodeText(address, contractAddress, amount);
      case CHAINIDS.TRON:
        return TRON.generateQRCodeText(address, contractAddress, amount);
      case CHAINIDS.SOLANA:
        return SOLANA.generateQRCodeText(address, contractAddress, amount);
      case CHAINIDS.BSC:
        return BSC.generateQRCodeText(address, contractAddress, amount);
      case CHAINIDS.ARBITRUM_ONE:
        return ARB.generateQRCodeText(address, contractAddress, amount);
      case CHAINIDS.AVALANCHE:
        return AVAX.generateQRCodeText(address, contractAddress, amount);
      case CHAINIDS.POLYGON:
        return POL.generateQRCodeText(address, contractAddress, amount);
      case CHAINIDS.BASE:
        return BASE.generateQRCodeText(address, contractAddress, amount);
      case CHAINIDS.OPTIMISM:
        return OP.generateQRCodeText(address, contractAddress, amount);
      case CHAINIDS.TON:
        return TON.generateQRCodeText(address, contractAddress, amount);
      case CHAINIDS.ARBITRUM_NOVA:
        return ARBNOVA.generateQRCodeText(address, contractAddress, amount);
      default:
        return '';
    }
  }

  static getChainIds(chain: CHAINIDS): CHAINIDS {
    switch (chain) {
      case CHAINIDS.BITCOIN:
        return BTC.getChainIds();
      case CHAINIDS.LITECOIN:
        return LTC.getChainIds();
      case CHAINIDS.XRP:
        return XRP.getChainIds();
      case CHAINIDS.BITCOINCASH:
        return BITCOINCASH.getChainIds();
      case CHAINIDS.ETHEREUM:
        return ETH.getChainIds();
      case CHAINIDS.TRON:
        return TRON.getChainIds();
      case CHAINIDS.SOLANA:
        return SOLANA.getChainIds();
      case CHAINIDS.BSC:
        return BSC.getChainIds();
      case CHAINIDS.ARBITRUM_ONE:
        return ARB.getChainIds();
      case CHAINIDS.ARBITRUM_NOVA:
        return ARBNOVA.getChainIds();
      case CHAINIDS.AVALANCHE:
        return AVAX.getChainIds();
      case CHAINIDS.POLYGON:
        return POL.getChainIds();
      case CHAINIDS.BASE:
        return BASE.getChainIds();
      case CHAINIDS.OPTIMISM:
        return OP.getChainIds();
      case CHAINIDS.TON:
        return TON.getChainIds();
      default:
        return CHAINIDS.NONE;
    }
  }
}
