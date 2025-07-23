import { BLOCKCHAINNAMES, CHAINIDS, CHAINS, COINS, INNERCHAINNAMES } from 'packages/constants/blockchain';
import { ChainAccountType, QRCodeText } from '../types';
import { FindTokenByChainIdsAndContractAddress } from 'utils/web3';
import { keyPairFromSecretKey, mnemonicToPrivateKey } from '@ton/crypto';
import { Address, WalletContractV4 } from '@ton/ton';

export class TON {
  static chain = CHAINS.TON;

  static getChainIds(): CHAINIDS {
    return CHAINIDS.TON;
  }

  static getChainName(): INNERCHAINNAMES {
    return INNERCHAINNAMES.TON;
  }

  static async createAccountBySeed(seed: Buffer, mnemonic: string): Promise<ChainAccountType> {
    const path = `m/44'/607'/0'/0/0`;

    try {
      const keyPair = await mnemonicToPrivateKey(mnemonic.split(' '));
      const publicKey = keyPair.publicKey;

      const wallet = WalletContractV4.create({
        publicKey: publicKey,
        workchain: 0,
      });

      const addressOptions = {
        urlSafe: true,
        bounceable: false,
      };

      const address = wallet.address.toString(addressOptions);

      return {
        chain: this.chain,
        address: address,
        privateKey: keyPair.secretKey.toString('hex'),
        note: 'TON',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of ton');
    }
  }

  static async createAccountByPrivateKey(privateKey: string): Promise<ChainAccountType> {
    try {
      const keypair = keyPairFromSecretKey(Buffer.from(privateKey));

      const wallet = WalletContractV4.create({
        publicKey: keypair.publicKey,
        workchain: 0,
      });

      const addressOptions = {
        urlSafe: true,
        bounceable: false,
        testOnly: false,
      };

      const address = wallet.address.toString(addressOptions);

      return {
        chain: this.chain,
        address: address,
        privateKey: privateKey,
        note: 'TON',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of ton');
    }
  }

  static checkAddress(address: string): boolean {
    try {
      Address.parse(address);
      return true;
    } catch (e) {
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
          case INNERCHAINNAMES.TON:
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
          token = COINS.TON;
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
