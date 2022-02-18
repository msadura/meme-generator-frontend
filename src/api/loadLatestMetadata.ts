import { generator } from '@app/abi';
import { CONTRACTS } from '@app/addresses';
import { parseMetadata } from '@app/utils/parseMetadata';
import { ethers } from 'ethers';

export async function loadLatestMetadata() {
  const provider = new ethers.providers.StaticJsonRpcProvider(process.env.RPC_URL_MATIC);
  const contract = new ethers.Contract(CONTRACTS.generator, generator, provider);

  try {
    const latestItems: { id: ethers.BigNumber; tokenURI: string }[] = await contract.getLatest();
    return latestItems.map((i) => parseMetadata(i.tokenURI, i.id.toNumber()));
  } catch (e) {
    return null;
  }
}
