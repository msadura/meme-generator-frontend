import { FC, createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { CHAINS } from '@app/blockchain/constants';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export type BlockchainContextType = {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  address: string;
  setAddress: (address: string) => void;
  isConnectedWithWeb3: boolean;
  setIsConnectedWithWeb3: (value: boolean) => void;
  changeNetwork: (id: number) => void;
  chainId: number | null;
};

const BlockchainContext = createContext<BlockchainContextType>({
  provider: null,
  signer: null,
  address: '',
  setAddress: () => {},
  isConnectedWithWeb3: false,
  setIsConnectedWithWeb3: () => {},
  changeNetwork: (id: number) => {},
  chainId: null
});

const BlockchainProvider: FC = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [isConnectedWithWeb3, setIsConnectedWithWeb3] = useState(() => Boolean(provider && signer));
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState<null | number>(null);

  const getProviderAndSigner = () => {
    const externalProvider = new ethers.providers.Web3Provider(window.ethereum);
    const externalSigner = externalProvider.getSigner();
    setProvider(externalProvider);
    setSigner(externalSigner);
  };

  const changeNetwork = async (chainId?: number) => {
    const switchToChainId = chainId;
    if (!switchToChainId) {
      return;
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${switchToChainId.toString(16)}` }]
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      getProviderAndSigner();
      window.ethereum.on('chainChanged', getProviderAndSigner);
    }
  }, []);

  useEffect(() => {
    const checkNetwork = async () => {
      if (provider) {
        const network = await provider?.getNetwork();
        setChainId(network?.chainId);
      }
    };

    checkNetwork();
  }, [provider]);

  const blockchain = {
    provider,
    signer,
    address,
    setAddress,
    isConnectedWithWeb3,
    setIsConnectedWithWeb3,
    changeNetwork,
    chainId
  };
  return <BlockchainContext.Provider value={blockchain}>{children}</BlockchainContext.Provider>;
};

export { BlockchainContext, BlockchainProvider };
