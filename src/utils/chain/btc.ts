export function GetBlockchainTxUrl(hash: string): string {
  return `https://mempool.space/tx/${hash}`;
}

export function GetBlockchainAddressUrl(address: string): string {
  return `https://mempool.space/address/${address}`;
}

export function GetNodeApi(): string {
  return 'https://mempool.space/api';
}

export function GetBlockstreamApi(): string {
  return 'https://blockstream.info/api';
}
