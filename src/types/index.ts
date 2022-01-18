import { TxStatus } from '@app/blockchain/usePendingTx';
import { ethers } from 'ethers';

export type Attribute = { trait_type: string; value: string };

export enum TextAlign {
  center = 'center',
  left = 'left',
  right = 'right'
}

export type MemeTextAttrs = {
  size: number;
  stroke: string;
  color: string;
  align: TextAlign;
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

export type Meme = {
  id: number;
  imageHash: string;
  name: string;
  hashtags?: string[];
  theme: string;
  height?: number;
  width?: number;
};

export type Theme = {
  box_count: number;
  height: number;
  width: number;
  id: string;
  name: string;
  url: string;
};
