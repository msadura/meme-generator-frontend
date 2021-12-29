import { drawer } from '@app/abi';
import useBlockchain from '@app/blockchain/useBlockchain';
import { useContract } from './useContract';
import { CONTRACTS } from '@app/addresses';
import { ethers } from 'ethers';

export function useDrawer(provider?: ethers.providers.Provider) {
  const { signer } = useBlockchain();
  const drawerContract = useContract(drawer, CONTRACTS.drawer, signer || provider || null);

  return drawerContract;
}
