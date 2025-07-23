import * as bitcoin from 'bitcoinjs-lib';
import { CHAINIDS, CHAINS, COINS, INNERCHAINNAMES } from 'packages/constants/blockchain';
import { BTCTYPE, ChainAccountType, QRCodeText } from '../types';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';

export class BTC {
  static chain = CHAINS.BITCOIN;

  static getNetwork(): bitcoin.Network {
    return bitcoin.networks.bitcoin;
  }

  static getChainIds(): CHAINIDS {
    return CHAINIDS.BITCOIN;
  }

  static getChainName(): INNERCHAINNAMES {
    return INNERCHAINNAMES.BITCOIN;
  }

  static getType(note: string): BTCTYPE {
    switch (note) {
      case 'NATIVESEGWIT':
        return BTCTYPE.NATIVESEGWIT;
      case 'NESTEDSEGWIT':
        return BTCTYPE.NESTEDSEGWIT;
      case 'TAPROOT':
        return BTCTYPE.TAPROOT;
      case 'LEGACY':
        return BTCTYPE.LEGACY;
      default:
        throw new Error('Not support the BTCTYPE');
    }
  }

  static createAccountBySeed(seed: Buffer): ChainAccountType[] {
    bitcoin.initEccLib(ecc);

    let accounts: Array<ChainAccountType> = [];

    const nativeSegwitPath = `m/84'/0'/0'/0/0`;
    const nestedSegwitPath = `m/49'/0'/0'/0/0`;
    const taprootPath = `m/86'/0'/0'/0/0`;
    const legacyPath = `m/44'/0'/0'/0/0`;

    try {
      const bip32 = BIP32Factory(ecc);
      const node = bip32.fromSeed(seed, this.getNetwork());

      // nativeSegwit
      const nativeSegwitPrivateKey = node.derivePath(nativeSegwitPath).privateKey?.toString('hex');
      // node.derivePath(nativeSegwitPath).toWIF()
      const nativeSegwitAddress = this.getAddressP2wpkhFromPrivateKey(nativeSegwitPrivateKey as string);

      accounts.push({
        chain: this.chain,
        address: nativeSegwitAddress as string,
        privateKey: nativeSegwitPrivateKey,
        note: BTCTYPE.NATIVESEGWIT,
      });

      // nestedSegwit
      const nestedSegwitPrivateKey = node.derivePath(nestedSegwitPath).privateKey?.toString('hex');
      const nestedSegwitAddress = this.getAddressP2shP2wpkhFromPrivateKey(nestedSegwitPrivateKey as string);

      accounts.push({
        chain: this.chain,
        address: nestedSegwitAddress as string,
        privateKey: nestedSegwitPrivateKey,
        note: BTCTYPE.NESTEDSEGWIT,
      });

      // taproot
      const taprootPrivateKey = node.derivePath(taprootPath).privateKey?.toString('hex');
      const taprootAddress = this.getAddressP2trFromPrivateKey(taprootPrivateKey as string);

      accounts.push({
        chain: this.chain,
        address: taprootAddress as string,
        privateKey: taprootPrivateKey,
        note: BTCTYPE.TAPROOT,
      });

      // legacy
      const legacyPrivateKey = node.derivePath(legacyPath).privateKey?.toString('hex');
      const legacyAddress = this.getAddressP2pkhFromPrivateKey(legacyPrivateKey as string);

      accounts.push({
        chain: this.chain,
        address: legacyAddress as string,
        privateKey: legacyPrivateKey,
        note: BTCTYPE.LEGACY,
      });

      return accounts;
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of btc');
    }
  }

  static createAccountByPrivateKey(privateKey: string): Array<ChainAccountType> {
    try {
      let accounts: Array<ChainAccountType> = [];

      // nativeSegwit
      const nativeSegwitAddress = this.getAddressP2wpkhFromPrivateKey(privateKey);

      accounts.push({
        chain: this.chain,
        address: nativeSegwitAddress as string,
        privateKey: privateKey,
        note: 'Native Segwit',
      });

      // nestedSegwit
      const nestedSegwitAddress = this.getAddressP2shP2wpkhFromPrivateKey(privateKey);

      accounts.push({
        chain: this.chain,
        address: nestedSegwitAddress as string,
        privateKey: privateKey,
        note: 'Nested Segwit',
      });

      // taproot
      const taprootAddress = this.getAddressP2trFromPrivateKey(privateKey);

      accounts.push({
        chain: this.chain,
        address: taprootAddress as string,
        privateKey: privateKey,
        note: 'Taproot',
      });

      // legacy
      const legacyAddress = this.getAddressP2pkhFromPrivateKey(privateKey);

      accounts.push({
        chain: this.chain,
        address: legacyAddress as string,
        privateKey: privateKey,
        note: 'Legacy',
      });

      return accounts;
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of btc');
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

  // p2sh-p2wpkh
  static getAddressP2shP2wpkhFromPrivateKey(privateKey: string): string {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.fromWIF(this.toWifStaring(privateKey), this.getNetwork());
    const p2 = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.getNetwork() }),
      network: this.getNetwork(),
    });
    return p2.address as string;
  }

  // p2tr
  static getAddressP2trFromPrivateKey(privateKey: string): string {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.fromWIF(this.toWifStaring(privateKey), this.getNetwork());
    const p2tr = bitcoin.payments.p2tr({
      internalPubkey: keyPair.publicKey.subarray(1, 33),
      network: this.getNetwork(),
    });

    return p2tr.address as string;
  }

  // p2pkh
  static getAddressP2pkhFromPrivateKey(privateKey: string): string {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.fromWIF(this.toWifStaring(privateKey), this.getNetwork());
    const p2pkh = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: this.getNetwork() });
    p2pkh.output;
    return p2pkh.address as string;
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
          case INNERCHAINNAMES.BITCOIN:
            break;
          default:
            throw new Error('Invalid QR code text format');
        }

        amount = matchText[7];
        token = COINS.BTC;
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
