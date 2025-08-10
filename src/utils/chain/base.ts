export function GetBlockchainTxUrl(hash: string): string {
  return `https://basescan.org/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://basescan.org/address/${address}`;
}
