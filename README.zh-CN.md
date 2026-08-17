<div align="center">

# DeShop

**去中心化数字资产交易平台 · Decentralized Digital Exchange Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

[官网](https://deshop.space) · [问题反馈](https://github.com/deshopfun/deshop/issues) · [提交 PR](https://github.com/deshopfun/deshop/pulls)

</div>

---

## 📖 简介

**DeShop** 是一个基于 Web3 的去中心化数字资产交易平台，用户无需依赖中心化机构托管资金，即可通过自己的钱包直接完成资产的连接、查看与交易。项目原生支持多条主流公链，前端使用 Next.js 16 + React 19 构建，界面基于 Tailwind CSS 4 与 shadcn/ui 组件库，提供流畅、现代的交互体验。

线上体验地址：**[deshop.space](https://deshop.space)**

## ✨ 核心特性

- 🔗 **多链钱包接入**：通过 [Reown AppKit](https://reown.com/appkit)（原 WalletConnect）+ [wagmi](https://wagmi.sh/) / [viem](https://viem.sh/) 一键连接 EVM 系钱包（MetaMask、OKX Wallet 等）
- 🌐 **多公链资产支持**：原生集成以下链的资产读取与交易能力
  - EVM 系（Ethereum 及兼容链）— `ethers` / `viem` / `wagmi`
  - Solana — `@solana/web3.js`
  - TON — `@ton/core` / `@ton/crypto` / `@ton/ton`
  - Bitcoin — `bitcoinjs-lib` / `bip32` / `bip39` / `ecpair` / `tiny-secp256k1`
  - Tron — `tronweb`
  - XRP Ledger — `xrpl`
  - Bitcoin Cash 等 — `mainnet-js`
- 📡 **实时行情/推送**：内置 WebSocket 连接（`NEXT_PUBLIC_WS_BASE_URL`），实时同步行情与订单状态
- 🎨 **现代化 UI**：Tailwind CSS 4 + shadcn/ui + Radix UI，配合 `lucide-react` 图标库与 `swiper` 轮播组件
- 🗂️ **轻量状态管理**：使用 [Zustand](https://zustand-demo.pmnd.rs/) 管理全局状态，[TanStack Query](https://tanstack.com/query) 处理异步数据请求与缓存
- 🌍 **国际化友好**：内置 `country-flag-icons`，便于多地区/多语言场景扩展
- 📱 **二维码收款/连接**：集成 `qrcode.react`，支持钱包地址、支付信息等二维码展示
- 🔒 **安全性**：使用 `dompurify` 对富文本内容进行 XSS 净化，`decimal.js` 保证金额计算精度
- 🐳 **容器化部署**：提供 `Dockerfile` 与 `deploy.sh` 一键部署脚本

## 🛠️ 技术栈

| 分类       | 技术选型                                                                        |
| ---------- | ------------------------------------------------------------------------------- |
| 框架       | [Next.js 16](https://nextjs.org/)（App Router）+ [React 19](https://react.dev/) |
| 语言       | TypeScript                                                                      |
| 样式       | Tailwind CSS 4 / shadcn/ui / Radix UI / class-variance-authority                |
| 状态管理   | Zustand                                                                         |
| 数据请求   | TanStack Query / Axios                                                          |
| 钱包连接   | Reown AppKit / wagmi / viem                                                     |
| 区块链 SDK | ethers.js、@solana/web3.js、@ton/ton、bitcoinjs-lib、tronweb、xrpl、mainnet-js  |
| 工具库     | decimal.js、dompurify、marked、qrcode.react、swiper                             |
| 部署       | Docker                                                                          |

## 🚀 快速开始

### 环境要求

- Node.js `^16.0.0 || ^18.0.0 || >=20.0.0`
- 包管理器：Yarn（推荐，仓库内含 `yarn.lock`）

### 1. 克隆项目

```bash
git clone https://github.com/deshopfun/deshop.git
cd deshop
```

### 2. 安装依赖

```bash
yarn install
```

### 3. 配置环境变量

复制环境变量模板并按需填写：

```bash
cp .env.example .env
```

| 变量名                                 | 说明                                                                                     | 示例                         |
| -------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------- |
| `NEXT_PUBLIC_ENVIRONMENT`              | 运行环境标识                                                                             | `development` / `production` |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Reown / WalletConnect 项目 ID，需在 [Reown Dashboard](https://dashboard.reown.com/) 申请 | `your_project_id`            |
| `NEXT_PUBLIC_WS_BASE_URL`              | 行情/推送 WebSocket 服务地址                                                             | `ws://127.0.0.1:8899`        |
| `NEXT_PUBLIC_SITE_URL`                 | 站点访问地址                                                                             | `https://deshop.space`       |

### 4. 启动开发环境

```bash
yarn dev
```

默认监听端口为 **9999**，访问 [http://localhost:9999](http://localhost:9999) 即可预览。

### 5. 构建与生产运行

```bash
yarn build
yarn start
```

### 6. 代码检查

```bash
yarn lint
```

## 🐳 使用 Docker 部署

项目自带 `Dockerfile` 与 `deploy.sh` 部署脚本，可快速构建镜像并运行：

```bash
# 构建镜像
docker build -t deshop .

# 运行容器
docker run -d -p 9999:9999 --env-file .env --name deshop deshop
```

或直接执行仓库内的部署脚本：

```bash
./deploy.sh
```

## 📁 项目结构

```
deshop/
├── public/              # 静态资源
├── src/                 # 源码目录（页面、组件、hooks、状态、区块链交互逻辑等）
├── .env.example          # 环境变量模板
├── Dockerfile             # Docker 构建文件
├── deploy.sh              # 部署脚本
├── next.config.ts         # Next.js 配置
├── components.json        # shadcn/ui 组件配置
└── package.json
```

## 🤝 参与贡献

欢迎通过 Issue 或 Pull Request 参与项目共建：

1. Fork 本仓库
2. 新建分支：`git checkout -b feature/your-feature`
3. 提交修改：`git commit -m 'feat: add some feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 发起 Pull Request

提交前请确保通过 `yarn lint` 检查，并遵循项目内 Prettier 代码风格（见 `.prettierrc.json`）。

## 📄 License

本项目基于 [MIT License](./LICENSE) 开源。

## ⚠️ 免责声明

DeShop 涉及数字资产与区块链钱包交互，请务必：

- 妥善保管私钥、助记词，切勿泄露给任何第三方
- 在正式环境部署前，充分测试各链交互逻辑
- 自行承担因使用本项目所产生的资产风险

本项目仅提供技术实现，不构成任何投资建议。
