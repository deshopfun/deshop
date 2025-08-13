import { CHAINIDS, COINS, INNERCHAINNAMES } from 'packages/constants/blockchain';
import { ChainAccountType, QRCodeText } from '../types';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { TronWeb } from 'tronweb';
import { FindTokenByChainIdsAndContractAddress } from 'utils/web3';

export class TRON {
  static getChainIds(): CHAINIDS {
    return CHAINIDS.TRON;
  }

  static getChainName(): INNERCHAINNAMES {
    return INNERCHAINNAMES.TRON;
  }

  static createAccountBySeed(seed: Buffer): ChainAccountType {
    const path = `m/44'/195'/0'/0/0`;

    try {
      const hdkey = HDKey.fromMasterSeed(Uint8Array.from(seed)).derive(path);

      const privateKey = Buffer.from(hdkey.privateKey as Uint8Array).toString('hex');
      const address = TronWeb.address.fromPrivateKey(privateKey);

      return {
        chain: this.getChainIds(),
        address: String(address),
        privateKey: privateKey,
        note: 'TRON',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of tron');
    }
  }

  static createAccountByPrivateKey(privateKey: string): ChainAccountType {
    try {
      const address = TronWeb.address.fromPrivateKey(privateKey);

      return {
        chain: this.getChainIds(),
        address: String(address),
        privateKey: privateKey,
        note: 'TRON',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of tron');
    }
  }

  static checkAddress(address: string): boolean {
    return TronWeb.isAddress(address);
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
          case INNERCHAINNAMES.TRON:
            break;
          default:
            throw new Error('Invalid QR code text format');
        }

        if (matchText[4] !== undefined) {
          tokenAddress = matchText[4];
          amount = matchText[6];

          const coin = FindTokenByChainIdsAndContractAddress(this.getChainIds(), tokenAddress);
          token = coin.name;
        } else {
          amount = matchText[7];
          token = COINS.TRX;
        }
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

  static generateQRCodeText(address: string, contractAddress?: string, amount?: string): string {
    let qrcodeText = `${this.getChainName()}:${address}?`;

    amount = amount || '0';

    if (contractAddress) {
      qrcodeText += `token=${contractAddress}&amount=${amount}`;
    } else {
      qrcodeText += `amount=${amount}`;
    }

    return qrcodeText;
  }
}
