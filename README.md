<div align="center">

# DeShop

**Decentralized Digital Exchange Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

[Live Site](https://deshop.space) · [Report an Issue](https://github.com/deshopfun/deshop/issues) · [Submit a PR](https://github.com/deshopfun/deshop/pulls)

</div>

---

## 📖 Overview

**DeShop** is a Web3-native decentralized digital asset exchange platform. Users connect their own wallets to view balances and trade directly, without relying on a centralized custodian to hold their funds. The project ships with native support for multiple major blockchains, and the frontend is built with Next.js 16 + React 19, styled with Tailwind CSS 4 and shadcn/ui for a modern, responsive experience.

Live demo: **[deshop.space](https://deshop.space)**

## ✨ Key Features

- 🔗 **Multi-chain wallet connection** — One-click wallet connection for EVM chains (MetaMask, OKX Wallet, etc.) via [Reown AppKit](https://reown.com/appkit) (formerly WalletConnect) + [wagmi](https://wagmi.sh/) / [viem](https://viem.sh/)
- 🌐 **Multi-chain asset support** — Native integration for reading and transacting assets across:
  - EVM chains (Ethereum & compatible networks) — `ethers` / `viem` / `wagmi`
  - Solana — `@solana/web3.js`
  - TON — `@ton/core` / `@ton/crypto` / `@ton/ton`
  - Bitcoin — `bitcoinjs-lib` / `bip32` / `bip39` / `ecpair` / `tiny-secp256k1`
  - Tron — `tronweb`
  - XRP Ledger — `xrpl`
  - Bitcoin Cash & related chains — `mainnet-js`
- 📡 **Real-time market data** — Built-in WebSocket connection (`NEXT_PUBLIC_WS_BASE_URL`) for live price feeds and order status updates
- 🎨 **Modern UI** — Tailwind CSS 4 + shadcn/ui + Radix UI, complemented by `lucide-react` icons and `swiper` carousels
- 🗂️ **Lightweight state management** — [Zustand](https://zustand-demo.pmnd.rs/) for global state, [TanStack Query](https://tanstack.com/query) for async data fetching and caching
- 🌍 **Localization-ready** — Ships with `country-flag-icons` for easy multi-region/multi-language expansion
- 📱 **QR code support** — Integrated `qrcode.react` for displaying wallet addresses, payment info, and more
- 🔒 **Security-conscious** — `dompurify` sanitizes rich-text content against XSS, `decimal.js` ensures precise monetary calculations
- 🐳 **Containerized deployment** — Comes with a `Dockerfile` and `deploy.sh` for one-command deployment

## 🛠️ Tech Stack

| Category          | Technology                                                                      |
| ----------------- | ------------------------------------------------------------------------------- |
| Framework         | [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) |
| Language          | TypeScript                                                                      |
| Styling           | Tailwind CSS 4 / shadcn/ui / Radix UI / class-variance-authority                |
| State Management  | Zustand                                                                         |
| Data Fetching     | TanStack Query / Axios                                                          |
| Wallet Connection | Reown AppKit / wagmi / viem                                                     |
| Blockchain SDKs   | ethers.js, @solana/web3.js, @ton/ton, bitcoinjs-lib, tronweb, xrpl, mainnet-js  |
| Utilities         | decimal.js, dompurify, marked, qrcode.react, swiper                             |
| Deployment        | Docker                                                                          |

## 🚀 Getting Started

### Prerequisites

- Node.js `^16.0.0 || ^18.0.0 || >=20.0.0`
- Package manager: Yarn (recommended — the repo includes a `yarn.lock`)

### 1. Clone the repository

```bash
git clone https://github.com/deshopfun/deshop.git
cd deshop
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Configure environment variables

Copy the environment template and fill in the values as needed:

```bash
cp .env.example .env
```

| Variable                               | Description                                                                                         | Example                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------- |
| `NEXT_PUBLIC_ENVIRONMENT`              | Runtime environment identifier                                                                      | `development` / `production` |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Reown / WalletConnect project ID, obtained from the [Reown Dashboard](https://dashboard.reown.com/) | `your_project_id`            |
| `NEXT_PUBLIC_WS_BASE_URL`              | WebSocket endpoint for market data / push notifications                                             | `ws://127.0.0.1:8899`        |
| `NEXT_PUBLIC_SITE_URL`                 | Public site URL                                                                                     | `https://deshop.space`       |

### 4. Run the development server

```bash
yarn dev
```

The dev server listens on port **9999** by default — visit [http://localhost:9999](http://localhost:9999) to preview.

### 5. Build and run in production

```bash
yarn build
yarn start
```

### 6. Lint the code

```bash
yarn lint
```

## 🐳 Deploy with Docker

The project ships with a `Dockerfile` and a `deploy.sh` script for quick image builds and deployment:

```bash
# Build the image
docker build -t deshop .

# Run the container
docker run -d -p 9999:9999 --env-file .env --name deshop deshop
```

Or run the bundled deployment script directly:

```bash
./deploy.sh
```

## 📁 Project Structure

```
deshop/
├── public/              # Static assets
├── src/                 # Source code (pages, components, hooks, state, blockchain logic, etc.)
├── .env.example          # Environment variable template
├── Dockerfile             # Docker build file
├── deploy.sh              # Deployment script
├── next.config.ts         # Next.js configuration
├── components.json        # shadcn/ui component configuration
└── package.json
```

## 🤝 Contributing

Contributions are welcome via Issues or Pull Requests:

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please make sure `yarn lint` passes before submitting, and follow the project's Prettier code style (see `.prettierrc.json`).

## 📄 License

This project is open-sourced under the [MIT License](./LICENSE).

## ⚠️ Disclaimer

DeShop interacts with digital assets and blockchain wallets. Please make sure to:

- Keep your private keys and seed phrases safe, and never share them with anyone
- Thoroughly test cross-chain interaction logic before deploying to production
- Take full responsibility for any asset risk arising from the use of this project

This project provides technical implementation only and does not constitute investment advice.
