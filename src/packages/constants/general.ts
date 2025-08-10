export const APP_NAME = 'DESHOP';
export const APP_DESCRIPTION = 'Decentralized cryptocurrency exchange';
export const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'development';
export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';
export const IS_PRODUCATION = !IS_DEVELOPMENT;

export const STATIC_ASSETS = '';
export const WALLETCONNECT_PROJECT_ID = process.env.WALLETCONNECT_PROJECT_ID || 'db22437d7de9e742b9646aef64f6c9e0';
