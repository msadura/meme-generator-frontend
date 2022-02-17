import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { BlockchainProvider } from '@app/blockchain/BlockchainContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicProvider } from '@app/components/PublicProvider/PublicProvider';
import { MemeProvider } from '@app/components/MemeProvider/MemeProvider';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { LatestMemesProvider } from '@app/components/LatestMemes/LatestMemesProvider';
import { GlobalProvider } from '@app/components/GlobalProvider/GlobalProvider';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <GlobalProvider>
      <PublicProvider>
        <BlockchainProvider>
          <LatestMemesProvider>
            <MemeProvider>
              <Component {...pageProps} />
            </MemeProvider>
          </LatestMemesProvider>

          <ToastContainer />
        </BlockchainProvider>
      </PublicProvider>
    </GlobalProvider>
  );
}
export default MyApp;
