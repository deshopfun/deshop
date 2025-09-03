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
  static product_variant_by_option = this.httpPath + '/client/product-variant-by-option';
  static product_rating_by_id = this.httpPath + '/client/product-rating-by-id';
  static order_by_id = this.httpPath + '/client/order-by-id';
  static transaction_paste_tx_id = this.httpPath + '/client/transaction-paste-tx-id';
  static home_stat = this.httpPath + '/client/home-stat';

  // upload
  static upload_file = this.httpPath + '/client/upload-file';

  // user
  static user_setting = this.httpPath + '/client/user/user-setting';
  static user_notification_setting = this.httpPath + '/client/user/user-notification-setting';
  static user_notification = this.httpPath + '/client/user/user-notification';
  static user_balance = this.httpPath + '/client/user/user-balance';
  static user_manage = this.httpPath + '/client/user/user-manage';

  // product
  static product = this.httpPath + '/client/product/product';
  static product_by_login_id = this.httpPath + '/client/product/product-by-id';
  static product_base = this.httpPath + '/client/product/product-base';
  static product_option = this.httpPath + '/client/product/product-option';
  static product_image = this.httpPath + '/client/product/product-image';
  static product_variant = this.httpPath + '/client/product/product-variant';
  static product_rating = this.httpPath + '/client/product/product-rating';

  // order
  static order = this.httpPath + '/client/order/order';
  static order_confirm_payment = this.httpPath + '/client/order/confirm-payment';
  static order_confirm_shipping = this.httpPath + '/client/order/confirm-shipping';
  static order_confirm = this.httpPath + '/client/order/confirm';

  // transaction
  static transaction = this.httpPath + '/client/transaction/transaction';
  static transaction_by_id = this.httpPath + '/client/transaction/transaction-by-id';

  // wallet
  static wallet = this.httpPath + '/client/wallet/wallet';

  // address
  static address = this.httpPath + '/client/address/address';
  static address_by_uuid = this.httpPath + '/client/address/address-by-uuid';

  // collect
  static collect = this.httpPath + '/client/collect/collect';
}
