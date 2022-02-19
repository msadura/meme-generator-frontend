import { DESIRED_CHAIN } from '@app/blockchain/constants';
import { nft } from '@app/abi';
import { CONTRACTS } from '@app/addresses';
import { parseMetadata } from '@app/utils/parseMetadata';
import { ethers } from 'ethers';

export async function loadMetadata(tokenId: number) {
  const provider = new ethers.providers.StaticJsonRpcProvider(DESIRED_CHAIN.rpc);
  const contract = new ethers.Contract(CONTRACTS.nft, nft, provider);

  try {
    const tokenURI: string = await contract.tokenURI(tokenId);
    return parseMetadata(tokenURI, tokenId);
  } catch (e) {
    return null;
  }
}
