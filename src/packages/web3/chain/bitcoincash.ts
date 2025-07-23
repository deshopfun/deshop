import { Wallet } from 'mainnet-js';
import { CHAINIDS, CHAINS, COINS, INNERCHAINNAMES } from 'packages/constants/blockchain';
import { ChainAccountType, QRCodeText } from '../types';

export class BITCOINCASH {
  static chain = CHAINS.BITCOINCASH;

  static getChainIds(): CHAINIDS {
    return CHAINIDS.BITCOINCASH;
  }

  static getChainName(): INNERCHAINNAMES {
    return INNERCHAINNAMES.BITCOINCASH;
  }

  static async createAccountBySeed(seed: Buffer, mnemonic: string): Promise<ChainAccountType> {
    const path = `m/44'/1'/145'/0/0`;

    try {
      let wallet = await Wallet.fromSeed(mnemonic, path);

      return {
        chain: this.chain,
        address: wallet.toString(),
        privateKey: wallet.privateKeyWif,
        note: 'BITCOINCASH',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of bch');
    }
  }

  static async createAccountByPrivateKey(privateKey: string): Promise<ChainAccountType> {
    try {
      let wallet;

      wallet = await Wallet.fromWIF(privateKey);

      return {
        chain: this.chain,
        address: wallet.toString(),
        privateKey: privateKey,
        note: 'BITCOINCASH',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of bch');
    }
  }

  static async checkAddress(address: string): Promise<boolean> {
    try {
      await Wallet.watchOnly(address);

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static checkQRCodeText(text: string): boolean {
    const regex = `^(${this.getChainName()}|${this.getChainName()}):([^?]+)(\\?token=([^&]+)&amount=((\\d*\\.?\\d+))|\\?amount=((\\d*\\.?\\d+)))$`;

    try {
      const matchText = text.match(regex);
      if (matchText) {
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static parseQRCodeText(text: string): QRCodeText {
    const regex = `^(${this.getChainName()}|${this.getChainName()}):([^?]+)(\\?token=([^&]+)&amount=((\\d*\\.?\\d+))|\\?amount=((\\d*\\.?\\d+)))$`;

    try {
      const matchText = text.match(regex);

      let networkString = '';
      let address = '';
      let token = '';
      let tokenAddress = '';
      let amount = '';

      if (matchText) {
        networkString = matchText[1];
        address = matchText[2];

        switch (networkString) {
          case INNERCHAINNAMES.BITCOINCASH:
            break;
          default:
            throw new Error('Invalid QR code text format');
        }

        amount = matchText[7];
        token = COINS.BCH;
      }

      return {
        networkString,
        address,
        token,
        tokenAddress,
        amount,
      };
    } catch (e) {
      console.error(e);
      return {} as QRCodeText;
    }
  }

  static generateQRCodeText(address: string, amount?: string): string {
    let qrcodeText = `${this.getChainName()}:${address}?`;

    amount = amount || '0';

    qrcodeText += `amount=${amount}`;

    return qrcodeText;
  }
}
