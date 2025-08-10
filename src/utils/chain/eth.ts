export function GetBlockchainTxUrl(hash: string): string {
  return `https://etherscan.io/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://etherscan.io/address/${address}`;
}
