export function GetBlockchainTxUrl(hash: string): string {
  return `https://tronscan.org/#/transaction/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://tronscan.org/#/address/${address}`;
}
