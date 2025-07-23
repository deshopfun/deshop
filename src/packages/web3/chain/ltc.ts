import * as bitcoin from 'bitcoinjs-lib';
import { CHAINIDS, CHAINS, COINS, INNERCHAINNAMES } from 'packages/constants/blockchain';
import { ChainAccountType, QRCodeText } from '../types';
import * as ecc from 'tiny-secp256k1';
import BIP32Factory from 'bip32';
import { ECPairFactory } from 'ecpair';

export class LTC {
  static chain = CHAINS.LITECOIN;

  static getNetwork(): bitcoin.Network {
    return {
      messagePrefix: '\x19Litecoin Signed Message:\n',
      bech32: 'ltc',
      bip32: {
        public: 0x019da462,
        private: 0x019d9cfe,
      },
      pubKeyHash: 0x30,
      scriptHash: 0x32,
      wif: 0xb0,
    };
  }

  static getChainIds(): CHAINIDS {
    return CHAINIDS.LITECOIN;
  }

  static getChainName(): INNERCHAINNAMES {
    return INNERCHAINNAMES.LITECOIN;
  }

  static createAccountBySeed(seed: Buffer): ChainAccountType {
    bitcoin.initEccLib(ecc);

    const nativeSegwitPath = `m/84'/0'/0'/0/0`;

    try {
      const bip32 = BIP32Factory(ecc);
      const node = bip32.fromSeed(seed, this.getNetwork());

      // nativeSegwit
      const nativeSegwitPrivateKey = node.derivePath(nativeSegwitPath).privateKey?.toString('hex');
      const nativeSegwitAddress = this.getAddressP2wpkhFromPrivateKey(nativeSegwitPrivateKey as string);

      return {
        chain: this.chain,
        address: nativeSegwitAddress as string,
        privateKey: nativeSegwitPrivateKey,
        note: 'LITECOIN',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of ltc');
    }
  }

  static createAccountByPrivateKey(privateKey: string): ChainAccountType {
    try {
      // nativeSegwit
      const nativeSegwitAddress = this.getAddressP2wpkhFromPrivateKey(privateKey);

      return {
        chain: this.chain,
        address: nativeSegwitAddress as string,
        privateKey: privateKey,
        note: 'NATIVESEGWIT',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of ltc');
    }
  }

  static toWifStaring(privateKey: string): string {
    const ECPair = ECPairFactory(ecc);
    const privateKeyBytes = Buffer.from(privateKey, 'hex');
    const keyPair = ECPair.fromPrivateKey(privateKeyBytes, { network: this.getNetwork() });
    return keyPair.toWIF();
  }

  // p2wpkh
  static getAddressP2wpkhFromPrivateKey(privateKey: string): string {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.fromWIF(this.toWifStaring(privateKey), this.getNetwork());
    const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.getNetwork() });
    return p2wpkh.address as string;
  }

  static checkAddress(address: string): boolean {
    try {
      bitcoin.address.toOutputScript(address, this.getNetwork());
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
          case INNERCHAINNAMES.LITECOIN:
            break;
          default:
            throw new Error('Invalid QR code text format');
        }

        amount = matchText[7];
        token = COINS.LTC;
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
