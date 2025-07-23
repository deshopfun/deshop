import { PRODUCT_TYPE } from 'packages/constants';

export function GetImgSrcByProductType(type: string): string {
  const baseUrl = window.location.origin;

  switch (type) {
    case PRODUCT_TYPE.WOMEN:
      return baseUrl + '/images/product/women.png';
    case PRODUCT_TYPE.MEN:
      return baseUrl + '/images/product/men.png';
    case PRODUCT_TYPE.BEAUTY:
      return baseUrl + '/images/product/beauty.png';
    case PRODUCT_TYPE.FOOD:
      return baseUrl + '/images/product/food.png';
    case PRODUCT_TYPE.BABY:
      return baseUrl + '/images/product/baby.png';
    case PRODUCT_TYPE.HOME:
      return baseUrl + '/images/product/home.png';
    case PRODUCT_TYPE.FITNESS:
      return baseUrl + '/images/product/fitness.png';
    case PRODUCT_TYPE.ACCESSORIES:
      return baseUrl + '/images/product/accessories.png';
    case PRODUCT_TYPE.PET:
      return baseUrl + '/images/product/pet.png';
    case PRODUCT_TYPE.GAMES:
      return baseUrl + '/images/product/games.png';
    case PRODUCT_TYPE.ELECTRONICS:
      return baseUrl + '/images/product/electronics.png';
    case PRODUCT_TYPE.ARTS:
      return baseUrl + '/images/product/arts.png';
    case PRODUCT_TYPE.LUGGAGE:
      return baseUrl + '/images/product/luggage.png';
    case PRODUCT_TYPE.SPORTING:
      return baseUrl + '/images/product/sporting.png';
    default:
      return '';
  }
}
