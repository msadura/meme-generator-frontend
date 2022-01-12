import { FC, createContext, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { CHAINS } from '@app/blockchain/constants';
import { useOnboard } from './useOnboard';
import { add } from 'lodash';

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
  // changeNetwork: (id: number) => void;
  chainId: number | null;
  connect: () => Promise<void>;
};

const BlockchainContext = createContext<BlockchainContextType>({} as BlockchainContextType);

const BlockchainProvider: FC = ({ children }) => {
  // const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  // const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [isConnectedWithWeb3, setIsConnectedWithWeb3] = useState(false);
  // const [address, setAddress] = useState('');
  // const [chainId, setChainId] = useState<null | number>(null);
  const { signer, provider, address, network, onboard, wallet } = useOnboard();

  useEffect(() => {
    setIsConnectedWithWeb3(!!wallet.provider);
  }, [wallet]);

  // const getProviderAndSigner = () => {
  //   const externalProvider = new ethers.providers.Web3Provider(window.ethereum);
  //   const externalSigner = externalProvider.getSigner();
  //   setProvider(externalProvider);
  //   setSigner(externalSigner);
  // };

  // const changeNetwork = async (chainId?: number) => {
  //   const switchToChainId = chainId;
  //   if (!switchToChainId) {
  //     return;
  //   }

  //   await window.ethereum.request({
  //     method: 'wallet_switchEthereumChain',
  //     params: [{ chainId: `0x${switchToChainId.toString(16)}` }]
  //   });
  // };

  // useEffect(() => {
  //   if (window.ethereum) {
  //     getProviderAndSigner();
  //     window.ethereum.on('chainChanged', getProviderAndSigner);
  //   }
  // }, []);

  // useEffect(() => {
  //   const checkNetwork = async () => {
  //     if (provider) {
  //       const network = await provider?.getNetwork();
  //       setChainId(network?.chainId);
  //     }
  //   };

  //   checkNetwork();
  // }, [provider]);

  const connect = useCallback(async () => {
    await onboard?.walletSelect();
  }, [onboard]);

  const blockchain = {
    provider,
    signer,
    address,
    // setAddress,
    isConnectedWithWeb3,
    // setIsConnectedWithWeb3,
    // changeNetwork,
    chainId: network,
    connect
  };
  return <BlockchainContext.Provider value={blockchain}>{children}</BlockchainContext.Provider>;
};

export { BlockchainContext, BlockchainProvider };
