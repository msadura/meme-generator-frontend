import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { BlockchainProvider } from '@app/blockchain/BlockchainContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicProvider } from '@app/components/PublicProvider/PublicProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PublicProvider>
      <BlockchainProvider>
        <Component {...pageProps} />

        <ToastContainer />
      </BlockchainProvider>
    </PublicProvider>
  );
}
export default MyApp;
