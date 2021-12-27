import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback
} from 'react';
import { useContract } from '@app/hooks/useContract';
import { nft } from '@app/abi';
import { CONTRACTS } from '@app/addresses';
import { useBlockchain } from '@app/blockchain/useBlockchain';
import { getMintCurrencyLabel } from '@app/utils/getMintCurrencyLabel';
import axios, { AxiosRequestConfig } from 'axios';
import { mapTraits } from '@app/utils/mapTraits';
import { Metadata, Nft } from '@app/types';
import { getImageUrl } from '@app/utils/getImageUrl';
import { ethers } from 'ethers';

const PENDING_REFRESH_DELAY = 10000;

type NftState = {
  nfts: (Nft | null)[] | null;
  minted: number | null;
  maxTokens: number | null;
  paidTokens: number | null;
  mintCurrency: string;
  loadMinted: () => Promise<Number>;
  refresh: () => void;
  getNftData: (id: number) => Promise<any>;
};

type Props = {
  children: ReactNode;
};

export const NftContext = createContext<NftState>({} as NftState);
export const useNft = () => useContext(NftContext);

export const NftProvider = ({ children }: Props) => {
  const [nfts, setNfts] = useState<(Nft | null)[] | null>(null);
  const [minted, setMinted] = useState<number | null>(null);
  const [maxTokens, setMaxTokens] = useState<number | null>(null);
  const [paidTokens, setPaidTokens] = useState<number | null>(null);
  const [mintCurrency, setMintCurrency] = useState('');
  const { signer, isConnectedWithWeb3, address } = useBlockchain();
  const [pendingRefreshCount, setPendingRefreshCount] = useState(0);
  const nftContract = useContract(nft, CONTRACTS.nft, signer);

  const loadMinted = useCallback(async () => {
    const res = await nftContract?.minted();
    setMinted(Number(res));

    return Number(res);
  }, [nftContract]);

  const loadMaxTokens = useCallback(async () => {
    const res = await nftContract?.getMaxTokens();
    setMaxTokens(Number(res));

    return Number(res);
  }, [nftContract]);

  const loadPaidTokens = useCallback(async () => {
    const res = await nftContract?.getPaidTokens();
    setPaidTokens(Number(res));

    return Number(res);
  }, [nftContract]);

  const getNftData = useCallback(
    async (tokenId: number) => {
      try {
        const uri = await nftContract?.tokenURI(tokenId);
        const { data: metadata } = await axios.get<Metadata>(uri);
        const rawTraits = await nftContract?.getTokenTraits(tokenId);
        const traits = mapTraits(rawTraits);

        const nft: Nft = {
          id: tokenId,
          metadata,
          isTemplar: traits.isTemplar,
          traits,
          imgUrl: getImageUrl(metadata.image)
        };

        return nft;
      } catch (e) {
        return null;
      }
    },
    [nftContract]
  );

  const loadNfts = useCallback(async () => {
    let balanceRes: ethers.BigNumber = ethers.BigNumber.from('0');
    try {
      balanceRes = await nftContract?.balanceOf(address);
    } catch {
      setPendingRefreshCount((v) => v + 1);
      return;
    }

    const balance = balanceRes.toNumber();
    const idPromises = Array.from(Array(balance).keys()).map((idx) => {
      try {
        return nftContract?.tokenOfOwnerByIndex(address, idx);
      } catch {
        return null;
      }
    });
    const tokenIds: (ethers.BigNumber | null)[] = await Promise.all(idPromises);
    const nftPromises = tokenIds.map((id) => {
      if (!id) {
        return null;
      }

      return getNftData(id?.toNumber());
    });
    let nftsRes = await Promise.all(nftPromises);

    setNfts(nftsRes);

    setPendingRefreshCount(0);

    return nftsRes;
  }, [address, getNftData, nftContract]);

  const refresh = useCallback(() => {
    loadMinted();
    loadNfts();
  }, [loadMinted, loadNfts]);

  useEffect(() => {
    if (isConnectedWithWeb3) {
      refresh();
      loadMaxTokens();
      loadPaidTokens();
    }
  }, [isConnectedWithWeb3, loadMaxTokens, loadPaidTokens, refresh]);

  useEffect(() => {
    if (minted !== null && paidTokens !== null) {
      const currency = getMintCurrencyLabel(minted, paidTokens);
      setMintCurrency(currency);
    }
  }, [mintCurrency, minted, paidTokens]);

  useEffect(() => {
    // Changed / minted tokens cannot be read in same block
    if (pendingRefreshCount) {
      setTimeout(refresh, PENDING_REFRESH_DELAY);
    }
  }, [pendingRefreshCount, refresh]);

  const value = useMemo(
    () => ({
      nfts,
      minted,
      mintCurrency,
      maxTokens,
      paidTokens,
      loadMinted,
      refresh,
      getNftData,
      hasPendingNfts: pendingRefreshCount > 0
    }),
    [
      getNftData,
      loadMinted,
      maxTokens,
      mintCurrency,
      minted,
      nfts,
      paidTokens,
      pendingRefreshCount,
      refresh
    ]
  );

  return <NftContext.Provider value={value}>{children}</NftContext.Provider>;
};
