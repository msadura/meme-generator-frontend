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

export const DISCORD_URL = 'https://discord.gg/dogeartclub';
export const TWITTER_URL = 'https://twitter.com/DogeArtClub';
export const INSTAGRAM_URL = 'https://www.instagram.com/dogeartclub';
export const DAC_URL = 'https://dogeartclub.com';

export const ETH_SYMBOL = 'ETH';
// export const IPFS_IMAGE_BASE = 'https://dogeartclub.mypinata.cloud/ipfs/';
export const IPFS_IMAGE_BASE = 'https://cloudflare-ipfs.com/ipfs/';

export const MAX_IMAGE_SIZE = 1000;
//use secured one for prod
export const chain = 137;
export const CHAIN_TYPE: ChainType = ChainType.matic;
export const PUBLIC_RPC = 'https://polygon-mainnet.infura.io/v3/998804b23fd0421e9bbea7c41917c2b3';
export const INFURA_KEY = '998804b23fd0421e9bbea7c41917c2b3';
export const MEME_PATH = 'm/';
export const IMAGE_PATH = 'api/i/';
//TODO _UPDATE!!
export const OPENSEA_BASE = 'https://testnets.opensea.io/assets/mumbai/';
export const OPENSEA_COLLECTION = 'https://testnets.opensea.io/collection/nft-mm-5uui6gjmvw';
export const IMG_CLOUDFRONT = 'https://dai1hr2knmld8.cloudfront.net/';
export const MEME_CLOUDFRONT_PATH = 'meme/';
export const FILE_EXTENSION = '.jpeg';
