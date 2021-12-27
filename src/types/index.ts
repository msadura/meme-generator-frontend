import { TxStatus } from '@app/blockchain/usePendingTx';
import { ethers } from 'ethers';

export type SaleState = 'paused' | 'presale' | 'sale';

export enum AttributeType {
  head = 'Head',
  body = 'Body',
  clothes = 'Clothes',
  eyes = 'Eyes',
  background = 'Background',
  accessories = 'Accessories'
}

//todo - attribyte value as string!!
export type Attribute = { trait_type: AttributeType; value: string | number };

export type Metadata = {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
};

export type Traits = {
  isTemplar: boolean;
  rankIndex: number;
  [AttributeType.head]: number;
  [AttributeType.body]: number;
  [AttributeType.clothes]: number;
  [AttributeType.eyes]: number;
  [AttributeType.background]: number;
  [AttributeType.accessories]: number;
};

export type NftData = {
  metadata: Metadata;
};

export type Nft = NftData & {
  id: number;
  isTemplar: boolean;
  imgUrl: string;
  traits?: Traits;
};

export type Deposit = {
  nft: Nft;
  reward: ethers.BigNumber;
};

export type PendingTx = {
  tx: ethers.providers.TransactionResponse | null;
  status: TxStatus;
  message: string;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
};
