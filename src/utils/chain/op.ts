export function GetBlockchainTxUrl(hash: string): string {
  return `https://optimistic.etherscan.io/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://optimistic.etherscan.io/address/${address}`;
}
