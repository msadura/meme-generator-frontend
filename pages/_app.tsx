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

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <PublicProvider>
      <BlockchainProvider>
        <MemeProvider>
          <Component {...pageProps} />
        </MemeProvider>

        <ToastContainer />
      </BlockchainProvider>
    </PublicProvider>
  );
}
export default MyApp;
