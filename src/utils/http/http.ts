import { IS_DEVELOPMENT } from 'packages/constants';

export class Http {
  static httpPath = IS_DEVELOPMENT ? 'http://127.0.0.1:8899/api' : 'https://api.deshop.fun/api';

  static test = this.httpPath + '/client/test';

  static register = this.httpPath + '/client/register';
  static verify_invitation = this.httpPath + '/client/verify-invitation';
  static login = this.httpPath + '/client/login';
  static login_by_code = this.httpPath + '/client/login-by-code';
  static crypto_price = this.httpPath + '/client/crypto-price';
  static user_profile_by_username = this.httpPath + '/client/user-profile-by-username';
  static product_list = this.httpPath + '/client/product-list';
  static product_by_id = this.httpPath + '/client/product-by-id';
  static user_wallet_by_username = this.httpPath + '/client/user-wallet-by-username';

  // user
  static user_setting = this.httpPath + '/client/user/user-setting';
  static user_notification_setting = this.httpPath + '/client/user/user-notification-setting';
  static user_notification = this.httpPath + '/client/user/user-notification';
  static user_balance = this.httpPath + '/client/user/user-balance';

  // product
  static product = this.httpPath + '/client/product/product';
  static product_variant = this.httpPath + '/client/product/product-variant';

  // wallet
  static wallet = this.httpPath + '/client/wallet/wallet';

  // upload
  static upload_file = this.httpPath + '/client/upload/upload-file';
}
