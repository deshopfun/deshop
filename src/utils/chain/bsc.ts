export function GetBlockchainTxUrl(hash: string): string {
  return `https://bscscan.com/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://bscscan.com/address/${address}`;
}
