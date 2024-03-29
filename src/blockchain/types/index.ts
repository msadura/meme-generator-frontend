export enum ChainType {
  avax = 'avax',
  avaxFuji = 'avaxFuji',
  eth = 'eth',
  mumbai = 'mumbai',
  matic = 'matic',
  rinkeby = 'rinkeby'
}

export type NetworkConfig = {
  name: string;
  chain: string;
  rpc: string[];
  faucets: string[];
  nativeCurrency: { name: string; symbol: string; decimals: number };
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  explorers: { name: string; url: string; standard: string }[];
};

export type Chain = {
  id: number;
  name: string;
  token: string;
  config?: NetworkConfig;
  rpc: string;
  infuraKey?: string;
};
