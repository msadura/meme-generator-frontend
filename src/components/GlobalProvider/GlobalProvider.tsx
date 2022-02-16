import {
  FC,
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
  ReactNode,
  useCallback,
  useRef,
  MutableRefObject
} from 'react';
import { ethers } from 'ethers';
import { Meme } from '@app/types';
import axios from 'axios';

type Props = {
  children: ReactNode;
};

type Cb = () => void;

export type GlobalProviderContextType = {
  onNavLogoClickRef: MutableRefObject<Cb | null>;
  setOnNavLogoClick: (cb: Cb | null) => void;
};

const GlobalProviderContext = createContext<GlobalProviderContextType>(
  {} as GlobalProviderContextType
);

export const useGlobal = () => useContext(GlobalProviderContext);

const GlobalProvider = ({ children }: Props) => {
  const onNavLogoClickRef = useRef<Cb | null>(null);
  const setOnNavLogoClick = useRef((val: null | Cb) => (onNavLogoClickRef.current = val)).current;

  const provider = {
    onNavLogoClickRef,
    setOnNavLogoClick
  };

  return (
    <GlobalProviderContext.Provider value={provider}>{children}</GlobalProviderContext.Provider>
  );
};

export { GlobalProvider };
