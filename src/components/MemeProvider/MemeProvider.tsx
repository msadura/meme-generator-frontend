import { FC, createContext, useState, useMemo, useContext, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { useContract } from '../../hooks/useContract';
import useBlockchain from '@app/blockchain/useBlockchain';
import { usePublicProvider } from '@app/components/PublicProvider/PublicProvider';
import { CONTRACTS } from '@app/addresses';
import { generator } from '@app/abi';
import { useMemeUpload } from '@app/hooks/useMemeUpload';
import usePendingTx from '@app/blockchain/usePendingTx';
import getErrorMessage from '@app/blockchain/getErrorMessage';
import { ethers } from 'ethers';

type MintStatus = '' | 'uploading' | 'minting' | 'done';

export type MintParams = {
  width?: number;
  height?: number;
  theme?: string;
  hashtags?: string[];
};

export type MemeProviderContextType = {
  generate: (img: string, params?: MintParams) => Promise<void>;
  isUploading: boolean;
  isMinting: boolean;
  lastMintedId: number;
};

const MemeProviderContext = createContext<MemeProviderContextType>({} as MemeProviderContextType);

export const useMeme = () => useContext(MemeProviderContext);

const MemeProvider: FC = ({ children }) => {
  const { signer, address } = useBlockchain();
  const provider = usePublicProvider();
  const generatorContract = useContract(generator, CONTRACTS.generator, signer || provider || null);
  const [mintStatus, setMintStatus] = useState<MintStatus>('');
  const upload = useMemeUpload();
  const mintTx = usePendingTx({});
  const uploadedRef = useRef<Record<string, string>>({});
  const [lastMintedId, setLastMintedId] = useState<number>(0);

  const generate = useCallback(
    async (imgBase64: string, params: MintParams = {}) => {
      setLastMintedId(0);
      let image = uploadedRef.current[imgBase64] || '';

      if (!image) {
        try {
          setMintStatus('uploading');
          const res = await upload(imgBase64);
          image = res.data.imgData;
          uploadedRef.current[imgBase64] = image;
          setMintStatus('done');
        } catch (e: any) {
          setMintStatus('');
          toast.error(e);
          return;
        }
      }

      try {
        setMintStatus('minting');
        const tx = await generatorContract?.generate([
          image,
          params.width || 0,
          params.height || 0,
          params.theme || '',
          params.hashtags || []
        ]);

        generatorContract?.on('Generate', (from: string, tokenId: ethers.BigNumber) => {
          if (address.toLowerCase() === String(from).toLowerCase()) {
            setLastMintedId(tokenId.toNumber());
            generatorContract?.removeAllListeners();
          }
        });

        mintTx.setTransaction(tx);
        await tx.wait();

        toast.success(`Successfully generated your meme!`);
        setMintStatus('done');
        uploadedRef.current[imgBase64] = '';
      } catch (e: any) {
        setMintStatus('');

        if (e?.code === 4001) {
          return;
        }

        toast.error(getErrorMessage(e));
      }
    },
    [address, generatorContract, mintTx, upload]
  );

  const value = useMemo(
    () => ({
      generate,
      isUploading: mintStatus === 'uploading',
      isMinting: mintStatus === 'minting',
      lastMintedId
    }),
    [generate, lastMintedId, mintStatus]
  );

  return <MemeProviderContext.Provider value={value}>{children}</MemeProviderContext.Provider>;
};

export { MemeProvider };
