import { FC, createContext, useMemo, useContext } from 'react';
import { ethers } from 'ethers';
import { DESIRED_CHAIN } from '@app/blockchain/constants';

export type PublicProviderContextType = ethers.providers.StaticJsonRpcProvider;

const PublicProviderContext = createContext<PublicProviderContextType>(
  {} as PublicProviderContextType
);

export const usePublicProvider = () => useContext(PublicProviderContext);

const PublicProvider: FC = ({ children }) => {
  const provider = useMemo(() => {
    return new ethers.providers.StaticJsonRpcProvider(DESIRED_CHAIN.rpc);
  }, []);

  return (
    <PublicProviderContext.Provider value={provider}>{children}</PublicProviderContext.Provider>
  );
};

export { PublicProvider };
