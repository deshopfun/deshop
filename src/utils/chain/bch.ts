export function GetBlockchainTxUrl(hash: string): string {
  return `https://explorer.melroy.org/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://explorer.melroy.org/address/${address}`;
}
