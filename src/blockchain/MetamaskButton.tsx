import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import foxSvg from '../../public/metamask-fox.svg';
import getAccount from './getAccount';
import useBlockchain from './useBlockchain';
import Spinner from '@app/components/Spinner';
import { add } from 'lodash';
import { DESIRED_CHAIN } from '@app/blockchain/constants';

const MetamaskButton: React.FC = () => {
  const { provider, connect, address, isConnectedWithWeb3 } = useBlockchain();
  const [isConnecting, setIsConnecting] = useState(false);

  // const connect = async () => {
  //   if (isConnectedWithWeb3) {
  //     return;
  //   }

  //   if (!window.ethereum) {
  //     toast.error('Please install Metamask extension to use the site');
  //   }

  //   setIsConnecting(true);
  //   try {
  //     const account = await getAccount(provider);
  //     const network = await (provider as any).getNetwork();

  //     if (network.chainId !== DESIRED_CHAIN.id) {
  //       toast.error(`Wrong chain detected. Switch to ${DESIRED_CHAIN.name} and reconnect`);
  //       return;
  //     }

  //     setAddress(account);
  //     setIsConnectedWithWeb3(true);
  //   } catch (e) {
  //   } finally {
  //     setIsConnecting(false);
  //   }
  // };

  const getDisplayAccount = () => {
    if (!address) {
      return '';
    }

    return `${address.substr(0, 6)}...${address.substr(address.length - 4, 4)}`;
  };

  return (
    <>
      <button type="button" onClick={connect} className="btn btn-primary">
        <>
          <Image src={foxSvg} alt="metamask" />
          {isConnecting && (
            <div className="pl-4">
              <Spinner />
            </div>
          )}
          {!isConnecting && !address && <span className="pl-2 truncate">Connect</span>}
          {!isConnecting && !!address && <span className="pl-2">{getDisplayAccount()}</span>}
        </>
      </button>
    </>
  );
};

export default MetamaskButton;
