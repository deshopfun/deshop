export function GetBlockchainTxUrl(hash: string): string {
  return `https://arbiscan.io/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://arbiscan.io/address/${address}`;
}
