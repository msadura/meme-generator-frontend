export enum ChainType {
  avax = 'avax',
  eth = 'eth'
}

export type Chain = {
  id: number;
  name: string;
  token: string;
};
