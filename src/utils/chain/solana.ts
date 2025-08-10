export function GetBlockchainTxUrl(hash: string): string {
  return `https://explorer.solana.com/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://explorer.solana.com/address/${address}`;
}
