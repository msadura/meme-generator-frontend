import { ethers, Signer } from 'ethers';
import { useMemo } from 'react';

export function useContract(abi: any, address: string, signer: Signer | null) {
  const contract = useMemo(() => {
    if (signer) {
      return new ethers.Contract(address, abi, signer);
    }

    return null;
  }, [abi, address, signer]);

  return contract;
}
