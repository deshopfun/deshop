import { CHAINIDS, COINS, INNERCHAINNAMES } from 'packages/constants/blockchain';
import { ChainAccountType, QRCodeText } from '../types';
import { Keypair, PublicKey } from '@solana/web3.js';
import { FindTokenByChainIdsAndContractAddress } from 'utils/web3';

export class SOLANA {
  static getChainIds(): CHAINIDS {
    return CHAINIDS.SOLANA;
  }

  static getChainName(): INNERCHAINNAMES {
    return INNERCHAINNAMES.SOLANA;
  }

  static createAccountBySeed(seed: Buffer): ChainAccountType {
    // const path = `m/44'/501'/0'/0`;

    try {
      const keypair = Keypair.fromSeed(Uint8Array.from(seed).slice(0, 32));
      const privateKey = keypair.secretKey.toString();
      const address = keypair.publicKey.toString();

      return {
        chain: this.getChainIds(),
        address: address,
        privateKey: privateKey,
        note: 'SOLANA',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of solana');
    }
  }

  static createAccountByPrivateKey(privateKey: string): ChainAccountType {
    try {
      const keypair = Keypair.fromSecretKey(Uint8Array.from(Buffer.from(privateKey)));
      const address = keypair.publicKey.toString();

      return {
        chain: this.getChainIds(),
        address: address,
        privateKey: privateKey,
        note: 'SOLANA',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of solana');
    }
  }

  static checkAddress(address: string): boolean {
    const publicKey = new PublicKey(address);
    return PublicKey.isOnCurve(publicKey);
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
          case INNERCHAINNAMES.SOLANA:
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
          token = COINS.SOL;
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
