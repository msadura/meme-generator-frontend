export const IS_DEV = process.env.NODE_ENV === 'development';
export const USE_TESTNET_DEV = false;

export let HOST_URL = process.env.HOST_URL;
if (IS_DEV) {
  HOST_URL = 'http://localhost:3000/';
}

export const DISCORD_URL = 'https://discord.gg/';
export const TWITTER_URL = 'https://twitter.com/';
export const INSTAGRAM_URL = 'https://www.instagram.com/';

export const ETH_SYMBOL = 'ETH';
export const IPFS_IMAGE_BASE = 'https://gateway.pinata.cloud/ipfs/';

export const MAX_IMAGE_SIZE = 1000;
//use secured one for prod
export const PUBLIC_RPC = 'https://rinkeby.infura.io/v3/998804b23fd0421e9bbea7c41917c2b3';
export const MEME_PATH = 'm/';
export const IMAGE_PATH = 'api/i/';
export const OPENSEA_BASE = 'https://testnets.opensea.io/assets/';
