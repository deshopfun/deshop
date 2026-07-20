export const APP_NAME = 'Deshop'
export const APP_DESCRIPTION = 'Decentralized Digital Exchange Platform'
export const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'development'
export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
export const IS_PRODUCATION = !IS_DEVELOPMENT
export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
