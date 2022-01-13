export enum ChainType {
  avax = 'avax',
  eth = 'eth',
  mumbai = 'mumbai'
}

export type Chain = {
  id: number;
  name: string;
  token: string;
};
