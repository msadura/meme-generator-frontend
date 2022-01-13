import React from 'react';
import { ChainType } from '@app/blockchain/types';
import { CHAINS } from '@app/blockchain/constants';
import useBlockchain from '@app/blockchain/useBlockchain';
import { CHAIN_TYPE } from '@app/constants';

export function NetworkButton(): JSX.Element {
  const desiredChain = CHAINS[CHAIN_TYPE];
  const { isConnectedWithWeb3, chainId } = useBlockchain();

  if (!isConnectedWithWeb3) {
    return <div className="badge badge-lg badge-neutral">● Not connected</div>;
  }

  if (desiredChain.id !== chainId) {
    return (
      <div data-tip={`Click to switch to ${desiredChain.name}`} className="tooltip tooltip-left">
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

  return <div className="badge badge-lg badge-success">● {desiredChain.name}</div>;
}
