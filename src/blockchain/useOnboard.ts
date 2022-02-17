import { initOnboard } from '@app/blockchain/utils/initOnboard';
import { API, Wallet } from 'bnc-onboard/dist/src/interfaces';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export function useOnboard() {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<null | number>(null);
  const [balance, setBalance] = useState<null | string>(null);
  const [wallet, setWallet] = useState<Wallet>({} as Wallet);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [onboard, setOnboard] = useState<API | null>(null);

  useEffect(() => {
    const onboard = initOnboard({
      address: (val: string) => setAddress(val),
      network: (val: number) => setNetwork(val),
      balance: (val: string) => setBalance(val),
      wallet: (wallet: Wallet) => {
        if (wallet.provider) {
          setWallet(wallet);

          const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
          setProvider(provider);
          window.localStorage.setItem('memes:selectedWallet', wallet.name as string);
        } else {
          setProvider(null);
          setWallet({} as Wallet);
        }
      }
    });

    setOnboard(onboard);
  }, []);

  useEffect(() => {
    const checkPrevWallet = async () => {
      const previouslySelectedWallet = window.localStorage.getItem('memes:selectedWallet');

      if (previouslySelectedWallet && onboard) {
        await onboard.walletSelect(previouslySelectedWallet);
        await onboard.walletCheck();
      }
    };

    checkPrevWallet();
  }, [onboard]);

  return {
    provider,
    address,
    signer: provider?.getUncheckedSigner(),
    network,
    onboard,
    wallet
  };
}
