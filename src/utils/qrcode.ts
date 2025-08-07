import { CHAINIDS, COINS } from 'packages/constants/blockchain';
// import QRCode from 'qrcode';

// export function GenerateQrCode(content: string) {
//   return QRCode.toDataURL(content);
// }

export function GetImgSrcByCrypto(crypto: COINS): string {
  const baseUrl = window.location.origin;

  switch (crypto) {
    case COINS.BTC:
      return baseUrl + '/coin/btc.svg';
    case COINS.BTC_LN:
      return baseUrl + '/coin/btc_ln.svg';
    case COINS.ETH:
      return baseUrl + '/coin/eth.svg';
    case COINS.USDT:
      return baseUrl + '/coin/usdt.svg';
    case COINS.BNB:
      return baseUrl + '/coin/bnb.svg';
    case COINS.SOL:
      return baseUrl + '/coin/sol.svg';
    case COINS.USDC:
      return baseUrl + '/coin/usdc.svg';
    case COINS.XRP:
      return baseUrl + '/coin/xrp.svg';
    case COINS.TON:
      return baseUrl + '/coin/ton.svg';
    case COINS.TRX:
      return baseUrl + '/coin/trx.svg';
    case COINS.AVAX:
      return baseUrl + '/coin/avax.svg';
    case COINS.BCH:
      return baseUrl + '/coin/bch.svg';
    case COINS.DAI:
      return baseUrl + '/coin/dai.svg';
    case COINS.LTC:
      return baseUrl + '/coin/ltc.svg';
    case COINS.POL:
      return baseUrl + '/coin/pol.svg';

    default:
      return '';
  }
}

export function GetImgSrcByChain(chain: CHAINIDS): string {
  const baseUrl = window.location.origin;

  switch (chain) {
    case CHAINIDS.BITCOIN:
      return baseUrl + '/chain/bitcoin.svg';
    case CHAINIDS.LITECOIN:
      return baseUrl + '/chain/litecoin.svg';
    case CHAINIDS.XRP:
      return baseUrl + '/chain/xrp.svg';
    case CHAINIDS.BITCOINCASH:
      return baseUrl + '/chain/bitcoincash.svg';
    case CHAINIDS.ETHEREUM:
      return baseUrl + '/chain/ethereum.svg';
    case CHAINIDS.TRON:
      return baseUrl + '/chain/tron.svg';
    case CHAINIDS.SOLANA:
      return baseUrl + '/chain/solana.svg';
    case CHAINIDS.BSC:
      return baseUrl + '/chain/bsc.svg';
    case CHAINIDS.ARBITRUM_ONE:
      return baseUrl + '/chain/arbitrum.svg';
    case CHAINIDS.ARBITRUM_NOVA:
      return baseUrl + '/chain/arbitrumnova.svg';
    case CHAINIDS.AVALANCHE:
      return baseUrl + '/chain/avalanche.svg';
    case CHAINIDS.POLYGON:
      return baseUrl + '/chain/polygon.svg';
    case CHAINIDS.BASE:
      return baseUrl + '/chain/base.svg';
    case CHAINIDS.OPTIMISM:
      return baseUrl + '/chain/optimism.svg';
    case CHAINIDS.TON:
      return baseUrl + '/chain/ton.svg';

    default:
      return '';
  }
}
