import { ChainType } from '@app/blockchain/types';

export const IS_DEV = process.env.NODE_ENV === 'development';
export const USE_TESTNET_DEV = false;
export const BLOCKNATIVE_API_KEY = '5ef84c13-720d-4361-acd6-35fe21aeaa77';

export let HOST_URL = process.env.HOST_URL;
if (IS_DEV) {
  HOST_URL = 'http://localhost:3000/';
}

if (!HOST_URL) {
  //TODO - change to prod domain
  HOST_URL = 'https://meme-generator-frontend.vercel.app/';
}

export const DISCORD_URL = 'https://discord.gg/';
export const TWITTER_URL = 'https://twitter.com/';
export const INSTAGRAM_URL = 'https://www.instagram.com/';

export const ETH_SYMBOL = 'ETH';
export const IPFS_IMAGE_BASE = 'https://dogeartclub.mypinata.cloud/ipfs/';

export const MAX_IMAGE_SIZE = 1000;
//use secured one for prod
// export const PUBLIC_RPC = 'https://rinkeby.infura.io/v3/998804b23fd0421e9bbea7c41917c2b3';
export const chain = 80001;
export const CHAIN_TYPE: ChainType = ChainType.mumbai;
export const PUBLIC_RPC =
  'https://polygon-mumbai.g.alchemy.com/v2/p2KQ7TpI9C6Pn7jL8QbZoFpBcqDukHFY';
export const INFURA_KEY = '998804b23fd0421e9bbea7c41917c2b3';
export const MEME_PATH = 'm/';
export const IMAGE_PATH = 'api/i/';
export const OPENSEA_BASE = 'https://testnets.opensea.io/assets/mumbai/';
export const OPENSEA_COLLECTION = 'https://testnets.opensea.io/collection/nft-mm-5uui6gjmvw';
