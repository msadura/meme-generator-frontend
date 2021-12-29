import { FC, createContext, useEffect, useState, useMemo, useContext } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { CHAINS } from '@app/blockchain/constants';
import { PUBLIC_RPC } from '@app/constants';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export type PublicProviderContextType = ethers.providers.StaticJsonRpcProvider;

const PublicProviderContext = createContext<PublicProviderContextType>(
  {} as PublicProviderContextType
);

export const usePublicProvider = () => useContext(PublicProviderContext);

const PublicProvider: FC = ({ children }) => {
  const provider = useMemo(() => {
    return new ethers.providers.StaticJsonRpcProvider(PUBLIC_RPC);
  }, []);

  return (
    <PublicProviderContext.Provider value={provider}>{children}</PublicProviderContext.Provider>
  );
};

export { PublicProvider };
