import { DESIRED_CHAIN } from '@app/blockchain/constants';
import { nft } from '@app/abi';
import { CONTRACTS } from '@app/addresses';
import { ethers } from 'ethers';

export async function loadTotalSupply() {
  const provider = new ethers.providers.StaticJsonRpcProvider(DESIRED_CHAIN.rpc);
  const contract = new ethers.Contract(CONTRACTS.nft, nft, provider);

  const totalSupply: ethers.BigNumber = await contract.totalSupply();

  return totalSupply.toNumber();
}
