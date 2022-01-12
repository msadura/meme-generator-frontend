import { BLOCKNATIVE_API_KEY, INFURA_KEY, PUBLIC_RPC } from '@app/constants';
import Onboard from 'bnc-onboard';
import { Subscriptions } from 'bnc-onboard/dist/src/interfaces';

const networkId = 80001;
const rpcUrl = PUBLIC_RPC;
const dappId = BLOCKNATIVE_API_KEY;

export function initOnboard(subscriptions: Subscriptions) {
  // const onboard = staging ? stagingOnboard : Onboard;
  const onboard = Onboard;
  return { walletSelect: () => null } as any;
  return onboard({
    dappId,
    hideBranding: true,
    networkId,
    networkName: 'Mumbai',
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' }
        // {
        //   walletName: 'ledger',
        //   rpcUrl
        // },
        // {
        //   walletName: 'walletConnect',
        //   infuraKey: INFURA_KEY
        // }
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
