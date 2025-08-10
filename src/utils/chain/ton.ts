export function GetBlockchainTxUrl(hash: string): string {
  return `https://tonscan.org/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://tonscan.org/address/${address}`;
}
