import { Navbar } from '@app/components/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';
import { MemeGenerator } from '@app/components/MemeGenerator/MemeGenerator';
import { CanvasProvider } from '@app/components/Canvas/CanvasProvider';

const Home: NextPage = () => {
  return (
    <div className="bg-base-300 min-h-screen w-full flex flex-1 flex-col main-bg">
      <Head>
        <title>NFT meme generator</title>
        <meta
          name="description"
          content="NFT Meme Generator by Doge Art Club. Mint memes as NFTs without coding, for free."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="flex flex-1 text-white-primary flex-col gap-5">
        <div className="flex flex-1 px-3 md:px-8">
          <CanvasProvider>
            <MemeGenerator />
          </CanvasProvider>
        </div>
      </main>
      <footer className="flex flex-row items-center justify-center p-5">
        <div className="text-white-secondary">©dogeartclub 2021.</div>
      </footer>
    </div>
  );
};

export default Home;
