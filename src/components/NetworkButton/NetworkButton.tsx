// import React from 'react';
// import { ChainType } from '@app/blockchain/types';
// import { CHAINS } from '@app/blockchain/constants';
// import useBlockchain from '@app/blockchain/useBlockchain';

// type Props = {
//   chainType: ChainType;
// };

// export function NetworkButton({ chainType }: Props): JSX.Element {
//   const desiredChain = CHAINS[chainType];
//   const { isConnectedWithWeb3, chainId, changeNetwork } = useBlockchain();

//   if (!isConnectedWithWeb3) {
//     return <div className="badge badge-lg badge-neutral">● Not connected</div>;
//   }

//   if (desiredChain.id !== chainId) {
//     return (
//       <div data-tip={`Click to switch to ${desiredChain.name}`} className="tooltip tooltip-left">
//         <div
//           className="badge badge-lg badge-error cursor-pointer"
//           onClick={(e) => {
//             e.stopPropagation();
//             changeNetwork(desiredChain.id);
//           }}>
//           ● Wrong chain
//         </div>
//       </div>
//     );
//   }

//   return <div className="badge badge-lg badge-success">● {desiredChain.name}</div>;
// }

export {};
