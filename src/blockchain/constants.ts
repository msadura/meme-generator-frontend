import { Chain, ChainType } from '@app/blockchain/types';
import { IS_DEV, USE_TESTNET_DEV } from '@app/constants';

const CHAINS_CONFIG = {
  avax: {
    id: 43114,
    name: 'Avalanche',
    token: 'AVAX'
  },
  avaxFuji: {
    id: 43113,
    name: 'Avax FUJI',
    token: 'AVAX'
  },
  mainnet: {
    id: 1,
    name: 'Ethereum Mainnet',
    token: 'ETH'
  },
  rinkeby: {
    id: 4,
    name: 'Ethereum Rinkeby',
    token: 'ETH'
  }
};

export const CHAINS: Record<ChainType, Chain> = {
  [ChainType.avax]: IS_DEV && USE_TESTNET_DEV ? CHAINS_CONFIG.avaxFuji : CHAINS_CONFIG.avax,
  [ChainType.eth]: IS_DEV && USE_TESTNET_DEV ? CHAINS_CONFIG.mainnet : CHAINS_CONFIG.rinkeby
};

export const DESIRED_CHAIN = CHAINS_CONFIG.rinkeby;
