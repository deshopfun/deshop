export function GetBlockchainTxUrl(hash: string): string {
  return `https://livenet.xrpl.org/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://livenet.xrpl.org/accounts/${address}`;
}
