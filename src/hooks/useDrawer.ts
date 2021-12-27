import { drawer } from '@app/abi';
import useBlockchain from '@app/blockchain/useBlockchain';
import { useContract } from './useContract';
import { CONTRACTS } from '@app/addresses';

export function useDrawer() {
  const { signer } = useBlockchain();
  const drawerContract = useContract(drawer, CONTRACTS.drawer, signer);

  return drawerContract;
}
