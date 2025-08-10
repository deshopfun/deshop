export function GetBlockchainTxUrl(hash: string): string {
  return `https://polygonscan.com/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://polygonscan.com/address/${address}`;
}
