import { TxStatus } from '@app/blockchain/usePendingTx';
import { ethers } from 'ethers';

export type Attribute = { trait_type: string; value: string };

export type MemeTextAttrs = {
  size: number;
  stroke: string;
  color: string;
};

export type MemeText = {
  content: string;
} & MemeTextAttrs;

export type Metadata = {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
};

export type PendingTx = {
  tx: ethers.providers.TransactionResponse | null;
  status: TxStatus;
  message: string;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
};
