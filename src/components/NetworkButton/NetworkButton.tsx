import React from 'react';
import { ChainType } from '@app/blockchain/types';
import { CHAINS, DESIRED_CHAIN } from '@app/blockchain/constants';
import useBlockchain from '@app/blockchain/useBlockchain';

export function NetworkButton(): JSX.Element {
  const { isConnectedWithWeb3, chainId } = useBlockchain();

  if (!isConnectedWithWeb3) {
    return <div className="badge badge-lg badge-neutral">● Not connected</div>;
  }

  if (DESIRED_CHAIN.id !== chainId) {
    return (
      <div data-tip={`Click to switch to ${DESIRED_CHAIN.name}`} className="tooltip tooltip-left">
        <div
          className="badge badge-lg badge-error cursor-pointer text-sm"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          ● Wrong chain
        </div>
      </div>
    );
  }

  return <div className="badge badge-lg badge-success">● {DESIRED_CHAIN.name}</div>;
}
