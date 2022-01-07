import { nft } from '@app/abi';
import { CONTRACTS } from '@app/addresses';
import { Attribute } from '@app/types';
import { ethers } from 'ethers';

export async function loadMetadata(tokenId: number) {
  const provider = new ethers.providers.StaticJsonRpcProvider(process.env.RPC_URL);
  const contract = new ethers.Contract(CONTRACTS.nft, nft, provider);

  const tokenURI = await contract.tokenURI(tokenId);
  const data = tokenURI.replace(/^data:application\/json;base64,/, '');
  const buff = Buffer.from(data, 'base64');
  const metadata = JSON.parse(buff.toString());

  const theme = getTheme(metadata.attributes);
  //TODO - handle hashtags
  const hashtags: string[] = [];
  const imageHash = metadata.image.replace('ipfs://', '');

  return {
    id: Number(tokenId),
    imageHash,
    theme,
    hashtags,
    name: metadata.name
  };
}

function getTheme(attributes: Attribute[]) {
  const attr = attributes.find((a) => a.trait_type === 'Theme');
  return attr?.value || '';
}
