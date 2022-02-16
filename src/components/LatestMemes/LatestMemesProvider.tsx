import { FC, createContext, useEffect, useState, useMemo, useContext, ReactNode } from 'react';
import { ethers } from 'ethers';
import { Meme } from '@app/types';
import axios from 'axios';

type Props = {
  children: ReactNode;
};

export type LatestMemesProviderContextType = {
  latest: Meme[] | null;
  refreshLatest: () => void;
};

const LatestMemesProviderContext = createContext<LatestMemesProviderContextType>(
  {} as LatestMemesProviderContextType
);

export const useLatestMemes = () => useContext(LatestMemesProviderContext);

const LatestMemesProvider = ({ children }: Props) => {
  const [latest, setLatest] = useState<null | Meme[]>(null);

  const refreshLatest = async () => {
    try {
      const res = await axios.get<Meme[]>('/api/latest');
      setLatest(res.data);
    } catch (e) {}
  };

  useEffect(() => {
    refreshLatest();
  }, []);

  const provider = { latest, refreshLatest };
  return (
    <LatestMemesProviderContext.Provider value={provider}>
      {children}
    </LatestMemesProviderContext.Provider>
  );
};

export { LatestMemesProvider };
