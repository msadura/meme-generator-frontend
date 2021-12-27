import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { BlockchainProvider } from '@app/blockchain/BlockchainContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BlockchainProvider>
      <Component {...pageProps} />

      <ToastContainer />
    </BlockchainProvider>
  );
}
export default MyApp;
