import { PRODUCT_TYPE } from 'packages/constants';

export function GetImgSrcByProductType(type: string): string {
  const baseUrl = window.location.origin;

  switch (type) {
    case PRODUCT_TYPE.WOMEN:
      return baseUrl + '/images/product/women.jpg';
    case PRODUCT_TYPE.MEN:
      return baseUrl + '/images/product/men.jpg';
    case PRODUCT_TYPE.BEAUTY:
      return baseUrl + '/images/product/beauty.jpg';
    case PRODUCT_TYPE.FOOD:
      return baseUrl + '/images/product/food.jpg';
    case PRODUCT_TYPE.BABY:
      return baseUrl + '/images/product/baby.jpg';
    case PRODUCT_TYPE.HOME:
      return baseUrl + '/images/product/home.jpg';
    case PRODUCT_TYPE.FITNESS:
      return baseUrl + '/images/product/fitness.jpg';
    case PRODUCT_TYPE.ACCESSORIES:
      return baseUrl + '/images/product/accessories.jpg';
    case PRODUCT_TYPE.PET:
      return baseUrl + '/images/product/pet.jpg';
    case PRODUCT_TYPE.GAMES:
      return baseUrl + '/images/product/games.jpg';
    case PRODUCT_TYPE.ELECTRONICS:
      return baseUrl + '/images/product/electronics.jpg';
    case PRODUCT_TYPE.ARTS:
      return baseUrl + '/images/product/arts.jpg';
    case PRODUCT_TYPE.LUGGAGE:
      return baseUrl + '/images/product/luggage.jpg';
    case PRODUCT_TYPE.SPORTING:
      return baseUrl + '/images/product/sporting.jpg';
    default:
      return '';
  }
}
