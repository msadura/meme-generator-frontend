import { FC, createContext, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { CHAINS, DESIRED_CHAIN } from '@app/blockchain/constants';
import { useOnboard } from './useOnboard';
import { add } from 'lodash';
import { Chain } from '@app/blockchain/types';
import { toHex } from '@app/blockchain/utils/toHex';
import getErrorMessage from '@app/blockchain/getErrorMessage';
import { displayToastError } from '@app/utils/displayToastError';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export type BlockchainContextType = {
  provider: ethers.providers.Provider | null;
  signer: ethers.providers.JsonRpcSigner | undefined;
  address: string | null;
  // setAddress: (address: string) => void;
  isConnectedWithWeb3: boolean;
  // setIsConnectedWithWeb3: (value: boolean) => void;
  changeNetwork: (id?: number) => void;
  chainId: number | null;
  connect: () => Promise<void>;
  isWrongChain: boolean;
  addToNetwork: (chain: Chain) => Promise<void>;
};

const BlockchainContext = createContext<BlockchainContextType>({} as BlockchainContextType);

const BlockchainProvider: FC = ({ children }) => {
  const [isConnectedWithWeb3, setIsConnectedWithWeb3] = useState(false);
  const [isWrongChain, setIsWrongChain] = useState(false);
  const { signer, provider, address, network, onboard, wallet } = useOnboard();

  useEffect(() => {
    setIsConnectedWithWeb3(!!address);
  }, [address, wallet]);

  useEffect(() => {
    setIsWrongChain(isConnectedWithWeb3 && !!network && network !== DESIRED_CHAIN.id);
  }, [isConnectedWithWeb3, network]);

  const changeNetwork = async (chainId?: number) => {
    const switchToChainId = chainId || DESIRED_CHAIN.id;
    if (!switchToChainId) {
      return;
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${switchToChainId.toString(16)}` }]
    });
  };

  const addToNetwork = async (chain: Chain) => {
    if (!address || !chain.config) {
      return;
    }

    const { config } = chain;

    const params = {
      chainId: toHex(config.chainId), // A 0x-prefixed hexadecimal string
      chainName: config.name,
      nativeCurrency: {
        name: config.nativeCurrency.name,
        symbol: config.nativeCurrency.symbol, // 2-6 characters long
        decimals: config.nativeCurrency.decimals
      },
      rpcUrls: config.rpc,
      blockExplorerUrls: [
        config.explorers && config.explorers.length > 0 && config.explorers[0].url
          ? config.explorers[0].url
          : config.infoURL
      ]
    };

    try {
      const result = await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [params]
      });
    } catch (error: any) {
      displayToastError(error);
    }
  };

  // useEffect(() => {
  //   if (window.ethereum) {
  //     getProviderAndSigner();
  //     window.ethereum.on('chainChanged', getProviderAndSigner);
  //   }
  // }, []);

  const connect = useCallback(async () => {
    const connected = await onboard?.walletSelect();

    if (connected && wallet.provider && !address) {
      wallet.connect?.();
    }
  }, [address, onboard, wallet]);

  const blockchain = {
    provider,
    signer,
    address,
    isConnectedWithWeb3,
    // changeNetwork,
    chainId: network,
    connect,
    isWrongChain,
    changeNetwork,
    addToNetwork
  };
  return <BlockchainContext.Provider value={blockchain}>{children}</BlockchainContext.Provider>;
};

export { BlockchainContext, BlockchainProvider };
