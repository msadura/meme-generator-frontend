import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import foxSvg from '../../public/metamask-fox.svg';
import getAccount from './getAccount';
import useBlockchain from './useBlockchain';
import Spinner from '@app/components/Spinner';
import { add } from 'lodash';
import { DESIRED_CHAIN } from '@app/blockchain/constants';
import { NetworkButton } from '@app/components/NetworkButton/NetworkButton';
import Button from '@app/components/Button/Button';
import { classNames } from '@app/utils/classNames';

const MetamaskButton: React.FC = () => {
  const { provider, connect, address, isConnectedWithWeb3, isWrongChain, changeNetwork } =
    useBlockchain();
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

  const onClick = () => {
    if (isWrongChain) {
      changeNetwork();
      return;
    }

    connect();
  };

  const getDisplayAccount = () => {
    if (!address) {
      return '';
    }

    return `${address.substr(0, 6)}...${address.substr(address.length - 4, 4)}`;
  };

  return (
    <div
      data-tip={isWrongChain && `Click to switch to ${DESIRED_CHAIN.name}`}
      className="tooltip tooltip-bottom">
      <Button onClick={onClick} className={classNames(isWrongChain ? 'btn-error' : 'btn-primary')}>
        <>
          <Image src={foxSvg} alt="metamask" />

          <div className="flex flex-col">
            {isConnecting && (
              <div className="pl-4">
                <Spinner />
              </div>
            )}
            {!isConnecting && !address && <span className="pl-2 truncate">Connect</span>}
            {!isConnecting && !!address && <span className="pl-2">{getDisplayAccount()}</span>}
            {isConnectedWithWeb3 && isWrongChain && (
              <div className="px-2">
                <div className="badge badge-error text-xs">Wrong chain</div>
              </div>
            )}
          </div>
        </>
      </Button>
    </div>
  );
};

export default MetamaskButton;
