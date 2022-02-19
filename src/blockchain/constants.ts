import { NETWORKS_CONFIG } from '@app/blockchain/networksConfig';
import { Chain, ChainType } from '@app/blockchain/types';
import { IS_DEV, USE_TESTNET_DEV } from '@app/constants';

// Update this one to change chain used by the app
export const DESIRED_CHAIN_TYPE: ChainType = ChainType.matic;

const CHAINS_CONFIG: Record<ChainType, Chain> = {
  avax: {
    id: 43114,
    name: 'Avalanche',
    token: 'AVAX',
    rpc: ''
  },
  avaxFuji: {
    id: 43113,
    name: 'Avax FUJI',
    token: 'AVAX',
    rpc: ''
  },
  eth: {
    id: 1,
    name: 'Ethereum Mainnet',
    token: 'ETH',
    rpc: ''
  },
  rinkeby: {
    id: 4,
    name: 'Ethereum Rinkeby',
    token: 'ETH',
    rpc: ''
  },
  matic: {
    id: 137,
    name: 'Polygon (Matic)',
    token: 'MATIC',
    config: NETWORKS_CONFIG.matic,
    rpc: 'https://polygon-mainnet.infura.io/v3/998804b23fd0421e9bbea7c41917c2b3',
    infuraKey: '998804b23fd0421e9bbea7c41917c2b3'
  },
  mumbai: {
    id: 80001,
    name: 'Mumbai Testnet',
    token: 'MATIC',
    config: NETWORKS_CONFIG.mumbai,
    rpc: 'https://polygon-mumbai.g.alchemy.com/v2/p2KQ7TpI9C6Pn7jL8QbZoFpBcqDukHFY'
  }
};

export const CHAINS: Record<ChainType, Chain> = {
  [ChainType.avax]: IS_DEV && USE_TESTNET_DEV ? CHAINS_CONFIG.avaxFuji : CHAINS_CONFIG.avax,
  [ChainType.eth]: IS_DEV && USE_TESTNET_DEV ? CHAINS_CONFIG.rinkeby : CHAINS_CONFIG.eth,
  [ChainType.matic]: IS_DEV && USE_TESTNET_DEV ? CHAINS_CONFIG.mumbai : CHAINS_CONFIG.matic,
  [ChainType.mumbai]: CHAINS_CONFIG.mumbai,
  [ChainType.rinkeby]: CHAINS_CONFIG.rinkeby,
  [ChainType.avaxFuji]: CHAINS_CONFIG.avaxFuji
};

export const DESIRED_CHAIN = CHAINS[DESIRED_CHAIN_TYPE];

//use secured one for prod
// move those under per chain config
// export const PUBLIC_RPC = 'https://polygon-mainnet.infura.io/v3/998804b23fd0421e9bbea7c41917c2b3';
// export const INFURA_KEY = '998804b23fd0421e9bbea7c41917c2b3';
