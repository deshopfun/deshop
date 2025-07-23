import { CHAINIDS, CHAINS, COINS, INNERCHAINNAMES } from 'packages/constants/blockchain';
import { QRCodeText } from '../types';
import { FindTokenByChainIdsAndContractAddress } from 'utils/web3';

export class OP {
  static chain = CHAINS.OPTIMISM;

  static getChainIds(): CHAINIDS {
    return CHAINIDS.OPTIMISM;
  }

  static getChainName(): INNERCHAINNAMES {
    return INNERCHAINNAMES.OPTIMISM;
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
          case INNERCHAINNAMES.OPTIMISM:
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
          token = COINS.ETH;
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
