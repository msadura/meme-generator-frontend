import { DESIRED_CHAIN } from '@app/blockchain/constants';
import { bank } from '@app/abi';
import { CONTRACTS } from '@app/addresses';
import { ethers } from 'ethers';

export async function doesImageExist(img: string) {
  const provider = new ethers.providers.StaticJsonRpcProvider(DESIRED_CHAIN.rpc);
  const contract = new ethers.Contract(CONTRACTS.bank, bank, provider);

  try {
    const doesExist: boolean = await contract.doesImageExist(img);
    return doesExist;
  } catch (e) {
    return false;
  }
}
