import { ethers, Signer } from 'ethers';
import { useMemo } from 'react';

export function useContract(
  abi: any,
  address: string,
  signer: ethers.providers.Provider | Signer | ethers.providers.JsonRpcSigner | null | undefined
) {
  const contract = useMemo(() => {
    if (signer && address) {
      return new ethers.Contract(address, abi, signer);
    }

    return null;
  }, [abi, address, signer]);

  return contract;
}
