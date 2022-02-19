import {
  FC,
  createContext,
  useState,
  useMemo,
  useContext,
  useCallback,
  useRef,
  useEffect
} from 'react';
import { toast } from 'react-toastify';
import { useContract } from '../../hooks/useContract';
import useBlockchain from '@app/blockchain/useBlockchain';
import { usePublicProvider } from '@app/components/PublicProvider/PublicProvider';
import { CONTRACTS } from '@app/addresses';
import { generator, nft } from '@app/abi';
import { useMemeUpload } from '@app/hooks/useMemeUpload';
import usePendingTx from '@app/blockchain/usePendingTx';
import getErrorMessage from '@app/blockchain/getErrorMessage';
import { ethers } from 'ethers';
import { useLatestMemes } from '@app/components/LatestMemes/LatestMemesProvider';

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
  resetLastMinted: () => void;
  totalSupply: number;
  mintStatus: MintStatus;
};

const MemeProviderContext = createContext<MemeProviderContextType>({} as MemeProviderContextType);

export const useMeme = () => useContext(MemeProviderContext);

const MemeProvider: FC = ({ children }) => {
  const { signer, address, isConnectedWithWeb3 } = useBlockchain();

  const provider = usePublicProvider();
  const generatorContract = useContract(
    generator,
    CONTRACTS.generator,
    isConnectedWithWeb3 ? signer : provider
  );

  const nftContract = useContract(nft, CONTRACTS.nft, isConnectedWithWeb3 ? signer : provider);
  const [mintStatus, setMintStatus] = useState<MintStatus>('');
  const upload = useMemeUpload();
  const mintTx = usePendingTx({});
  const uploadedRef = useRef<Record<string, string>>({});
  const [lastMintedId, setLastMintedId] = useState<number>(0);
  const lastMintedIdRef = useRef(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const { refreshLatest } = useLatestMemes();

  const refreshTotalSupply = useCallback(async () => {
    try {
      const total: ethers.BigNumber = await nftContract?.totalSupply();
      if (total) {
        const totalNumber = total.toNumber();
        setTotalSupply(totalNumber);

        return totalNumber;
      }
    } catch (e) {}
  }, [nftContract]);

  const fetchLatMintedFromTotalSupply = useCallback(async () => {
    const total = await refreshTotalSupply();
    if (!lastMintedIdRef.current && total) {
      setLastMintedId(total);
      lastMintedIdRef.current = total;
    }
  }, [refreshTotalSupply]);

  const generate = useCallback(
    async (imgBase64: string, params: MintParams = {}) => {
      setLastMintedId(0);
      lastMintedIdRef.current = 0;
      let image = uploadedRef.current[imgBase64] || '';
      //for testing
      // setLastMintedId(1);
      // return;
      if (!image) {
        try {
          setMintStatus('uploading');
          const res = await upload(imgBase64);
          image = res.data.imgData;
          uploadedRef.current[imgBase64] = image;
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
          params.theme || ''
        ]);

        generatorContract?.on('Generate', (from: string, tokenId: ethers.BigNumber) => {
          if (address?.toLowerCase() === String(from).toLowerCase()) {
            setLastMintedId(tokenId.toNumber());
            lastMintedIdRef.current = tokenId.toNumber();
            generatorContract?.removeAllListeners();
          }
        });

        mintTx.setTransaction(tx);
        await tx.wait();
        fetchLatMintedFromTotalSupply();

        toast.success(`Successfully generated your meme!`);
        setMintStatus('done');
        refreshLatest();
        uploadedRef.current[imgBase64] = '';
      } catch (e: any) {
        setMintStatus('');

        if (e?.code === 4001) {
          return;
        }

        toast.error(getErrorMessage(e));
      }
    },
    [address, fetchLatMintedFromTotalSupply, generatorContract, mintTx, refreshLatest, upload]
  );

  const resetLastMinted = useCallback(() => {
    setLastMintedId(0);
  }, []);

  useEffect(() => {
    refreshTotalSupply();
  }, [refreshTotalSupply]);

  const value = useMemo(
    () => ({
      generate,
      isUploading: mintStatus === 'uploading',
      isMinting: mintStatus === 'minting',
      lastMintedId,
      resetLastMinted,
      totalSupply,
      mintStatus
    }),
    [generate, lastMintedId, mintStatus, resetLastMinted, totalSupply]
  );

  return <MemeProviderContext.Provider value={value}>{children}</MemeProviderContext.Provider>;
};

export { MemeProvider };
