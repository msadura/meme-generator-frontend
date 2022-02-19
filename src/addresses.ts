import { DESIRED_CHAIN_TYPE } from './blockchain/constants';
import { ChainType } from '@app/blockchain/types';
type Addresses = {
  bank: string;
  nft: string;
  generator: string;
  traits: string;
};

type AddressesConfig = Partial<Record<ChainType, Addresses>>;

export const CONTRACTS_CONFIG: AddressesConfig = {
  [ChainType.matic]: {
    bank: '0xf12AD43B7d9A8c9170DF7F0b66CC2cD6608f2C01',
    nft: '0x1B390F58cdC1d2080f068697916633Fe82418478',
    generator: '0x62310Cb79fcbc2E0783730CdE1d5C7B6f534F14E',
    traits: '0x5994BbfEB614a435AB1Dde59a9738150B037DC97'
  }
};

export const CONTRACTS = CONTRACTS_CONFIG[DESIRED_CHAIN_TYPE] as Addresses;
