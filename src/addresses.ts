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
    bank: '0x85F92D853C5C6D74753df25e1dAC219CD66B2Ca5',
    nft: '0x83dfd9642871d034358FA3516A7d1C95eE061337',
    generator: '0x1cbDC8eFf4010DBD6EAf459F86c91f24387F411C',
    traits: '0x94E538D6877681142bb2Aa5526aC41555273F974'
  }
};

export const CONTRACTS = CONTRACTS_CONFIG[DESIRED_CHAIN_TYPE] as Addresses;
