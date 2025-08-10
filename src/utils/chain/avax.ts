export function GetBlockchainTxUrl(hash: string): string {
  return `https://snowtrace.io/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://snowtrace.io/address/${address}`;
}
