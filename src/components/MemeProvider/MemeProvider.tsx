import { FC, createContext, useEffect, useState, useMemo, useContext, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { CHAINS } from '@app/blockchain/constants';
import { PUBLIC_RPC } from '@app/constants';
import { useContract } from '../../hooks/useContract';
import useBlockchain from '@app/blockchain/useBlockchain';
import { usePublicProvider } from '@app/components/PublicProvider/PublicProvider';
import { CONTRACTS } from '@app/addresses';
import { generator } from '@app/abi';
import { useMemeUpload } from '@app/hooks/useMemeUpload';

type MintStatus = '' | 'uploading' | 'minting' | 'done';

export type MemeProviderContextType = {
  generate: (img: string) => Promise<void>;
  isUploading: boolean;
  isMinting: boolean;
};

const MemeProviderContext = createContext<MemeProviderContextType>({} as MemeProviderContextType);

export const useMeme = () => useContext(MemeProviderContext);

const MemeProvider: FC = ({ children }) => {
  const { signer } = useBlockchain();
  const provider = usePublicProvider();
  const generatorContract = useContract(generator, CONTRACTS.generator, signer || provider || null);
  const [mintStatus, setMintStatus] = useState<MintStatus>('');
  const upload = useMemeUpload();

  const generate = useCallback(
    async (imgBase64: string) => {
      setMintStatus('uploading');
      try {
        const res = await upload(imgBase64);
        console.log('🔥 upload res', res);
        setMintStatus('done');
      } catch (e: any) {
        setMintStatus('');
        toast.error(e);
      }

      // them get other data and mint onchain
    },
    [upload]
  );

  const value = useMemo(
    () => ({
      generate,
      isUploading: mintStatus === 'uploading',
      isMinting: mintStatus === 'minting'
    }),
    [generate, mintStatus]
  );

  return <MemeProviderContext.Provider value={value}>{children}</MemeProviderContext.Provider>;
};

export { MemeProvider };
