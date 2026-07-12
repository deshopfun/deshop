export const APP_NAME = 'DESHOP'
export const APP_DESCRIPTION = 'Decentralized Digital Exchange Platform'
export const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'development'
export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
export const IS_PRODUCATION = !IS_DEVELOPMENT

export const STATIC_ASSETS = ''
export const WALLETCONNECT_PROJECT_ID =
  process.env.WALLETCONNECT_PROJECT_ID || 'a3237b68315df229bdc08d45fc039e6b'
