export function GetBlockchainTxUrl(hash: string): string {
  return `https://litecoinspace.org/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://litecoinspace.org/address/${address}`;
}

export function GetNodeApi(): string {
  return 'https://litecoinspace.org/api';
}
