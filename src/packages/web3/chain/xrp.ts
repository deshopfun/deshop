import { CHAINIDS, CHAINS, COINS, INNERCHAINNAMES } from 'packages/constants/blockchain';
import { ChainAccountType, QRCodeText } from '../types';
import { Client, isValidAddress, Wallet } from 'xrpl';

export class XRP {
  static chain = CHAINS.XRP;

  static getChainIds(): CHAINIDS {
    return CHAINIDS.XRP;
  }

  static getChainName(): INNERCHAINNAMES {
    return INNERCHAINNAMES.XRP;
  }

  static getXrpClient(): Client {
    const url = 'wss://xrplcluster.com';
    return new Client(url);
  }

  static createAccountBySeed(seed: Buffer, mnemonic: string): ChainAccountType {
    try {
      const wallet = Wallet.fromMnemonic(mnemonic);

      return {
        chain: this.chain,
        address: wallet.address as string,
        privateKey: wallet.privateKey,
        note: 'XRP',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of xrp');
    }
  }

  static createAccountByPrivateKey(privateKey: string): ChainAccountType {
    try {
      const wallet = Wallet.fromSecret(privateKey);

      return {
        chain: this.chain,
        address: wallet.address as string,
        privateKey: privateKey,
        note: 'XRP',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of xrp');
    }
  }

  static async checkAccountStatus(address: string): Promise<boolean> {
    const client = this.getXrpClient();

    try {
      await client.connect();

      await client.request({
        command: 'account_info',
        account: address,
      });

      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      await client.disconnect();
    }
  }

  static checkAddress(address: string): boolean {
    return isValidAddress(address);
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
          case INNERCHAINNAMES.XRP:
            break;
          default:
            throw new Error('Invalid QR code text format');
        }

        amount = matchText[7];
        token = COINS.XRP;
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
