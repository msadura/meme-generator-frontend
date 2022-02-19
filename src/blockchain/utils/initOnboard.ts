import { CHAINS, DESIRED_CHAIN } from '@app/blockchain/constants';
import { BLOCKNATIVE_API_KEY } from '@app/constants';
import Onboard from 'bnc-onboard';
import { Subscriptions } from 'bnc-onboard/dist/src/interfaces';

const networkId = DESIRED_CHAIN.id;
const dappId = BLOCKNATIVE_API_KEY;

export function initOnboard(subscriptions: Subscriptions) {
  // const onboard = staging ? stagingOnboard : Onboard;
  const onboard = Onboard;

  return onboard({
    dappId,
    hideBranding: true,
    networkId,
    // networkName: 'Mumbai',
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        {
          walletName: 'walletConnect',
          infuraKey: DESIRED_CHAIN.infuraKey,
          rpc: {
            80001: DESIRED_CHAIN.rpc
          }
        }
      ]
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' }
      // { checkName: 'balance', minimumBalance: '100000' }
    ]
  });
}
